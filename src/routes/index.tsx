import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import styles from './routes.module.scss'

import Weather from './Weather'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Suspense fallback={<p>로딩중...</p>}>
          <Routes>
            <Route path='/' element={<Weather />}>
              <Route path=':city' element={<Weather />} />
            </Route>
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
