import { Glasses, Humidity, Wind } from 'assets/svgs'
import styles from './etcInfo.module.scss'

interface IProps {
  uvi: number
  wind: number
  humidity: number
}

const EtcInfo = ({ uvi, wind, humidity }: IProps) => {
  const uviString = () => {
    const value = Math.floor(uvi)
    if (value >= 11) return `위험(${value})`
    if (value >= 8) return `매우높음(${value})`
    if (value >= 6) return `높음(${value})`
    if (value >= 3) return `보통(${value})`
    return `낮음(${value})`
  }
  return (
    <div className={styles.etcInfoContainer}>
      <div className={styles.infoItem}>
        <Glasses className={styles.glassIcon} />
        <div className={styles.type}>자외선지수</div>
        <div className={styles.value}>{uviString()}</div>
      </div>
      <div className={styles.infoItem}>
        <Wind className={styles.windIcon} />
        <div className={styles.type}>바람</div>
        <div className={styles.value}>{Math.floor(wind)}m/s</div>
      </div>
      <div className={styles.infoItem}>
        <Humidity className={styles.humidityIcon} />
        <div className={styles.type}>습도</div>
        <div className={styles.value}>{Math.floor(humidity)}%</div>
      </div>
    </div>
  )
}

export default EtcInfo
