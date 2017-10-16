import React from 'react';

import { Segment } from 'semantic-ui-react'


export default UpcomingLessons = () => {
  return(
    <div className="upcomingLessons">
      <h2>Upcoming Lessons</h2>

      <Segment.Group>
        <Segment>d harmonic minor scale</Segment>
        <Segment>Bach cello suite</Segment>
        <Segment>Mark up part</Segment>
      </Segment.Group>
    </div>
  );
}
