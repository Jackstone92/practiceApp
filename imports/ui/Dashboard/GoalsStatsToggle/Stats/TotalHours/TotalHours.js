import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Menu } from 'semantic-ui-react';

import WeekView from './WeekView';
import MonthView from './MonthView';
import Lifetime from './Lifetime';


export class TotalHours extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    }
  }

  handleItemClick(event) {
    this.setState({
      activeItem: event.target.text
    })
  }

  componentDidMount() {
    this.setState({
      activeItem: "Week View"
    })
  }

  render() {

    return(
      <div className="totalHours">
        <h2>Total number of True Practice hours</h2>

        <Menu compact>
          <Menu.Item
            active={ this.state.activeItem === "Week View" }
            onClick={ this.handleItemClick.bind(this) }>
            Week View
          </Menu.Item>
          <Menu.Item
            active={ this.state.activeItem === "Month View" }
            onClick={ this.handleItemClick.bind(this) }>
            Month View
          </Menu.Item>
          <Menu.Item
            active={ this.state.activeItem === "Lifetime" }
            onClick={ this.handleItemClick.bind(this) }>
            Lifetime
          </Menu.Item>
        </Menu>

        <br/>

        <div>
          { this.state.activeItem === "Week View" ? <WeekView /> : null }
          { this.state.activeItem === "Month View" ? <MonthView /> : null }
          { this.state.activeItem === "Lifetime" ? <Lifetime /> : null }
        </div>
      </div>
    );
  }
}


export default createContainer(() => {

  return {

  }
}, TotalHours);
