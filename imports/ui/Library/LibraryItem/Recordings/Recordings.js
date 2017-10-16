import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import { PiecesCollection } from '../../../../api/pieces';

import { Table } from 'semantic-ui-react';

import MediaPlayer from './MediaPlayer';


export const Recordings = (props) => {
  return(
    <div>
      <MediaPlayer />

      <br/>

      <Table stackable textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Recording Title</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Comments</Table.HeaderCell>
            <Table.HeaderCell>Share</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Sample Title</Table.Cell>
            <Table.Cell>45 minutes</Table.Cell>
            <Table.Cell selectable>Vivamus sagittis lacus vel augue laoreet ru...</Table.Cell>
            <Table.Cell selectable>Share</Table.Cell>
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
}, Recordings);
