import { useState } from 'react'
import cx from 'classnames'
import { ITimePerWeather } from 'types/weather.d'
import HourList from './HourList'
import styles from './hourlyWeather.module.scss'
import { useRecoilValue } from 'recoil'
import { themeState } from 'states/theme'

interface IProps {
  timePerData: ITimePerWeather | undefined
}
const HourlyWeather = ({ timePerData }: IProps) => {
  const [isAfter, setIsAfter] = useState(true)
  const theme = useRecoilValue(themeState)
  const isDark = theme === 'dark'
  const [isBefore, setIsBefore] = useState(false)
  if (timePerData === undefined) return null

  return (
    <>
      <h2 className={styles.allyHidden}>시간별 날씨</h2>
      <section
        className={cx(
          styles.hourContainer,
          { [styles.notIsAfter]: !isAfter },
          { [styles.notIsBefore]: !isBefore },
          { [styles.isDark]: isDark }
        )}
      >
        <HourList hourlyData={timePerData.hourly.slice(1, 20)} setIsAfter={setIsAfter} setIsBefore={setIsBefore} />
      </section>
    </>
  )
}

export default HourlyWeather
