import { useCurrentTempQuery } from './useCurrentTempQuery'
import { useTimePerTempQuery } from './useTimePerTempQuery'

interface IProps {
  lat: number
  lon: number
  idx: number
}

export const useTempQuery = ({ lat, lon, idx }: IProps) => {
  useCurrentTempQuery({ lat, lon, idx })
  useTimePerTempQuery({ lat, lon, idx })
}
