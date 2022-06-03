export interface ILocationAddress {
  addressElements: { shortName: string }[]
  roadAddress: string
  jibunAddress: string
  englishAddress: string
  x: string
  y: string
  distance: number
}

export interface ILocationRes {
  addresses: ILocationAddress[]
}

export interface ILocationData {
  lat: number
  lon: number
  name: string
  currentData?: ICurrentWeather
  timePerData?: ITimePerWeather
}
