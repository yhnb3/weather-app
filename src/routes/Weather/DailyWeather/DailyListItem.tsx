import { useMemo } from 'react'
import dayjs from 'dayjs'

import styles from './dailyWeather.module.scss'
import getDay from 'utils/getDay'
import { IDaily } from 'types/weather.d'
import { EmptyWaterDropIcon, HalfWaterDropIcon, WaterDropIcon } from 'assets/svgs'

interface IProps {
  data: IDaily
}
const DailyListItem = ({ data }: IProps) => {
  const humidityIcon = useMemo(() => {
    if (data.humidity >= 80) return <WaterDropIcon className={styles.icon} />
    if (data.humidity >= 20) return <HalfWaterDropIcon className={styles.icon} />
    return <EmptyWaterDropIcon className={styles.icon} />
  }, [data])
  return (
    <li>
      <div className={styles.dailyItem}>
        <span>{getDay(Number(dayjs.unix(data.dt).format('d')))}요일</span>
        <div className={styles.tempInfo}>
          <div className={styles.humidity}>
            {humidityIcon}
            {data.humidity}%
          </div>
          <img
            className={styles.image}
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
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
