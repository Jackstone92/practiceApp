import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Menu } from 'semantic-ui-react';

import GoalView from './GoalView';


export class PracticeAllocation extends React.Component {
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
      activeItem: "Goal 1 - Upcoming Lesson"
    })
  }

  render() {
    return(
      <div className="practiceAllocation">
        <h2>Practice Allocation</h2>
        <p>Ability to view number of hours spent practicing toward each goal</p>

        <Menu compact>
          <Menu.Item
            active={ this.state.activeItem === "Goal 1 - Upcoming Lesson" }
            onClick={ this.handleItemClick.bind(this) }>
            Goal 1 - Upcoming Lesson
          </Menu.Item>
          <Menu.Item
            active={ this.state.activeItem === "Goal 2 - Upcoming Exam" }
            onClick={ this.handleItemClick.bind(this) }>
            Goal 2 - Upcoming Exam
          </Menu.Item>
          <Menu.Item
            active={ this.state.activeItem === "Goal 3" }
            onClick={ this.handleItemClick.bind(this) }>
            Goal 3
          </Menu.Item>
        </Menu>

        <br/>
        
        <div>
          { this.state.activeItem === "Goal 1 - Upcoming Lesson" ? <GoalView /> : null }
        </div>
      </div>
    );
  }
}

export default createContainer(() => {

  return {

  }
}, PracticeAllocation);
