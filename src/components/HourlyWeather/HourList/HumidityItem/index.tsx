import { EmptyWaterDrop, HalfWaterDrop, WaterDrop } from 'assets/svgs'
import { useMemo } from 'react'
import { IHourly } from 'types/weather'
import styles from './humidityItem.module.scss'

interface IProps {
  data: IHourly
}

const HumidityItem = ({ data }: IProps) => {
  const humidityIcon = useMemo(() => {
    if (data.humidity >= 80) return <WaterDrop className={styles.icon} />
    if (data.humidity >= 20) return <HalfWaterDrop className={styles.icon} />
    return <EmptyWaterDrop className={styles.icon} />
  }, [data])
  return (
    <li className={styles.itemContainer}>
      <div className={styles.humidityItem}>
        {humidityIcon}
        <p>{data.humidity}%</p>
      </div>
    </li>
  )
}

export default HumidityItem
