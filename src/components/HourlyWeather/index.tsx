import { useState } from 'react'
import cx from 'classnames'
import { ITimePerWeather } from 'types/weather.d'
import HourList from './HourList'
import styles from './hourlyWeather.module.scss'

interface IProps {
  timePerData: ITimePerWeather | undefined
}
const HourlyWeather = ({ timePerData }: IProps) => {
  const [isAfter, setIsAfter] = useState(true)
  const [isBefore, setIsBefore] = useState(false)
  if (timePerData === undefined) return null

  return (
    <div className={cx(styles.hourContainer, { [styles.notIsAfter]: !isAfter }, { [styles.notIsBefore]: !isBefore })}>
      <HourList hourlyData={timePerData.hourly.slice(1, 20)} setIsAfter={setIsAfter} setIsBefore={setIsBefore} />
    </div>
  )
}

export default HourlyWeather
