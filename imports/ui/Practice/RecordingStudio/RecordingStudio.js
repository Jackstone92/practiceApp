import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Segment } from 'semantic-ui-react';


export class RecordingStudio extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <Segment>
        <h1 className="text-center">Recording Studio</h1>
      </Segment>
    );
  }
}

export default createContainer((params) => {
  return {

  }
}, RecordingStudio);
