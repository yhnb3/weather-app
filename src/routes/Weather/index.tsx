import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import styles from './weather.module.scss'

import getDay from 'utils/getDay'
import CurrentWeather from './CurrentWeather'

const Weather = () => {
  const lat = 35.85
  const lon = 128.56
  // const { isLoading, error, data } = useQuery('repoData', () =>
  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${process.env.REACT_APP_WEATHER_APP_ID}`
  //   ).then((res) => res.json())
  // )

  // if (isLoading) return <p>loading...</p>
  // if (error) return <p>error</p>
  // console.log(data)

  return (
    <div className={styles.container}>
      <CurrentWeather lat={lat} lon={lon} />
    </div>
  )
}

export default Weather
