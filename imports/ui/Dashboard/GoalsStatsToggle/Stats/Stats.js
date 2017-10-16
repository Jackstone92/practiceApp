import React from 'react';

import TotalHours from './TotalHours/TotalHours';
import PracticeAllocation from './PracticeAllocation/PracticeAllocation';

export default Stats = () => {
  return(
    <div>
      <TotalHours />
      <br/>
      <PracticeAllocation />
    </div>
  );
}
