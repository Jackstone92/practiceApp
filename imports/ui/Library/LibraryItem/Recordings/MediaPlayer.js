import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';


export class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <div>MediaPlayer</div>
    );
  }
}

export default createContainer((params) => {
  return {

  }
}, MediaPlayer);
