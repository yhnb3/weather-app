import cx from 'classnames'
import { LoadingIndicator } from 'components'
import { useRecoilValue } from 'recoil'

import { themeState } from 'states/theme'
import styles from './loading.module.scss'

const Loading = () => {
  const theme = useRecoilValue(themeState)
  const isDark = theme === 'dark'
  return (
    <div className={cx(styles.loadingContainer, { [styles.isDark]: isDark })}>
      <LoadingIndicator />
    </div>
  )
}

export default Loading
