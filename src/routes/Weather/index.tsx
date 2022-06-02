import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import cx from 'classnames'

import { locationState } from 'states/location'
import { CurrentWeather, HourlyWeather, DailyWeather, EtcInfo } from 'components'
import { useTempQuery } from 'hooks/useTempQuery'

import styles from './weather.module.scss'
import Aside from 'routes/_shared/Aside'
import SunTime from 'components/SunTime'
import { asideOpenState } from 'states/aside'

const Weather = () => {
  const { city } = useParams()
  const locationData = useRecoilValue(locationState)
  const targetIdx = !city ? 0 : locationData.findIndex((location) => location.name === city)
  const isAside = useRecoilValue(asideOpenState)

  const { lat, lon } = locationData[targetIdx]

  useTempQuery({ lat, lon, idx: targetIdx })

  const { currentData, timePerData } = locationData[targetIdx]

  if (!currentData || !timePerData) return null

  return (
    <div className={cx(styles.container, { [styles.isAside]: isAside })}>
      <header>
        <CurrentWeather currentData={currentData} timePerData={timePerData} />
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
        <Aside />
      </aside>
    </div>
  )
}

export default Weather
