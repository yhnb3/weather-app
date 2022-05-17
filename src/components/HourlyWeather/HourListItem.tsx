import dayjs from 'dayjs'

import styles from './hourlyWeather.module.scss'
import { IHourly } from 'types/weather.d'

interface IProps {
  data: IHourly
}

const HourListItem = ({ data }: IProps) => {
  const ampm = dayjs.unix(data.dt).format('A') === 'AM' ? '오전' : '오후'
  const hour = dayjs.unix(data.dt).format('h')
  return (
    <li className={styles.itemContainer}>
      <div className={styles.hourItem}>
        <p>
          {ampm} {hour}시
        </p>
        <p>{data.weather[0].description}</p>
        <p>
          {Math.round(data.temp)}
          <sup>°</sup>
        </p>
      </div>
    </li>
  )
}

export default HourListItem
