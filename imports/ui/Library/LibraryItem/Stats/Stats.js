import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import { PiecesCollection } from '../../../../api/pieces';

import MinutesPracticed from './MinutesPracticed';
import ByGoal from './ByGoal';


export class Stats extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div>
        <div>
          <h3>Minutes Practiced</h3>
          <MinutesPracticed />
        </div>
        <div>
          <h3>Minutes Practiced By Goal</h3>
          <ByGoal />
        </div>
      </div>
    );
  }
}

export default createContainer((params) => {
  const selectedPieceId = Session.get('selectedPieceId');

    return {
      ready: Meteor.subscribe('piecesCollectionPublication', params.id).ready(),
      selectedPieceId,
      thisPiece: PiecesCollection.findOne(selectedPieceId),
      call: Meteor.call
  }
}, Stats);
