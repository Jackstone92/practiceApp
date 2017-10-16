import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {AudioContext} from './assets/monkeypatch';
import './assets/worker';

import { Button, Grid, Header, Segment } from 'semantic-ui-react';
// import click1 from './assets/click1.wav';
// import click2 from './assets/click2.wav';


export class Metronome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bpm: 120,
      count: 0,
      playing: false,
      beatsPerMeasure: 4
    }

    this.click1 = new Audio('click1.wav');
    this.click2 = new Audio('click2.wav');
  }

  handleBpmChange(event) {
    // console.log(event.target.value);
    const bpm = event.target.value;

    if(this.state.playing) {
      // Stop the old timer and start a new one //
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick.bind(this), (60 / this.state.bpm) * 1000);

      // Set the new bpm and reset the beat counter //
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // Otherwise, just update the bpm //
      this.setState({
        bpm
      });
    }
  }

  startStop() {
    if(this.state.playing) {
      // Stop the timer //
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current bpm //
      this.timer = setInterval(this.playClick.bind(this), (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
        // Play a click immediately after setState finishes //
      }, this.playClick);
    }
  }

  playClick() {
    // The first beat will have a different sound than the others //
    if(this.state.count % this.state.beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on //
    this.setState({
      count: (this.state.count + 1) % this.state.beatsPerMeasure
    })
  }


  render() {
    return(
      <Segment className="metronome">
        <Header textAlign="center">
          <Header.Content>
            <h1>Metronome</h1>
            <Button id="play-icon" size="huge" circular icon={this.state.playing ? 'pause' : 'play'} onClick={this.startStop.bind(this)} />
          </Header.Content>
        </Header>

        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h3>Tempo</h3>
              <h2 id="bpm">
                <output name="bpm" id="bpmOutput">{this.state.bpm}</output>
                <span> bpm</span>
              </h2>
              <input
                id="bpmInput"
                name="bpm"
                type="range"
                value={this.state.bpm}
                min="20"
                max="250"
                onChange={this.handleBpmChange.bind(this)}
                // oninput="tempo = event.target.value; bpmOutput.value = bpmInput.value;"
              />

              <br/>

              <h3>Meter</h3>
              <h2 id="bpm">
                <output name="count" id="countOutput">4</output>
                <span> counts</span>
              </h2>
              <input
                id="countInput"
                type="range"
                value="4"
                min="1"
                max="12"
                // oninput="meter = event.target.value; countOutput.value = countInput.value;"
              />

            </Grid.Column>

            <Grid.Column>
              <h3>Volumes</h3>
              <p>Master</p>
              <input
                id="masterVolume"
                type="range"
                value="50"
                min="0"
                max="100"
                tabIndex="0"
                // oninput="masterVolume = event.target.value / 100;"
              />

              <p>Accent</p>
              <input
                id="accentVolume"
                type="range"
                value="100"
                min="0"
                max="100"
                tabIndex="0"
                // oninput="accentVolume = event.target.value / 100;"
              />

              <p>Quarter Note</p>
              <input
                id="quarterNoteVolume"
                type="range"
                value="75"
                min="0"
                max="100"
                tabIndex="0"
                // oninput="quarterVolume = event.target.value / 100;"
              />

              <p>Eighth Note</p>
              <input
                id="eighthNoteVolume"
                type="range"
                value="0"
                min="0"
                max="100"
                tabIndex="0"
                // oninput="eighthVolume = event.target.value / 100;"
              />

              <p>Sixteenth Note</p>
              <input
                id="sixteenthNoteVolume"
                type="range"
                value="0"
                min="0"
                max="100"
                tabIndex="0"
                // oninput="sixteenthVolume = event.target.value / 100;"
              />

              <p>Triplet</p>
              <input
                id="tripletVolume"
                type="range"
                value="0"
                min="0"
                max="100"
                tabIndex="0"
                // oninput="tripletVolume = event.target.value / 100;"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default createContainer((params) => {
  return {

  }
}, Metronome);
