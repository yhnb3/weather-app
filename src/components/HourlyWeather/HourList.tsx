import styles from './hourlyWeather.module.scss'
import { IHourly } from 'types/weather.d'
import HourListItem from './HourListItem'

interface IProps {
  hourlyData: IHourly[]
}

const HourList = ({ hourlyData }: IProps) => {
  return (
    <ul className={styles.listWrapper}>
      {hourlyData.map((data: IHourly) => (
        <HourListItem data={data} key={data.dt} />
      ))}
    </ul>
  )
}

export default HourList
