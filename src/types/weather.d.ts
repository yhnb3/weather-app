interface ICoord {
  lat: number
  lon: number
}

interface ICity {
  id: number
  name: string
  coord: ICoord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

interface IMain {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface IWeather {
  id: number
  main: string
  description: string
  icon: string
}
interface ISys {
  country: string
  id: number
  sunrise: number
  sunset: number
  type: number
}
export interface ICurrentWeather {
  base: string
  clouds: {
    all: number
  }
  cod: number
  dt: number
  id: number
  name: string
  main: IMain
  weather: IWeather[]
  wind: {
    speed: number
    deg: number
  }
  visibility: number
  pop: number
  rain?: {
    '3h': number
  }
  sys: {
    pod: string
  }
}
interface IFeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}
interface ITemp {
  day: number
  eve: number
  max: number
  min: number
  morn: number
  night: number
}
interface IWeatherItem {
  id: number
  main: string
  description: string
  icon: string
}
interface IDaily {
  clouds: number
  dew_point: number
  dt: number
  feels_like: IFeelsLike
  humidity: number
  moon_phase: number
  moonrise: number
  moonset: number
  pop: number
  pressure: number
  sunrise: number
  sunset: number
  temp: ITemp
  uvi: number
  weather: IWeatherItem[]
  wind_deg: number
  wind_gust: number
  wind_speed: number
}
interface IHourly {
  clouds: number
  dew_point: number
  dt: number
  feels_like: number
  humidity: number
  pop: number
  pressure: number
  temp: number
  uvi: number
  visibility: number
  weather: IWeatherItem[]
  wind_deg: number
  wind_gust: number
  wind_speed: number
}

export interface ITimePerWeather {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  daily: IDaily[]
  hourly: IHourly[]
}
