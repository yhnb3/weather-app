import { ITimePerWeather } from 'types/weather.d'
import DailyList from './DailyList'
import styles from './dailyWeather.module.scss'

interface IProps {
  timePerData: ITimePerWeather | undefined
}
const DailyWeather = ({ timePerData }: IProps) => {
  if (!timePerData) return null
  return (
    <>
      <h2 className={styles.allyHidden}>일간 날씨</h2>
      <section>
        <DailyList daily={timePerData.daily.slice(1)} />
      </section>
    </>
  )
}

export default DailyWeather
