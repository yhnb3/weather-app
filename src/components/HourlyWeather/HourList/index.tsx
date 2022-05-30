import { useState, MouseEvent, Dispatch, SetStateAction } from 'react'

import styles from './hourList.module.scss'
import { IHourly } from 'types/weather.d'
import HourTempItem from './HourTempItem'
import Chart from './Chart'
import HumidityItem from './HumidityItem'

interface IProps {
  hourlyData: IHourly[]
  setIsAfter: Dispatch<SetStateAction<boolean>>
  setIsBefore: Dispatch<SetStateAction<boolean>>
}

const HourList = ({ hourlyData, setIsAfter, setIsBefore }: IProps) => {
  const [positionX, setPositionX] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleMouseDown = (event: MouseEvent) => {
    setIsMouseDown(true)
    setScrollX(event.currentTarget.scrollLeft)
    setPositionX(event.clientX)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isMouseDown) {
      const dx = positionX - event.clientX
      const width = event.currentTarget.scrollWidth
      if (event.currentTarget.scrollLeft === 0) {
        setIsBefore(false)
      } else {
        setIsBefore(true)
      }
      if (event.currentTarget.scrollLeft + event.currentTarget.clientWidth === width) {
        setIsAfter(false)
      } else {
        setIsAfter(true)
      }

      if (scrollX + dx <= 0) {
        event.currentTarget.scrollLeft = 0
      } else if (scrollX + dx >= width) {
        event.currentTarget.scrollLeft = width
      } else {
        event.currentTarget.scrollLeft = scrollX + dx
      }
    }
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }
  return (
    <div
      role='button'
      tabIndex={0}
      className={styles.listWrapper}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <ul>
        {hourlyData.map((data: IHourly) => {
          const key = `temp-${data.dt}`
          return <HourTempItem data={data} key={key} />
        })}
      </ul>
      <Chart hourlyData={hourlyData} />
      <ul>
        {hourlyData.map((data: IHourly) => {
          const key = `humidity-${data.dt}`
          return <HumidityItem data={data} key={key} />
        })}
      </ul>
    </div>
  )
}

export default HourList
