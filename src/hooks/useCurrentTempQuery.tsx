import { useQuery } from 'react-query'
import { getWeatherForecastCurrent } from 'services/weather'

interface IProps {
  lat: number
  lon: number
  time: string
}

export const useCurrentTempQuery = ({ lat, lon, time }: IProps) => {
  const { isLoading, data } = useQuery([`currentTemp-${time}`, lat, lon], () =>
    getWeatherForecastCurrent({ lat, lon }).then((res) => {
      return res.data
    })
  )
  return { isLoading, data }
}
