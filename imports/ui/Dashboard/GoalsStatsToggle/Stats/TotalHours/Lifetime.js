import React from 'react';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


const data = [
      {name: 'Jan', average: 4000, current: 2400, amt: 2400},
      {name: 'Feb', average: 3000, current: 1398, amt: 2210},
      {name: 'Mar', average: 2000, current: 9800, amt: 2290},
      {name: 'Apr', average: 2780, current: 3908, amt: 2000},
      {name: 'May', average: 1890, current: 4800, amt: 2181},
      {name: 'Jun', average: 2390, current: 3800, amt: 2500},
      {name: 'Jul', average: 3490, current: 4300, amt: 2100},
      {name: 'Aug', average: 4000, current: 2400, amt: 2400},
      {name: 'Sept', average: 3000, current: 1398, amt: 2210},
      {name: 'Oct', average: 2000, current: 9800, amt: 2290},
      {name: 'Nov', average: 2780, current: 3908, amt: 2000},
      {name: 'Dec', average: 1890, current: 4800, amt: 2181}
];

export default Lifetime = () => {

  return(
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="current" stroke="#8884d8" />
      <Line type="monotone" dataKey="average" stroke="#82ca9d" />
    </LineChart>
  );
}
