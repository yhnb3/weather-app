import styles from './weather.module.scss'
import { useQuery } from 'react-query'

import { getWeatherForecastCurrent, getWeatherForecastTimePer } from 'services/weather'
import CurrentWeather from 'components/CurrentWeather'
import HourlyWeather from 'components/HourlyWeather'

const LAT = 35.85
const LON = 128.56

const Weather = () => {
  const {
    data: currentData,
    isLoading: currentIsLoading,
    error: currentError,
  } = useQuery(['currentTempData', LAT, LON], () =>
    getWeatherForecastCurrent({ lat: LAT, lon: LON }).then((res) => res.data)
  )
  const {
    data: timePerData,
    isLoading: timePerIsLoading,
    error: timePerError,
  } = useQuery(['dailyTempData', LAT, LON], () =>
    getWeatherForecastTimePer({ lat: LAT, lon: LON }).then((res) => res.data)
  )
  if (currentIsLoading || timePerIsLoading) return <p>loading...</p>
  if (currentError || timePerError) return <p>error</p>

  return (
    <div className={styles.container}>
      <CurrentWeather currentData={currentData} timePerData={timePerData} />
      <HourlyWeather timePerData={timePerData} />
    </div>
  )
}

export default Weather
