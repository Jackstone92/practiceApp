import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Button, Header, List, Segment } from 'semantic-ui-react';


export class Timer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      secondsElapsed: 0,
      laps: []
    }
  }

  formatSeconds(secondsElapsed) {
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = ('0' + secondsElapsed % 60).slice(-2);
    return minutes + ':' + seconds;
  }

  handleStartClick() {
    this.incrementer = setInterval(() => {
      this.setState({
        secondsElapsed: (this.state.secondsElapsed + 1)
      });
    }, 1000);
    this.setState({
      incrementer: this.incrementer
    });
  }

  handleStopClick() {
    clearInterval(this.state.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }

  handleResetClick() {
    this.setState({
      secondsElapsed: 0,
      laps: []
    });
    clearInterval(this.state.incrementer);
  }

   handleLapClick() {
    this.setState({
      laps: this.state.laps.concat([this.state.secondsElapsed])
    })
  }


  render() {
    return(
      <Segment basic>
        <Header size='huge' textAlign="center" className="timerOutput">{this.formatSeconds(this.state.secondsElapsed)}</Header>

        <Button.Group fluid size="massive">
          {this.state.secondsElapsed === 0 || this.state.incrementer === this.state.lastClearedIncrementer
            ? <Button positive onClick={this.handleStartClick.bind(this)}>start</Button>
            : <Button color="orange" onClick={this.handleStopClick.bind(this)}>pause</Button>
          }

          {this.state.secondsElapsed !== 0 && this.state.incrementer !== this.state.lastClearedIncrementer
            ? <Button color="yellow" onClick={this.handleLapClick.bind(this)}>lap</Button>
            : null
          }

          {this.state.secondsElapsed !== 0 && this.state.incrementer === this.state.lastClearedIncrementer
            ? <Button negative onClick={this.handleResetClick.bind(this)}>reset</Button>
            : null
          }
        </Button.Group>
        <List divided relaxed>{this.state.laps.map((lap, i) =>{
          return(
            <List.Item key={i}>
              <List.Content floated='right'>
                <List.Description>successfully added to practice diary</List.Description>
              </List.Content>
              <List.Icon name='list' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>Segment {i+1} covering PIECENAME</List.Header>
                <List.Description>Duration - {this.formatSeconds(lap)}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}</List>
      </Segment>
    );
  }
}

export default createContainer((params) => {
  return {

  }
}, Timer);
