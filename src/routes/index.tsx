import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import styles from './routes.module.scss'

import Weather from './Weather'
import Manage from './Manage'
import Loading from 'components/Lodaing'

const App = () => {
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
