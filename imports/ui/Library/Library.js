import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { PiecesCollection } from '../../api/pieces';

import PrivateHeader from '../Header/PrivateHeader';
import LibraryList from './LibraryList/LibraryList';
import AddNewPiece from './AddNewPiece/AddNewPiece';
import ToggleDeleteButton from './ToggleDeleteButton/ToggleDeleteButton';

import { Grid } from 'semantic-ui-react';

export class Library extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div>
        <PrivateHeader title="Practice Perfect" />
        <Grid padded>
          <Grid.Row>
            <Grid.Column floated="right">
              <ToggleDeleteButton />
              <AddNewPiece />
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row> */}
          <LibraryList />
          {/* </Grid.Row> */}
        </Grid>
      </div>
    );
  }
}

export default createContainer((params) => {

  return {

  }
}, Library);
