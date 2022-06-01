import { Sunrise, Sunset } from 'assets/svgs'
import dayjs from 'dayjs'
import styles from './sunTime.module.scss'

interface IProps {
  sunRise: number
  sunSet: number
}

const SunTime = ({ sunRise, sunSet }: IProps) => {
  const timeFormat = (time: number) => {
    const ampm = dayjs.unix(time).format('a') === 'am' ? '오전' : '오후'
    const hour = dayjs.unix(time).format('h')
    const minute = dayjs.unix(time).format('mm')
    return `${ampm} ${hour}:${minute}`
  }
  return (
    <div className={styles.sunTimeContainer}>
      <div className={styles.itemContainer}>
        <div className={styles.type}>일출</div>
        <div className={styles.time}>{timeFormat(sunRise)}</div>
        <Sunrise className={styles.sunriseIcon} />
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.type}>일몰</div>
        <div className={styles.time}>{timeFormat(sunSet)}</div>
        <Sunset className={styles.sunsetIcon} />
      </div>
    </div>
  )
}

export default SunTime