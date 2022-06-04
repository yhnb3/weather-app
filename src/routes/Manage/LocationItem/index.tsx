import { useTempQuery } from 'hooks/useTempQuery'
import { ILocationData } from 'types/location'
import store from 'store'
import styles from './locationItem.module.scss'
import { useRecoilValue } from 'recoil'
import { locationState } from 'states/location'
import { Dispatch, SetStateAction } from 'react'

interface IProps {
  data: ILocationData
  idx: number
  isEdit?: boolean
  setDeleteData?: Dispatch<SetStateAction<{ isChecked: boolean }[]>>
}

const LocationItem = ({ data, idx, isEdit = false, setDeleteData }: IProps) => {
  const locationData = useRecoilValue(locationState)
  const { currentData, timePerData } = useTempQuery({ lat: data.lat, lon: data.lon })
  store.set('locationData', locationData)

  const handleCheck = () => {
    if (setDeleteData) {
      setDeleteData((prev) => [...prev.slice(0, idx), { isChecked: !prev[idx].isChecked }, ...prev.slice(idx + 1)])
    }
  }

  if (!currentData || !timePerData) return null
  return (
    <div className={styles.locationItem}>
      <div className={styles.left}>
        {isEdit && (
          <div className={styles.inputContainer}>
            <input type='checkbox' onChange={handleCheck} />
          </div>
        )}
        <div>{data.name}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightTop}>
          <img
            className={styles.tempImg}
            src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
            alt={currentData?.weather[0].description}
          />
          <div className={styles.temp}>{Math.round(Number(currentData.main.temp))}° </div>
        </div>
        <div className={styles.rightBottom}>
          <div />
          <div className={styles.minMaxTemp}>
            {Math.round(timePerData.daily[0].temp.max)}° /{Math.round(timePerData.daily[0].temp.min)}°
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationItem
