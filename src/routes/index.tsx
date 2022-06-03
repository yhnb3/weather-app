import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useMount } from 'react-use'
import { useSetRecoilState } from 'recoil'
import dayjs from 'dayjs'

import styles from './routes.module.scss'
import Weather from './Weather'
import Manage from './Manage'
import Loading from 'components/Lodaing'

import { themeState } from 'states/theme'

const App = () => {
  const setTheme = useSetRecoilState(themeState)
  useMount(() => {
    if (Number(dayjs(Date.now()).format('H')) >= 7 && Number(dayjs(Date.now()).format('H')) >= 19) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  })
  return (
    <div className={styles.appWrapper}>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<Loading isManage={false} />}>
              <Weather />
            </Suspense>
          }
        >
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
