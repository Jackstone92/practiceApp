import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import { PiecesCollection } from '../../../../api/pieces';


export class Details extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h3>Description</h3>
        <p>{this.props.thisPiece.description}</p>

        <div>
          <h3>Upcoming Lesson Goals</h3>

        </div>

        <div>
          <h3>Upcoming Exam Goals</h3>

        </div>

        <div>
          <h3>Notes</h3>
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
}, Details);
