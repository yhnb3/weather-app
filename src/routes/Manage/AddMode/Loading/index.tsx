import cx from 'classnames'
import { LoadingIndicator } from 'components'
import styles from './loading.module.scss'

const Loading = () => {
  const isDark = true
  return (
    <div className={cx(styles.loadingContainer, { [styles.isDark]: isDark })}>
      <LoadingIndicator />
    </div>
  )
}

export default Loading
