import { Location, Star } from 'assets/svgs'
import { Dispatch, SetStateAction, useRef } from 'react'
import { useClickAway } from 'react-use'
import { useRecoilValue } from 'recoil'
import { locationState } from 'states/location'
import styles from './aside.module.scss'
import LocationItem from './LocationItem'

interface IProps {
  setIsAside: Dispatch<SetStateAction<boolean>>
}
const Aside = ({ setIsAside }: IProps) => {
  const asideRef = useRef(null)
  const locationData = useRecoilValue(locationState)
  const defaultData = locationData[0]

  useClickAway(asideRef, () => {
    setIsAside(false)
  })

  return (
    <div ref={asideRef} className={styles.asideContainer}>
      <div className={styles.locationContainer}>
        <div className={styles.title}>
          <Star className={styles.icon} />
          <div>즐겨찾는 지역</div>
        </div>
        <div className={styles.locationList}>
          <LocationItem lat={defaultData.lat} lon={defaultData.lon} idx={0} />
        </div>
      </div>
      <div className={styles.locationContainer}>
        <div className={styles.title}>
          <Location className={styles.icon} />
          <div>다른 지역</div>
        </div>
        <div className={styles.locationList}>
          <ul>
            {locationData.slice(1).map((location, idx) => {
              const key = `${location.name}-${idx}`
              return <LocationItem key={key} lat={location.lat} lon={location.lon} idx={idx + 1} />
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Aside
