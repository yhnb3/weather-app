import dayjs from 'dayjs'

import { ICurrentWeather, ITimePerWeather } from 'types/weather.d'
import styles from './currentWeather.module.scss'
import { Hamburger } from 'assets/svgs'
import { useSetRecoilState } from 'recoil'
import { asideOpenState } from 'states/aside'

interface IProps {
  currentData: ICurrentWeather | undefined
  timePerData: ITimePerWeather | undefined
}
const CurrentWeather = ({ currentData, timePerData }: IProps) => {
  const setIsAside = useSetRecoilState(asideOpenState)
  if (currentData === undefined) return null
  if (timePerData === undefined) return null

  const { daily: dailyData } = timePerData
  const ampm = dayjs.unix(currentData.dt).format('A') === 'PM' ? '오후' : '오전'

  const handleHamburgerClick = () => {
    setIsAside(true)
  }

  return (
    <div className={styles.current}>
      <button type='button' onClick={handleHamburgerClick}>
        <Hamburger className={styles.hamburgerIcon} />
      </button>

      <div className={styles.currentMain}>
        <div className={styles.currentMainLeft}>
          <p className={styles.temperature}>
            {Math.round(currentData.main.temp)}
            <sup>°</sup>
          </p>
        </div>
        <div className={styles.currentMainRight}>
          <img
            src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
            alt={currentData.weather[0].description}
          />
        </div>
      </div>
      <p className={styles.city}>{currentData.name}</p>
      <p>
        {Math.round(dailyData[0].temp.max)}° / {Math.round(timePerData.daily[0].temp.min)}°{' '}
        <span className={styles.feelsLike}>체감온도 {Math.round(currentData.main.feels_like)}°</span>
      </p>
      <p className={styles.updateTime}>
        Updated at {ampm} {dayjs.unix(currentData.dt).format('h:mm')}{' '}
      </p>
    </div>
  )
}

export default CurrentWeather
