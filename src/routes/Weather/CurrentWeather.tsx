// import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import styles from './weather.module.scss'

import getDay from 'utils/getDay'
import { useQuery } from 'react-query'

const CURRENT = {
  dt: 1652771479,
  main: {
    humidity: 17,
    pressure: 1012,
    temp: 26.76,
    temp_max: 26.76,
    temp_min: 26.76,
  },
  feels_like: 25.11,
  humidity: 24,
  pressure: 1012,
  sunrise: 1652732360,
  sunset: 1652783109,
  temp: 25.84,
  uvi: 2.79,
  visibility: 10000,
  city: 'Deagu',
}

interface IProps {
  lat: number
  lon: number
}
const CurrentWeather = ({ lat, lon }: IProps) => {
  const ampm = dayjs.unix(CURRENT.dt).format('A') === 'PM' ? '오후' : '오전'
  const currentTemp = useQuery('currentTempData', () =>
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${process.env.REACT_APP_WEATHER_APP_ID}`
    ).then((res) => res.json())
  )
  const dailyTemp = useQuery('dailyTempData', () =>
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&lang=kr&appid=${process.env.REACT_APP_WEATHER_APP_ID}`
    ).then((res) => res.json())
  )

  if (currentTemp.isLoading || dailyTemp.isLoading) return <p>로딩중..</p>
  if (currentTemp.error || dailyTemp.error) return <p>에러</p>
  return (
    <div className={styles.current}>
      <div className={styles.currentMain}>
        <div className={styles.currentMainLeft}>
          <p className={styles.temperature}>
            {Math.round(currentTemp.data.main.temp)}
            <sup>°</sup>
          </p>
        </div>
        <div className={styles.currentMainRight}>{currentTemp.data.weather[0].description}</div>
      </div>
      <p className={styles.city}>{CURRENT.city}</p>
      <p>
        {Math.round(dailyTemp.data.daily[0].temp.max)}° / {Math.round(dailyTemp.data.daily[0].temp.min)}°{' '}
        <span className={styles.feelsLike}>체감온도 {Math.round(currentTemp.data.main.feels_like)}°</span>
      </p>
      <p>
        {getDay(Number(dayjs.unix(CURRENT.dt).format('d')))}, {ampm} {dayjs.unix(CURRENT.dt).format('h:m')}
      </p>
    </div>
  )
}

export default CurrentWeather
