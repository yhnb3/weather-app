import { axios } from 'hooks/worker'
import { ILocationRes } from 'types/location'

const GEOCODING_BASE_URL = 'https://weather-app-kw.herokuapp.com/api/data/api/data'

export const getLocation = (params: string) =>
  axios
    .get<ILocationRes>(`${GEOCODING_BASE_URL}`, {
      params: {
        query: params,
      },
    })
    .then((res) => res.data)
