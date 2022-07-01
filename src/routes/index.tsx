import { useEffect, useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useMount } from 'react-use'
import { useRecoilState, useSetRecoilState } from 'recoil'
import dayjs from 'dayjs'
import store from 'store'

import styles from './routes.module.scss'
import Weather from './Weather'
import Manage from './Manage'

import { themeState } from 'states/theme'
import { locationState } from 'states/location'

const App = () => {
  const setTheme = useSetRecoilState(themeState)
  const [locationData, setLocationData] = useRecoilState(locationState)
  const localLocationData = store.get('locationData') || []

  useMount(() => {
    if (Number(dayjs(Date.now()).format('H')) >= 7 && Number(dayjs(Date.now()).format('H')) <= 19) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
    setLocationData(localLocationData)
  })

  useEffect(() => {}, [locationData])

  const isData = useMemo(() => {
    return localLocationData.length !== 0
  }, [localLocationData.length])

  const home = useMemo(() => {
    if (!isData) {
      return <Navigate to='manage' />
    }
    return <Weather />
  }, [isData])

  return (
    <div className={styles.appWrapper}>
      <Routes>
        <Route path='/' element={home}>
          <Route path=':city' element={<Weather />} />
        </Route>
        <Route path='manage' element={<Manage />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  )
}

export default App
