import { useQuery } from 'react-query'
import { getWeatherForecastCurrent } from 'services/weather'

interface IProps {
  lat: number
  lon: number
}

export const useCurrentTempQuery = ({ lat, lon }: IProps) => {
  const { data } = useQuery(['currentTemp', lat, lon], () =>
    getWeatherForecastCurrent({ lat, lon }).then((res) => {
      return res.data
    })
  )
  return { data }
}
