import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import moment from 'moment';

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

// import { PiecesCollection } from '../../../../api/pieces';

import { Card, Icon, Image, Label, Segment } from 'semantic-ui-react'


export class LibraryListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }
  }

  handleClick(event, props) {

    // TODO: handle long click //
    // console.log(e);
    //
    // if (e.type === "click" && e.button !== 0) {
    //     return;
    // }
    //
    // longpress = false;
    //
    // this.classList.add("longpress");
    //
    // presstimer = setTimeout(function() {
    //     alert("long click");
    //     longpress = true;
    // }, 1000);
    //
    // return false;



    // console.log(this.props.piece._id);
    // Navigate to LibraryItem view of the piece's _id //
    this.props.Session.set('selectedPieceId', this.props.piece._id);
    browserHistory.push({
      pathname: `/library/${this.props.piece._id}`
    });
  }

  handleDeleteButtonClick(event, props) {
    // console.log(this.props.piece._id);
    Meteor.call('piecesCollection.remove', this.props.piece._id, (err, res) => {
      if(!err) {
        // console.log('db delete complete!');
        return true;
      } else {
        this.setState({
          error: err.reason
        });
        // console.log(err);
        return false;
      }
    });
  }

  render() {
    // console.log(deleteMode);
    if(this.props.libraryDeleteMode === false) {
      // no delete button //
      return(
        <div>
          {this.state.error ? <Label color='red' pointing='below'>{this.state.error}</Label> : null}

          <Card
            className="text-center"
            raised
            onClick={this.handleClick.bind(this)}>
            {this.props.piece.coverImageUrl ? <Image fluid verticalAlign="middle" src={this.props.piece.coverImageUrl} /> : <Image fluid verticalAlign="middle" src={this.props.piece.coverImage} />}
            <Card.Content>
              <Card.Header>
                {this.props.piece.title}
              </Card.Header>
              <Card.Description>
                {this.props.piece.composer}
              </Card.Description>
              <Card.Meta>
                <span className='date'>
                  Created on {moment(this.props.piece.createdOn).format('MMMM Do YYYY')}
                </span>
              </Card.Meta>
            </Card.Content>
          </Card>
          <br/> {/* TODO: add margin bottom using scss */}
        </div>
      );
    } else if(this.props.libraryDeleteMode === true) {
      // if deleteMode //
      return(
        <div>
          {this.state.error ? <Label color='red' pointing='below'>{this.state.error}</Label> : null}
          <Card
            className="text-center"
          raised>
            {this.props.piece.coverImageUrl ? <div><Label as='a' corner='right' icon='remove' onClick={this.handleDeleteButtonClick.bind(this)} /><Image src={this.props.piece.coverImageUrl} /></div> : <Image src={this.props.piece.coverImage} />}
            <Card.Content>
              <Card.Header>
                {this.props.piece.title}
              </Card.Header>
              <Card.Description>
                {this.props.piece.composer}
              </Card.Description>
              <Card.Meta>
                <span className='date'>
                  Created on {moment(this.props.piece.createdOn).format('MMMM Do YYYY')}
                </span>
              </Card.Meta>
            </Card.Content>
          </Card>
          <br/> {/* TODO: add margin bottom using scss */}
        </div>
      );
    } // end if //
  } // end render //
} // end LibraryListItem class //

export default createContainer(() => {
  return {
    Session,
    libraryDeleteMode: Session.get('libraryDeleteMode')
  }
}, LibraryListItem);
