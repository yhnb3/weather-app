import { atom } from 'recoil'
import { ICurrentWeather, ITimePerWeather } from 'types/weather'

interface ILocationData {
  lat: number
  lon: number
  name: string
  currentData?: ICurrentWeather
  timePerData?: ITimePerWeather
}

export const locationState = atom<ILocationData[]>({
  key: '#defaultLocationState',
  default: [
    {
      lat: 35.85,
      lon: 128.56,
      name: '대구',
    },
    {
      lat: 37.541,
      lon: 126.986,
      name: '서울',
    },
  ],
})
