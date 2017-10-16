import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import moment from 'moment';

import { PiecesCollection } from '../../../../api/pieces';

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { Card, Icon, Image, Label, Segment } from 'semantic-ui-react';


export class LibraryListGoalItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }
  }

  handleClick(event, props) {
    // this.props.Session.set('selectedPieceId', this.props.piece._id);
    // browserHistory.push({
    //   pathname: `/library/${this.props.piece._id}`
    // });
  }

  render() {
    if(!this.props.piecesReady) {
      return <span>Loading...</span>
    }

    return(
      <div>
        {this.state.error ? <Label color='red' pointing='below'>{this.state.error}</Label> : null}

        <Card
          className="text-center"
          raised
          onClick={this.handleClick.bind(this)}>
          <Card.Content textAlign="left">
            {this.props.connectedPiece[0].coverImageUrl ? <Image floated='right' size='mini' src={this.props.connectedPiece[0].coverImageUrl} /> : <Image floated='right' size='mini' src={this.props.connectedPiece[0].coverImage} />}
            {this.props.connectedPiece[0].coverImageUrl ? <Image floated='right' size='mini' src={this.props.connectedPiece[0].coverImageUrl} /> : <Image floated='right' size='mini' src={this.props.connectedPiece[0].coverImage} />}
            <Card.Header>
              {this.props.goal.title}
            </Card.Header>
            <Card.Description>
              {this.props.connectedPiece[0].name}
            </Card.Description>
            <Card.Meta>
              <span className='date'>
                Start Date: {moment(this.props.goal.startDate).format('MMMM Do YYYY')}
              </span>
              <br/>
              <span className='date'>
                End Date: {moment(this.props.goal.endDate).format('MMMM Do YYYY')}
              </span>
            </Card.Meta>
          </Card.Content>
        </Card>
        <br/> {/* TODO: add margin bottom using scss */}
      </div>
    );
  }
}

export default createContainer((params) => {
  Meteor.subscribe('piecesCollectionPublication');
  return {
    Session,
    piecesReady: Meteor.subscribe('piecesCollectionPublication', params.id).ready(),
    connectedPiece: PiecesCollection.find({ _id: params.goal.connectedPiece }).fetch()
  }
}, LibraryListGoalItem);
