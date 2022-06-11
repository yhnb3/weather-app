import cx from 'classnames'

import styles from './loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.locationItemLoading}>
      <svg className={styles.svgContainer} height={50} width={50} viewBox='0 0 50 50'>
        <circle className={cx(styles.loaderSvg, styles.animate)} cx={25} cy={25} r={23} />
      </svg>
    </div>
  )
}

export default Loading
