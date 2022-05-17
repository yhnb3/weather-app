import styles from './dailyWeather.module.scss'
import { IDaily } from 'types/weather.d'
import DailyListItem from './DailyListItem'

interface IProps {
  daily: IDaily[]
}
const DailyList = ({ daily }: IProps) => {
  return (
    <div className={styles.dailyWrapper}>
      <ul>
        {daily.map((data) => (
          <DailyListItem data={data} key={data.dt} />
        ))}
      </ul>
    </div>
  )
}
export default DailyList
