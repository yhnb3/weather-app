import dayjs from 'dayjs'

import styles from './hourTempItem.module.scss'
import { IHourly } from 'types/weather.d'

interface IProps {
  data: IHourly
}

const HourTempItem = ({ data }: IProps) => {
  const ampm = dayjs.unix(data.dt).format('A') === 'AM' ? '오전' : '오후'
  const hour = dayjs.unix(data.dt).format('h')
  return (
    <li className={styles.itemContainer}>
      <div className={styles.hourItem}>
        <p>
          {ampm} {hour}시
        </p>
        <img
          draggable='false'
          className={styles.icon}
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
        <p>
          {Math.round(data.temp)}
          <sup>°</sup>
        </p>
      </div>
    </li>
  )
}

export default HourTempItem
