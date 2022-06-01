import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import cx from 'classnames'

import { defaultLoactionState } from 'states/location'
import { getWeatherForecastCurrent, getWeatherForecastTimePer } from 'services/weather'
import { CurrentWeather, HourlyWeather, DailyWeather, EtcInfo } from 'components'
import styles from './weather.module.scss'
import Aside from 'routes/_shared/Aside'
import SunTime from 'components/SunTime'

const Weather = () => {
  const { lat, lon } = useRecoilValue(defaultLoactionState)
  const [isAside, setIsAside] = useState(false)
  const { data: currentData } = useQuery(['currentTempData', lat, lon], () =>
    getWeatherForecastCurrent({ lat, lon }).then((res) => res.data)
  )
  const { data: timePerData } = useQuery(['dailyTempData', lat, lon], () =>
    getWeatherForecastTimePer({ lat, lon }).then((res) => res.data)
  )

  // const { data: locationData } = useQuery(['locationData', KEYWORD], () => {
  //   getLocation(KEYWORD).then((res) => console.log(res.data))
  // })

  if (!currentData || !timePerData) return null
  return (
    <div className={cx(styles.container, { [styles.isAside]: isAside })}>
      <header>
        <CurrentWeather currentData={currentData} timePerData={timePerData} setIsAside={setIsAside} />
      </header>
      <main>
        <HourlyWeather timePerData={timePerData} />
        <DailyWeather timePerData={timePerData} />
        <SunTime sunRise={currentData.sys.sunrise} sunSet={currentData.sys.sunset} />
        <EtcInfo
          uvi={timePerData.daily[0].uvi}
          humidity={timePerData.daily[0].humidity}
          wind={timePerData.daily[0].wind_speed}
        />
      </main>
      <aside className={cx({ [styles.isAside]: isAside })}>
        <Aside setIsAside={setIsAside} />
      </aside>
    </div>
  )
}

export default Weather
