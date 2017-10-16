import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import PrivateHeader from '../Header/PrivateHeader';
import Timer from './Timer/Timer';
import Tuner from './Tuner/Tuner';
import Metronome from './Metronome/Metronome';
import RecordingStudio from './RecordingStudio/RecordingStudio';

import { Grid } from 'semantic-ui-react';


export class Practice extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <PrivateHeader title="Practice Perfect" />
        <Grid stackable padded>
          <Grid.Row centered columns={3}>
            <Grid.Column stretched>
              <Timer />
            </Grid.Column>
          </Grid.Row>

          <br/><br/>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Tuner />
            </Grid.Column>
            <Grid.Column>
              <Metronome />
            </Grid.Column>
          </Grid.Row>
          
          <br/>

          <Grid.Row centered>
            <Grid.Column stretched>
              <RecordingStudio />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default createContainer((params) => {
  return {

  }
}, Practice);
