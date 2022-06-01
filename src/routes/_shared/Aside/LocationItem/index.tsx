import { useTempQuery } from 'hooks/useTempQuery'

interface IProps {
  lat: number
  lon: number
  idx: number
}

const LocationItem = ({ lat, lon, idx }: IProps) => {
  useTempQuery({ lat, lon, idx })
  return (
    <div>
      {lat} {lon} {idx}
    </div>
  )
}

export default LocationItem
