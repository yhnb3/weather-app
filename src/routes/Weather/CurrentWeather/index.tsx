import { useRecoilValue, useSetRecoilState } from 'recoil'
import dayjs from 'dayjs'
import cx from 'classnames'

import { ICurrentWeather, ITimePerWeather } from 'types/weather.d'
import styles from './currentWeather.module.scss'
import { HamburgerIcon } from 'assets/svgs'
import { asideOpenState } from 'states/aside'
import { themeState } from 'states/theme'
import getDay from 'utils/getDay'

interface IProps {
  currentData: ICurrentWeather | undefined
  timePerData: ITimePerWeather | undefined
  name: string
  opacity: number
  height: number
  time: string
}
const CurrentWeather = ({ currentData, timePerData, name, opacity, height, time }: IProps) => {
  const setIsAside = useSetRecoilState(asideOpenState)
  const theme = useRecoilValue(themeState)
  const isDark = theme === 'dark'

  if (currentData === undefined) return null
  if (timePerData === undefined) return null

  const { daily: dailyData } = timePerData
  const ampm = dayjs.unix(currentData.dt).format('A') === 'PM' ? '오후' : '오전'

  const handleHamburgerClick = () => {
    setIsAside(true)
  }

  return (
    <div className={cx(styles.current, { [styles.isDark]: isDark })}>
      <div className={styles.currentHeader}>
        <button type='button' onClick={handleHamburgerClick}>
          <HamburgerIcon className={styles.hamburgerIcon} />
        </button>
        <div className={styles.headerTitle} style={{ opacity: `${1 - opacity}` }}>
          {name}
        </div>
      </div>

      <div className={styles.currentMain}>
        <div className={styles.currentMainLeft}>
          <p className={styles.temperature}>
            {Math.round(currentData.main.temp)}
            <sup>°</sup>
          </p>
        </div>
        <div className={styles.currentMainRight}>
          <img
            src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
            alt={currentData.weather[0].description}
          />
        </div>
      </div>
      <div
        className={styles.city}
        style={{
          opacity: `${opacity}`,
          transform: `translate(${220 - height}px, -${220 - height}px)`,
        }}
      >
        {name}
      </div>
      <div className={styles.tempBox}>
        <div style={{ transform: `translate(${1.25 * (220 - height)}px, -${0.9 * (220 - height)}px)` }}>
          {Math.round(dailyData[0].temp.max)}° / {Math.round(timePerData.daily[0].temp.min)}°{' '}
        </div>
        <div
          className={styles.feelsLike}
          style={{ opacity: `${opacity}`, transform: `translate(${220 - height}px, -${220 - height}px)` }}
        >
          체감온도 {Math.round(currentData.main.feels_like)}°
        </div>
      </div>
      <div
        className={styles.day}
        style={{ transform: `translate(${1.25 * (220 - height)}px, -${0.9 * (220 - height)}px)` }}
      >
        {getDay(Number(dayjs.unix(currentData.dt).format('d')))}요일, {time}
      </div>
    </div>
  )
}

export default CurrentWeather
