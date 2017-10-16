import React from 'react';

import GoalDeadlines from './GoalDeadlines';
import PracticeLists from './PracticeLists';
import UpcomingLessons from './UpcomingLessons';
import UpcomingAssignments from './UpcomingAssignments';

export default Goals = () => {
  return(
    <div>
      <GoalDeadlines />
      <br/>
      <UpcomingLessons />
      <br/>
      <UpcomingAssignments />
      <br/>
      <PracticeLists />
    </div>
  );
}
