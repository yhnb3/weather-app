import { useState } from 'react'
import { useQuery } from 'react-query'
import cx from 'classnames'

import { getWeatherForecastCurrent, getWeatherForecastTimePer } from 'services/weather'
import { CurrentWeather, HourlyWeather, DailyWeather } from 'components'
import styles from './weather.module.scss'
import Aside from 'routes/_shared/Aside'

const LAT = 35.85
const LON = 128.56

const Weather = () => {
  const [isAside, setIsAside] = useState(false)
  const { data: currentData } = useQuery(['currentTempData', LAT, LON], () =>
    getWeatherForecastCurrent({ lat: LAT, lon: LON }).then((res) => res.data)
  )
  const { data: timePerData } = useQuery(['dailyTempData', LAT, LON], () =>
    getWeatherForecastTimePer({ lat: LAT, lon: LON }).then((res) => res.data)
  )

  return (
    <div className={cx(styles.container, { [styles.isAside]: isAside })}>
      <header>
        <CurrentWeather currentData={currentData} timePerData={timePerData} setIsAside={setIsAside} />
      </header>
      <main>
        <HourlyWeather timePerData={timePerData} />
        <DailyWeather timePerData={timePerData} />
      </main>
      <aside className={cx({ [styles.isAside]: isAside })}>
        <Aside setIsAside={setIsAside} />
      </aside>
    </div>
  )
}

export default Weather
