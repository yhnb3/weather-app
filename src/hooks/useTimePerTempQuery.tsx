import { useQuery } from 'react-query'
import { getWeatherForecastTimePer } from 'services/weather'

interface IProps {
  lat: number
  lon: number
}

export const useTimePerTempQuery = ({ lat, lon }: IProps) => {
  const { data } = useQuery(['timePerTemp', lat, lon], () =>
    getWeatherForecastTimePer({ lat, lon }).then((res) => {
      return res.data
    })
  )
  return { data }
}
