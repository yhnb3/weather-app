import LocationItem from './LocationItem'
import styles from './listMode.module.scss'
import { useRecoilState } from 'recoil'
import { locationState } from 'states/location'

const ListMode = () => {
  const [locationData, setLocationData] = useRecoilState(locationState)
  return (
    <>
      <div className={styles.locationTitle}>즐겨찾는 지역</div>
      <LocationItem data={locationData[0]} />
      <div className={styles.locationTitle}>다른 지역</div>
      <ul>
        {locationData.slice(1).map((location, idx) => {
          const key = `location-${idx}`
          return (
            <li key={key}>
              <LocationItem data={location} />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ListMode
