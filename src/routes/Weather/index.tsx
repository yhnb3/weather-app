import styles from './weather.module.scss'
import { useQuery } from 'react-query'

import { getWeatherForecastCurrent, getWeatherForecastTimePer } from 'services/weather'
import { CurrentWeather, HourlyWeather, DailyWeather } from 'components'

const LAT = 35.85
const LON = 128.56

const Weather = () => {
  const {
    data: currentData,
    isLoading: currentIsLoading,
    error: currentError,
  } = useQuery(
    ['currentTempData', LAT, LON],
    () => getWeatherForecastCurrent({ lat: LAT, lon: LON }).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      refetchInterval: 1000 * 60,
    }
  )
  const {
    data: timePerData,
    isLoading: timePerIsLoading,
    error: timePerError,
  } = useQuery(
    ['dailyTempData', LAT, LON],
    () => getWeatherForecastTimePer({ lat: LAT, lon: LON }).then((res) => res.data),
    {
      refetchInterval: 1000 * 60 * 60,
    }
  )
  if (currentIsLoading || timePerIsLoading) return <p>loading...</p>
  if (currentError || timePerError) return <p>error</p>

  return (
    <div className={styles.container}>
      <CurrentWeather currentData={currentData} timePerData={timePerData} />
      <HourlyWeather timePerData={timePerData} />
      <DailyWeather timePerData={timePerData} />
    </div>
  )
}

export default Weather
