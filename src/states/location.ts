import { atom } from 'recoil'
import { ILocationData } from 'types/location'

export const locationState = atom<ILocationData[]>({
  key: '#defaultLocationState',
  default: [],
})

// {
//   lat: 35.85,
//   lon: 128.56,
//   name: '대구',
// },
// {
//   lat: 37.541,
//   lon: 126.986,
//   name: '서울',
// },
