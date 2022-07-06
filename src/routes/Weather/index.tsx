import { useRecoilValue } from 'recoil'
import cx from 'classnames'

import { locationState } from 'states/location'

import styles from './weather.module.scss'

import { themeState } from 'states/theme'
import WeatherContainer from './WeatherContainer'

const Weather = () => {
  const locationData = useRecoilValue(locationState)
  const theme = useRecoilValue(themeState)
  const isDark = theme === 'dark'

  if (locationData.length === 0) return null
  return (
    <div className={cx(styles.pageContainer, { [styles.isDark]: isDark })}>
      <article>
        <WeatherContainer />
      </article>
    </div>
  )
}

export default Weather
