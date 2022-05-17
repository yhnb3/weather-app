import dayjs from 'dayjs'
import styles from './weather.module.scss'

import getDay from 'utils/getDay'
import { ICurrentWeather, ITimePerWeather } from 'types/weather.d'

interface IProps {
  currentData: ICurrentWeather | undefined
  timePerData: ITimePerWeather | undefined
}
const CurrentWeather = ({ currentData, timePerData }: IProps) => {
  if (currentData === undefined) return null
  if (timePerData === undefined) return null

  const { daily: dailyData } = timePerData

  const ampm = dayjs.unix(currentData.dt).format('A') === 'PM' ? '오후' : '오전'

  return (
    <div className={styles.current}>
      <div className={styles.currentMain}>
        <div className={styles.currentMainLeft}>
          <p className={styles.temperature}>
            {Math.round(currentData.main.temp)}
            <sup>°</sup>
          </p>
        </div>
        <div className={styles.currentMainRight}>{currentData.weather[0].description}</div>
      </div>
      <p className={styles.city}>{currentData.name}</p>
      <p>
        {Math.round(dailyData[0].temp.max)}° / {Math.round(timePerData.daily[0].temp.min)}°{' '}
        <span className={styles.feelsLike}>체감온도 {Math.round(currentData.main.feels_like)}°</span>
      </p>
      <p>
        {getDay(Number(dayjs.unix(currentData.dt).format('d')))}, {ampm} {dayjs.unix(currentData.dt).format('h:m')}
      </p>
    </div>
  )
}

export default CurrentWeather
