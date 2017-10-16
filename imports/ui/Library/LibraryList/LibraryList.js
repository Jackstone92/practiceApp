import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { PiecesCollection } from '../../../api/pieces';
import { GoalsCollection } from '../../../api/goals';

import LibraryListEmptyItem from './LibraryListItem/LibraryListEmptyItem';
import LibraryListItem from './LibraryListItem/LibraryListItem';
import LibraryListGoalEmptyItem from './LibraryListGoalItem/LibraryListGoalEmptyItem';
import LibraryListGoalItem from './LibraryListGoalItem/LibraryListGoalItem';

import { Card, Grid, Image, Menu, Transition } from 'semantic-ui-react';


export class LibraryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null,
      visible: true
    }
  }

  librarySortBy(event) {
    // sort library depending on active state //
    this.setState({
      activeItem: event.target.text
    })
  }

  componentDidMount() {
    // display composer sorting as default //
    this.setState({
      activeItem: "Composer"
    });
  }

  render() {
    if(!this.props.piecesReady && !this.props.goalsReady) {
      return <span>Loading...</span>
    }

    return(
      <Grid stackable padded>
        <Grid.Row centered>
          <Menu compact>
            <Menu.Item
              active={ this.state.activeItem === "Title" }
              onClick={ this.librarySortBy.bind(this) }>
              Title
            </Menu.Item>
            <Menu.Item
              active={ this.state.activeItem === "Composer" }
              onClick={ this.librarySortBy.bind(this) }>
              Composer
            </Menu.Item>
            <Menu.Item
              active={ this.state.activeItem === "Goals" }
              onClick={ this.librarySortBy.bind(this) }>
              Goals
            </Menu.Item>
          </Menu>
        </Grid.Row>

        <br/>

        <Grid.Row
          columns={6}>

          {this.props.pieces.length === 0 ? <LibraryListEmptyItem /> : undefined}
          {this.props.goals.length === 0 ? <LibraryListGoalEmptyItem /> : undefined}

          {this.state.activeItem === "Composer" ? this.props.piecesComposer.map((piece) => {
            return(
              <Grid.Column key={piece._id}>
                <LibraryListItem key={piece._id} piece={piece} />
              </Grid.Column>
            );
          }) : undefined}

          {this.state.activeItem === "Title" ? this.props.piecesTitle.map((piece) => {
            return(
              <Grid.Column key={piece._id}>
                <LibraryListItem key={piece._id} piece={piece} />
              </Grid.Column>
            );
          }) : undefined}

          {this.state.activeItem === "Goals" ? this.props.goals.map((goal) => {
            return(
              <Grid.Column key={goal._id}>
                <LibraryListGoalItem key={goal._id} goal={goal} />
              </Grid.Column>
            );
          }) : undefined}
        </Grid.Row>
      </Grid>
    );
  }
}

export default createContainer((params) => {
  const selectedPieceId = Session.get('selectedPieceId');
  Meteor.subscribe('piecesCollectionPublication');
  Meteor.subscribe('goalsCollectionPublication');

  return {
    piecesReady: Meteor.subscribe('piecesCollectionPublication', params.id).ready(),
    goalsReady: Meteor.subscribe('goalsCollectionPublication', params.id).ready(),
    pieces: PiecesCollection.find({}).fetch(),
    piecesTitle: PiecesCollection.find({}, {
      sort: { name: 1}
    }).fetch(),
    piecesComposer: PiecesCollection.find({}, {
      sort: { composer: 1}
    }).fetch(),
    goals: GoalsCollection.find({}, {
      sort: { endDate: 1}
    }).fetch()
  }
}, LibraryList);
