import { useState, UIEvent, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import cx from 'classnames'

import { locationState } from 'states/location'
import { useTempQuery } from 'hooks/useTempQuery'

import CurrentWeather from './CurrentWeather'
import HourlyWeather from './HourlyWeather'
import DailyWeather from './DailyWeather'
import EtcInfo from './EtcInfo'
import SunTime from './SunTime'

import styles from './weather.module.scss'
import Aside from 'routes/_shared/Aside'
import { asideOpenState } from 'states/aside'
import Loading from './Loading'
import dayjs from 'dayjs'

const WeatherContainer = () => {
  const { city } = useParams()
  const timerRef = useRef<NodeJS.Timer | undefined>(undefined)
  const locationData = useRecoilValue(locationState)
  const targetIdx = !city ? 0 : locationData.findIndex((location) => location.name === city)
  const isAside = useRecoilValue(asideOpenState)
  const [height, setHeight] = useState(220)
  const { lat, lon, name } = locationData[targetIdx]
  const { isLoading, currentData, timePerData } = useTempQuery({ lat, lon })
  const [currentTime, setCurrentTime] = useState(dayjs(new Date()).format('HH:mm'))

  const opacity = 1 - (220 - height) / 50 >= 0 ? 1 - (220 - height) / 50 : 0

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const now = dayjs(new Date()).format('HH:mm')
      if (currentTime !== now) {
        setCurrentTime(now)
      }
    }, 1000)

    return () => {
      clearInterval(timerRef.current)
    }
  }, [currentTime])

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    setHeight(220 - event.currentTarget.scrollTop >= 130 ? 220 - event.currentTarget.scrollTop : 130)
  }

  if (isLoading) return <Loading />
  if (!currentData || !timePerData) return null
  return (
    <div className={cx(styles.weatherContainer, { [styles.isAside]: isAside })}>
      <h1 className={styles.allyHidden}>{name}</h1>
      <article className={cx(styles.outerContainer, { [styles.isAside]: isAside })}>
        <header style={{ height: `${height}px` }}>
          <CurrentWeather
            currentData={currentData}
            timePerData={timePerData}
            name={name}
            opacity={opacity}
            height={height}
            time={currentTime}
          />
        </header>
        <div className={styles.scrollFriendly} onScroll={handleScroll}>
          <HourlyWeather timePerData={timePerData} />
          <DailyWeather timePerData={timePerData} />
          <SunTime sunRise={currentData.sys.sunrise} sunSet={currentData.sys.sunset} />
          <EtcInfo
            uvi={timePerData.daily[0].uvi}
            humidity={timePerData.daily[0].humidity}
            wind={timePerData.daily[0].wind_speed}
          />
        </div>
      </article>

      <nav className={cx({ [styles.isAside]: isAside })}>
        <Aside />
      </nav>
    </div>
  )
}

export default WeatherContainer
