import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import store from 'store'

import { locationState } from 'states/location'
import { CurrentWeather, HourlyWeather, DailyWeather, EtcInfo } from 'components'
import { useTempQuery } from 'hooks/useTempQuery'

import styles from './weather.module.scss'
import Aside from 'routes/_shared/Aside'
import SunTime from 'components/SunTime'
import { asideOpenState } from 'states/aside'

const WeatherContainer = () => {
  const { city } = useParams()
  const locationData = useRecoilValue(locationState)
  const targetIdx = !city ? 0 : locationData.findIndex((location) => location.name === city)
  const isAside = useRecoilValue(asideOpenState)

  const { lat, lon, name } = locationData[targetIdx]

  const { currentData, timePerData } = useTempQuery({ lat, lon })

  if (!currentData || !timePerData) return null

  store.set('locationData', locationData)

  return (
    <div className={cx(styles.weaterContainer, { [styles.isAside]: isAside })}>
      <div className={cx(styles.outerContainer, { [styles.isAside]: isAside })}>
        <header>
          <CurrentWeather currentData={currentData} timePerData={timePerData} name={name} />
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
      </div>

      <aside className={cx({ [styles.isAside]: isAside })}>
        <Aside />
      </aside>
    </div>
  )
}

export default WeatherContainer
