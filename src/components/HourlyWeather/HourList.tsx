import { useState, MouseEvent, useRef } from 'react'
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryZoomContainer,
} from 'victory'

import styles from './hourlyWeather.module.scss'
import { IHourly } from 'types/weather.d'
import HourListItem from './HourListItem'

interface IProps {
  hourlyData: IHourly[]
}

const HourList = ({ hourlyData }: IProps) => {
  const [positionX, setPositionX] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  let minTemp = 1000
  let maxTemp = 0
  const hourData = hourlyData.map((item) => {
    minTemp = Math.min(minTemp, item.temp)
    maxTemp = Math.max(maxTemp, item.temp)
    return {
      y: item.temp,
      x: String(item.temp),
    }
  })

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
      <VictoryChart
        theme={VictoryTheme.material}
        width={58 * 18}
        height={70}
        padding={{ top: 15, left: 18, right: 18, bottom: 15 }}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        <VictoryAxis
          dependentAxis
          tickValues={[minTemp - 1, maxTemp + 1]}
          style={{
            tickLabels: { fill: 'none' },
            axis: { strokeWidth: 0 },
            ticks: { size: 0 },
            grid: { strokeWidth: 0 },
          }}
        />
        <VictoryAxis
          height={0}
          style={{
            tickLabels: { fill: 'none' },
            axis: { strokeWidth: 0 },
            ticks: { size: 0 },
            grid: { strokeWidth: 0 },
          }}
        />
        <VictoryLine
          interpolation='natural'
          style={{
            data: { stroke: 'black' },
          }}
          data={hourData}
        />
        <VictoryScatter style={{ data: { fill: 'black' } }} size={2} data={hourData} />
      </VictoryChart>
    </div>
  )
}

export default HourList
