import styles from './hourlyWeather.module.scss'

import { ITimePerWeather } from 'types/weather.d'
import HourList from './HourList'

interface IProps {
  timePerData: ITimePerWeather | undefined
}
const HourlyWeather = ({ timePerData }: IProps) => {
  if (timePerData === undefined) return null

  return (
    <div className={styles.hourContainer}>
      <HourList hourlyData={timePerData.hourly.slice(1, 20)} />
    </div>
  )
}

export default HourlyWeather