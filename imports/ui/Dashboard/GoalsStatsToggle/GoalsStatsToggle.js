import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Grid, Menu } from 'semantic-ui-react';

import Goals from './Goals/Goals';
import Stats from './Stats/Stats';


export class GoalsStatsToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    }
  }

  handleItemClick(event) {
    // display active depending on active state //
    this.setState({
      activeItem: event.target.text
    })
  }

  componentDidMount() {
    // display goals content as default //
    this.setState({
      activeItem: "Goals"
    });
  }

  render() {

    return(
      <div className="goalsStatsToggle">

        <Grid>
          <Grid.Row centered columns={3}>
            <Grid.Column width={6}></Grid.Column>

            <Grid.Column width={4}>
              <Menu compact>
                <Menu.Item
                  active={ this.state.activeItem === "Goals" }
                  onClick={ this.handleItemClick.bind(this) }>
                  Goals
                </Menu.Item>
                <Menu.Item
                  active={ this.state.activeItem === "Stats" }
                  onClick={ this.handleItemClick.bind(this) }>
                  Stats
                </Menu.Item>
              </Menu>
            </Grid.Column>

            <Grid.Column width={6}></Grid.Column>
          </Grid.Row>

          <br/>

          <Grid.Row>
            <Grid.Column width={15}
            className="goalsStatsContent">
              { this.state.activeItem === "Goals" ? <Goals /> : null }
              { this.state.activeItem === "Stats" ? <Stats /> : null }
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    );
  }
}

export default createContainer(() => {

  return {

  }
}, GoalsStatsToggle);
