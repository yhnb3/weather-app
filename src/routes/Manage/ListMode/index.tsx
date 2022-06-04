import LocationItem from '../LocationItem'
import styles from './listMode.module.scss'
import { useRecoilValue } from 'recoil'
import { locationState } from 'states/location'

const ListMode = () => {
  const locationData = useRecoilValue(locationState)
  return (
    <>
      <div className={styles.locationTitle}>즐겨찾는 지역</div>
      {locationData.length > 0 && <LocationItem data={locationData[0]} idx={0} />}
      <div className={styles.locationTitle}>다른 지역</div>
      <div className={styles.listContainer}>
        <ul>
          {locationData.slice(1).map((location, idx) => {
            const key = `location-${idx}`
            return (
              <li key={key}>
                <LocationItem data={location} idx={idx + 1} />
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default ListMode
