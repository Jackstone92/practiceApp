import React from 'react';

import { Segment } from 'semantic-ui-react'


export default UpcomingAssignments = () => {
  return(
    <div className="upcomingAssignments">
      <h2>Upcoming Assignments</h2>

      <Segment.Group>
        <Segment>Assignment 1</Segment>
        <Segment>Assignment 2</Segment>
        <Segment>Assignment 3</Segment>
        <Segment>Assignment 4</Segment>
      </Segment.Group>
    </div>
  );
}
