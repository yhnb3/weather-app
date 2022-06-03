import cx from 'classnames'
import { useRecoilValue } from 'recoil'

import { themeState } from 'states/theme'
import styles from './loading.module.scss'

interface IProps {
  size?: number
  isManage: boolean
}

const Loading = ({ size = 1, isManage }: IProps) => {
  const theme = useRecoilValue(themeState)
  const isDark = theme === 'dark'
  return (
    <div className={cx(styles.loadingContainer, { [styles.isManage]: isManage }, { [styles.isDark]: isDark })}>
      <svg className={styles.svgContainer} height={`${100 * size}`} width={`${100 * size}`} viewBox='0 0 100 100'>
        <circle
          className={cx(styles.loaderSvg, styles.animate)}
          cx={`${50 * size}`}
          cy={`${50 * size}`}
          r={`${45 * size}`}
        />
      </svg>
    </div>
  )
}

export default Loading
