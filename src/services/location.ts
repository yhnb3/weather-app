import { axios } from 'hooks/worker'
import { ILocationRes } from 'types/location'

const PROXY = window.location.hostname === '' ? '' : '/proxy'

const GEOCODING_BASE_URL = '/map-geocode/v2/geocode'

export const getLocation = (params: string) =>
  axios
    .get<ILocationRes>(`${PROXY}${GEOCODING_BASE_URL}`, {
      headers: {
        'X-NCP-APIGW-API-KEY': String(process.env.REACT_APP_NAVER_SECRET_KEY),
        'X-NCP-APIGW-API-KEY-ID': String(process.env.REACT_APP_NAVER_API_KEY),
      },
      params: {
        query: params,
      },
    })
    .then((res) => res.data)
