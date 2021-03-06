import { LoadingIndicator } from 'components'

import styles from './loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.locationItemLoading}>
      <LoadingIndicator size={0.3} />
    </div>
  )
}

export default Loading
