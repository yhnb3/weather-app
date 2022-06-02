import { atom } from 'recoil'

export const asideOpenState = atom<boolean>({
  key: '#asideOpenState',
  default: false,
})
