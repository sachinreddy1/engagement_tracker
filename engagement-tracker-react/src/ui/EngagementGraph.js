import React from 'react';
import { 
  LineChart, 
  Line,
  YAxis,
  XAxis,
  ResponsiveContainer,
} from 'recharts';

const EngagementGraph = (props) => {
  return (
    <ResponsiveContainer
      width={'80%'}
      height={'75%'}
    >
    <LineChart
      data={props.data}
    >
      <Line 
        type="monotone" 
        dataKey="engagement_level" 
        stroke="#f5f5f5" 
        strokeWidth='5'
        isAnimationActive={false}
        dot={false}
      />
      <XAxis
        dataKey="time"
        allowDataOverflow={true}
        style={{
          fontSize: 'calc(10px + 1.25vmin)',
          stroke: '#5b6477',
          fill:'#676767',
          fontFamily: 'Staatliches',
        }}  
      />
      <YAxis 
        dataKey="engagement_level"
        domain={['dataMin', 'dataMax']} 
        allowDataOverflow={true} 
        style={{
          fontSize: 'calc(10px + 1.25vmin)',
          stroke: '#5b6477',
          fill:'#676767',
          fontFamily: 'Staatliches',
        }}  
      />
    </LineChart>
    </ResponsiveContainer>
  );
};

export default EngagementGraph;
