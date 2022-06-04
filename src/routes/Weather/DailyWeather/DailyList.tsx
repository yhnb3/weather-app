import { useRecoilValue } from 'recoil'
import cx from 'classnames'

import styles from './dailyWeather.module.scss'
import { IDaily } from 'types/weather.d'
import DailyListItem from './DailyListItem'
import { themeState } from 'states/theme'

interface IProps {
  daily: IDaily[]
}
const DailyList = ({ daily }: IProps) => {
  const theme = useRecoilValue(themeState)
  const isDark = theme === 'dark'
  return (
    <div className={cx(styles.dailyWrapper, { [styles.isDark]: isDark })}>
      <ul>
        {daily.map((data) => (
          <DailyListItem data={data} key={data.dt} />
        ))}
      </ul>
    </div>
  )
}
export default DailyList
