import dayjs from 'dayjs'
import styles from './dailyWeather.module.scss'

import getDay from 'utils/getDay'
import { IDaily } from 'types/weather.d'

interface IProps {
  data: IDaily
}
const DailyListItem = ({ data }: IProps) => {
  return (
    <li>
      <div className={styles.dailyItem}>
        <span>{getDay(Number(dayjs.unix(data.dt).format('d')))}요일</span>
        <div className={styles.tempInfo}>
          <span className={styles.humidity}>{data.humidity}%</span>
          <img
            className={styles.icon}
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />
          <span>
            {Math.round(data.temp.min)}
            <sup>°</sup>
          </span>
          <span>
            {Math.round(data.temp.max)}
            <sup>°</sup>
          </span>
        </div>
      </div>
    </li>
  )
}

export default DailyListItem
