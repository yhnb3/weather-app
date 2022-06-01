import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { getWeatherForecastTimePer } from 'services/weather'
import { locationState } from 'states/location'

interface IProps {
  lat: number
  lon: number
  idx: number
}

export const useTimePerTempQuery = ({ lat, lon, idx }: IProps) => {
  const setLocationData = useSetRecoilState(locationState)
  useQuery(['timePerTemp', lat, lon], () =>
    getWeatherForecastTimePer({ lat, lon }).then((res) => {
      setLocationData((prev) => [
        ...prev.slice(0, idx),
        { ...prev[idx], timePerData: res.data },
        ...prev.slice(idx + 1),
      ])
    })
  )
}
