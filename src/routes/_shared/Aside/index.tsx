import { Location, Star } from 'assets/svgs'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClickAway } from 'react-use'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { asideOpenState } from 'states/aside'
import { locationState } from 'states/location'
import styles from './aside.module.scss'
import LocationItem from './LocationItem'

const Aside = () => {
  const asideRef = useRef(null)
  const setIsAside = useSetRecoilState(asideOpenState)
  const locationData = useRecoilValue(locationState)
  const defaultData = locationData[0]

  const navigate = useNavigate()

  useClickAway(asideRef, () => {
    setIsAside(false)
  })

  const handleClick = () => {
    setIsAside(false)
    navigate('manage')
  }

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
      <button type='button' className={styles.controlButton} onClick={handleClick}>
        지역 관리
      </button>
    </div>
  )
}

export default Aside
