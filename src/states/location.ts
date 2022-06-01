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
  ],
})

export const defaultLocationState = atom<ILocationData>({
  key: '#favoriteLocationState',
  default: {
    lat: 35.85,
    lon: 128.56,
    name: '대구',
  },
})
