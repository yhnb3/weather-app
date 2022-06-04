import { useCurrentTempQuery } from './useCurrentTempQuery'
import { useTimePerTempQuery } from './useTimePerTempQuery'

interface IProps {
  lat: number
  lon: number
}

export const useTempQuery = ({ lat, lon }: IProps) => {
  const { data: currentData } = useCurrentTempQuery({ lat, lon })
  const { data: timePerData } = useTimePerTempQuery({ lat, lon })
  return { currentData, timePerData }
}
