import { useState, MouseEvent } from 'react'

import styles from './hourlyWeather.module.scss'
import { IHourly } from 'types/weather.d'
import HourListItem from './HourListItem'
import Chart from './Chart'

interface IProps {
  hourlyData: IHourly[]
}

const HourList = ({ hourlyData }: IProps) => {
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
        {hourlyData.map((data: IHourly) => (
          <HourListItem data={data} key={data.dt} />
        ))}
      </ul>
      <Chart hourlyData={hourlyData} />
    </div>
  )
}

export default HourList
