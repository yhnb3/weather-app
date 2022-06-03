export interface ILocationRes {
  roadAddress: string
  jibunAddress: string
  englishAddress: string
  x: string
  y: string
  distance: number
}

export interface ILocationData {
  lat: number
  lon: number
  name: string
  currentData?: ICurrentWeather
  timePerData?: ITimePerWeather
}
