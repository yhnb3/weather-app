import cx from 'classnames'

import styles from './loadingIndicator.module.scss'

interface IProps {
  size?: number
}

const Loading = ({ size = 1 }: IProps) => {
  return (
    <svg height={`${100 * size}`} width={`${100 * size}`} viewBox={`0 0 ${100 * size} ${100 * size}`}>
      <circle
        className={cx(styles.loaderSvg, styles.animate)}
        cx={`${50 * size}`}
        cy={`${50 * size}`}
        r={`${45 * size}`}
      />
    </svg>
  )
}

export default Loading
