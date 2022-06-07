import { Suspense, useMemo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useMount } from 'react-use'
import { useRecoilState, useSetRecoilState } from 'recoil'
import dayjs from 'dayjs'
import store from 'store'

import styles from './routes.module.scss'
import Weather from './Weather'
import Manage from './Manage'
import Loading from 'components/Loading'

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

  const home = useMemo(() => {
    if (locationData.length > 0)
      return (
        <Suspense fallback={<Loading isManage={false} />}>
          <Weather />
        </Suspense>
      )
    if (localLocationData.length === 0) {
      return <Navigate to='manage' />
    }
    return (
      <Suspense fallback={<Loading isManage={false} />}>
        <Weather />
      </Suspense>
    )
  }, [localLocationData.length, locationData.length])

  return (
    <div className={styles.appWrapper}>
      <Routes>
        <Route path='/' element={home}>
          <Route
            path=':city'
            element={
              <Suspense fallback={<Loading isManage={false} />}>
                <Weather />
              </Suspense>
            }
          />
        </Route>
        <Route
          path='manage'
          element={
            <Suspense fallback={<Loading isManage />}>
              <Manage />
            </Suspense>
          }
        />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  )
}

export default App
