import { Dispatch, SetStateAction } from 'react'
import { useSetRecoilState } from 'recoil'

import { locationState } from 'states/location'
import { ILocationAddress } from 'types/location'
import styles from './addMode.module.scss'

interface IProps {
  data: ILocationAddress
  setIsAdd: Dispatch<SetStateAction<boolean>>
}

const ResultItem = ({ data, setIsAdd }: IProps) => {
  const setLocationData = useSetRecoilState(locationState)
  let name = ''
  for (let idx = 0; idx < 9; idx += 1) {
    if (data.addressElements[idx].shortName === '') break
    name = data.addressElements[idx].shortName
  }

  const handleClick = () => {
    setLocationData((prev) => [...prev, { name, lat: Number(data.y), lon: Number(data.x) }])
    setIsAdd(false)
  }
  return (
    <button className={styles.button} type='button' onClick={handleClick}>
      {data.jibunAddress}
    </button>
  )
}

export default ResultItem
