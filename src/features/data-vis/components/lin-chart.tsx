// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Line } from '@ant-design/plots';
import { useMemo } from 'react';

const mergeByTimestamp = (data) => {
  const merged = {};

  data.forEach(item => {
      if (!merged[item.timestamp]) {
          merged[item.timestamp] = { 
              timestamp: item.timestamp, 
              [item.id]: item.value
          };
      }
      merged[item.timestamp][item.id]= item.value;
  });

  return Object.values(merged);
}


interface LineChartProps {
  data: Array<{
    list: Array<{
      timestamp: string,
      value: number
    }>,
    provider: string,
    id: string,
    name: string
  }>
}

export const LineChart = ({
  data
}:LineChartProps) => {
  const list = useMemo(()=>{
    const allData = data.map(item=>item.list.map(ele=>({...ele,provider:item.provider,id:item.id,name:item.name}))).flat()
    return mergeByTimestamp(allData)
  },[data])
  console.log(list)
  const config = {
    data,
    xField: 'timestamp',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

