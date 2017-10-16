import React from 'react';

import {Radar, RadarChart, PolarGrid, Legend, Tooltip, PolarAngleAxis, PolarRadiusAxis} from 'recharts';


const data = [
   { subject: 'Piece 1', A: 120, B: 110, fullMark: 150 },
   { subject: 'Piece 2', A: 98, B: 130, fullMark: 150 },
   { subject: 'd melodic minor scale', A: 86, B: 130, fullMark: 150 },
   { subject: 'F# major scale', A: 99, B: 100, fullMark: 150 },
   { subject: 'c# harmonic minor scale', A: 85, B: 90, fullMark: 150 },
   { subject: 'Bb major scale', A: 65, B: 85, fullMark: 150 },
];


export default MinutesPracticed = () => {

  return(
    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
      <Radar name="Goal 1 - Upcoming Lesson" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Tooltip />
      <PolarRadiusAxis/>
    </RadarChart>
  );
}
