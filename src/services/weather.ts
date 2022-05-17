import { axios } from 'hooks/worker'
import { ICurrentWeather, ITimePerWeather } from 'types/weather.d'

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

interface Params {
  lat: number
  lon: number
}

export const getWeatherForecastCurrent = (params: Params) =>
  axios.get<ICurrentWeather>(`${WEATHER_BASE_URL}/weather?`, {
    params: {
      ...params,
      appid: process.env.REACT_APP_WEATHER_APP_ID,
      units: 'metric',
      lang: 'kr',
    },
  })

export const getWeatherForecastTimePer = (params: Params) =>
  axios.get<ITimePerWeather>(`${WEATHER_BASE_URL}/onecall?`, {
    params: {
      ...params,
      appid: process.env.REACT_APP_WEATHER_APP_ID,
      units: 'metric',
      exclude: 'current,minutely',
      lang: 'kr',
    },
  })
