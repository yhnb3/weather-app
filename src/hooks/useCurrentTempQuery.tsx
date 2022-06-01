import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { getWeatherForecastCurrent } from 'services/weather'
import { locationState } from 'states/location'

interface IProps {
  lat: number
  lon: number
  idx: number
}

export const useCurrentTempQuery = ({ lat, lon, idx }: IProps) => {
  const setLocationData = useSetRecoilState(locationState)

  useQuery(['currentTemp', lat, lon], () =>
    getWeatherForecastCurrent({ lat, lon }).then((res) => {
      setLocationData((prev) => [
        ...prev.slice(0, idx),
        { ...prev[idx], currentData: res.data },
        ...prev.slice(idx + 1),
      ])
    })
  )
}
