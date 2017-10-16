import React from 'react';

import { Segment } from 'semantic-ui-react'


export default PracticeLists = () => {
  return(
    <div className="requiredPractice">
      <h2>Practice Lists</h2>

      <Segment.Group>
        <Segment>Chamber Repertoire List</Segment>
        <Segment>Solo Repertoire List</Segment>
        <Segment>Orchestral Repertoire List</Segment>
        <Segment>Scales List</Segment>
      </Segment.Group>
    </div>
  );
}
