import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import { PiecesCollection } from '../../../../api/pieces';

import { Table } from 'semantic-ui-react';


export const PracticeHistory = (props) => {
  return(
    <div>
      <Table stackable textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Practice Ranking</Table.HeaderCell>
            <Table.HeaderCell>Comments</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>3rd October 2017</Table.Cell>
            <Table.Cell>60 minutes</Table.Cell>
            <Table.Cell selectable positive>Good</Table.Cell>
            <Table.Cell selectable>Vivamus sagittis lacus vel augue laoreet ru...</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default createContainer((params) => {
  const selectedPieceId = Session.get('selectedPieceId');

    return {
      ready: Meteor.subscribe('piecesCollectionPublication', params.id).ready(),
      selectedPieceId,
      thisPiece: PiecesCollection.findOne(selectedPieceId),
      call: Meteor.call
  }
}, PracticeHistory);
