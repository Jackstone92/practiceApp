import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import PrivateHeader from '../Header/PrivateHeader';
import AddNewGoal from './AddNewGoal/AddNewGoal';
import Calendar from './Calendar/Calendar';
import CalendarItemsDisplay from './CalendarItemsDisplay/CalendarItemsDisplay';
import GoalsStatsToggle from './GoalsStatsToggle/GoalsStatsToggle';


export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Practice Perfect"/>

        <div className="ui stackable grid dashboard">
          <div className="sixteen wide column dashboard__header">
            {/* <h1 className="dashboard__title">Your practice schedule at a glance...</h1> */}
            <AddNewGoal />
          </div>

          <div className="eight wide column dashboard__left">
            <Calendar />
            <CalendarItemsDisplay />
          </div>

          <div className="eight wide column dashboard__right">
            <GoalsStatsToggle />
          </div>
        </div>
      </div>
    );
  }
};


export default createContainer(() => {
  return {

  }
}, Dashboard);
