import { ILocationData } from 'types/location'
import styles from './locationItem.module.scss'

interface IProps {
  data: ILocationData
}

const LocationItem = ({ data }: IProps) => {
  return (
    <div className={styles.locationItem}>
      <div className={styles.left}>{data.name}</div>
      <div className={styles.right}>
        <div className={styles.rightTop}>
          <img
            className={styles.tempImg}
            src={`http://openweathermap.org/img/wn/${data.currentData.weather[0].icon}@2x.png`}
            alt={data.currentData?.weather[0].description}
          />
          <div className={styles.temp}>{Math.round(Number(data.currentData.main.temp))}° </div>
        </div>
        <div className={styles.rightBottom}>
          <div />
          <div className={styles.minMaxTemp}>
            {Math.round(data.timePerData.daily[0].temp.max)}° /{Math.round(data.timePerData.daily[0].temp.min)}°
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationItem
