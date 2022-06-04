import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import cx from 'classnames'
import store from 'store'

import { locationState } from 'states/location'
import { useTempQuery } from 'hooks/useTempQuery'
import styles from './location.module.scss'
import { asideOpenState } from 'states/aside'

interface IProps {
  lat: number
  lon: number
  idx: number
}

const LocationItem = ({ lat, lon, idx }: IProps) => {
  const locationData = useRecoilValue(locationState)
  const setIsAside = useSetRecoilState(asideOpenState)
  const navigate = useNavigate()
  const { currentData } = useTempQuery({ lat, lon })
  const data = locationData[idx]
  const isBold = !idx

  store.set('locationData', locationData)

  const handleLinkClick = () => {
    setIsAside(false)
    navigate(`${data.name}`)
  }

  return (
    <li>
      <div role='button' tabIndex={0} className={styles.locationItem} onClick={handleLinkClick}>
        <div className={cx(styles.locationName, { [styles.isBold]: isBold })}>{data.name}</div>
        <div className={styles.locationTemp}>
          <img
            className={styles.tempImg}
            src={`https://openweathermap.org/img/wn/${currentData?.weather[0].icon}@2x.png`}
            alt={currentData?.weather[0].description}
          />
          <div className={styles.temp}>{Math.round(Number(currentData?.main.temp))}° </div>
        </div>
      </div>
    </li>
  )
}

export default LocationItem
