import { useRecoilValue } from 'recoil'
import cx from 'classnames'

import { locationState } from 'states/location'
import { useTempQuery } from 'hooks/useTempQuery'
import styles from './location.module.scss'

interface IProps {
  lat: number
  lon: number
  idx: number
}

const LocationItem = ({ lat, lon, idx }: IProps) => {
  const locationData = useRecoilValue(locationState)
  useTempQuery({ lat, lon, idx })
  const data = locationData[idx]
  const isBold = !idx
  return (
    <li>
      <div className={styles.locationItem}>
        <div className={cx(styles.locationName, { [styles.isBold]: isBold })}>{data.name}</div>
        <div className={styles.locationTemp}>
          <img
            className={styles.tempImg}
            src={`http://openweathermap.org/img/wn/${data.currentData?.weather[0].icon}@2x.png`}
            alt={data.currentData?.weather[0].description}
          />
          <div className={styles.temp}>{Math.round(Number(data.currentData?.main.temp))}° </div>
        </div>
      </div>
    </li>
  )
}

export default LocationItem
