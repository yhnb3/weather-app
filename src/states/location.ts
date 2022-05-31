import { atom } from 'recoil'

import { ICoord } from 'types/weather'

export const defaultLoactionState = atom<ICoord>({
  key: 'todos',
  default: {
    lat: 35.85,
    lon: 128.56,
  },
})
