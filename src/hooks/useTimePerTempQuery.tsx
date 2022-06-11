import { useQuery } from 'react-query'
import { getWeatherForecastTimePer } from 'services/weather'

interface IProps {
  lat: number
  lon: number
  time: string
}

export const useTimePerTempQuery = ({ lat, lon, time }: IProps) => {
  const { isLoading, data } = useQuery([`timePerTemp-${time}`, lat, lon], () =>
    getWeatherForecastTimePer({ lat, lon }).then((res) => {
      return res.data
    })
  )
  return { isLoading, data }
}
