import { ITimePerWeather } from 'types/weather.d'
import DailyList from './DailyList'

interface IProps {
  timePerData: ITimePerWeather | undefined
}
const DailyWeather = ({ timePerData }: IProps) => {
  if (!timePerData) return null
  return <DailyList daily={timePerData.daily.slice(1)} />
}

export default DailyWeather
