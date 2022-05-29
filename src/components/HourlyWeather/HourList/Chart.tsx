import { IHourly } from 'types/weather'
import { VictoryAxis, VictoryChart, VictoryContainer, VictoryLine, VictoryScatter, VictoryTheme } from 'victory'

interface IProps {
  hourlyData: IHourly[]
}

const Chart = ({ hourlyData }: IProps) => {
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
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={62.3 * 18}
      height={50}
      padding={{ top: 15, left: 20, right: 20, bottom: 15 }}
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
  )
}

export default Chart
