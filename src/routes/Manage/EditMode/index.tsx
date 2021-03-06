import { Dispatch, SetStateAction, useState } from 'react'
import { useRecoilState } from 'recoil'
import store from 'store'

import { TrashCanIcon } from 'assets/svgs'
import { locationState } from 'states/location'
import LocationItem from '../LocationItem'

import styles from './editMode.module.scss'

interface IProps {
  setIsEdit: Dispatch<SetStateAction<boolean>>
}

const EditMode = ({ setIsEdit }: IProps) => {
  const [locationData, setLocationData] = useRecoilState(locationState)
  const [deleteData, setDeleteData] = useState([
    ...locationData.map(() => {
      return { isChecked: false }
    }),
  ])

  const handleDeleteClick = () => {
    setLocationData((prev) => {
      const newData = [...prev.filter((_location, idx) => !deleteData[idx].isChecked)]
      store.set('locationData', newData)
      return newData
    })
    setIsEdit(false)
  }
  return (
    <>
      <div className={styles.locationTitle}>즐겨찾는 지역</div>
      {locationData.length > 0 && <LocationItem data={locationData[0]} idx={0} isEdit setDeleteData={setDeleteData} />}
      <div className={styles.locationTitle}>다른 지역</div>
      <div className={styles.locationList}>
        <ul>
          {locationData.slice(1).map((location, idx) => {
            const key = `location-${idx}`
            return (
              <li key={key}>
                <LocationItem data={location} idx={idx + 1} isEdit setDeleteData={setDeleteData} />
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.buttonBox}>
        <button type='button' onClick={handleDeleteClick}>
          <TrashCanIcon className={styles.icon} />
        </button>
      </div>
    </>
  )
}

export default EditMode
