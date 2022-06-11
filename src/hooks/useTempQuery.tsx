import dayjs from 'dayjs'
import { useCurrentTempQuery } from './useCurrentTempQuery'
import { useTimePerTempQuery } from './useTimePerTempQuery'

interface IProps {
  lat: number
  lon: number
}

export const useTempQuery = ({ lat, lon }: IProps) => {
  const time = dayjs(new Date()).format('HH')
  const { data: currentData, isLoading: currentTempLoading } = useCurrentTempQuery({ lat, lon, time })
  const { data: timePerData, isLoading: timePerLoading } = useTimePerTempQuery({ lat, lon, time })
  return { isLoading: currentTempLoading || timePerLoading, currentData, timePerData }
}
