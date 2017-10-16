import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Progress } from 'semantic-ui-react'


export class GoalDeadlines extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //document.getElementById("example1").progress('increment');
  }

  render() {
    return(
      <div className="goalDeadlines">
        <h2>Goal Deadlines</h2>

        <Progress value={40} total={100} progress='ratio' active size='large'>
          Days until <a href="#">lesson</a>
        </Progress>
      </div>
    );
  }
}

export default createContainer(() => {

  return {

  }

}, GoalDeadlines);
