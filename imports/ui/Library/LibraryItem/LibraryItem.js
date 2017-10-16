import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { PiecesCollection } from '../../../api/pieces';

import PrivateHeader from '../../Header/PrivateHeader';
import PieceTitleImageAndCategories from './PieceTitleImageAndCategories';
import Details from './Details/Details';
import Stats from './Stats/Stats';
import PracticeHistory from './PracticeHistory/PracticeHistory';
import Recordings from './Recordings/Recordings';


import { Grid, Menu, Image, List } from 'semantic-ui-react';


export class LibraryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    }
  }

  componentDidMount() {
    this.setState({
      activeItem: "Details"
    });
  }

  handleItemClick(event) {
    this.setState({
      activeItem: event.target.text
    });
  }

  render() {
    if(!this.props.ready){
      return <span>Loading...</span>
    }

    return(
      <div>
        <PrivateHeader title="Practice Perfect" />
        <Grid stackable padded>
          <Grid.Row columns={2} centered>

            <Grid.Column width={6}>
              <PieceTitleImageAndCategories />
            </Grid.Column>

            <Grid.Column width={10}>
              <Menu compact>
                <Menu.Item
                  active={ this.state.activeItem === "Details" }
                  onClick={ this.handleItemClick.bind(this) }>
                  Details
                </Menu.Item>
                <Menu.Item
                  active={ this.state.activeItem === "Stats" }
                  onClick={ this.handleItemClick.bind(this) }>
                  Stats
                </Menu.Item>
                <Menu.Item
                  active={ this.state.activeItem === "Practice History" }
                  onClick={ this.handleItemClick.bind(this) }>
                  Practice History
                </Menu.Item>
                <Menu.Item
                  active={ this.state.activeItem === "Recordings" }
                  onClick={ this.handleItemClick.bind(this) }>
                  Recordings
                </Menu.Item>
              </Menu>

              <Grid.Row centered>
                <br/>
                {this.state.activeItem === "Details"? <Details /> : null}
                {this.state.activeItem === "Stats" ? <Stats /> : null}
                {this.state.activeItem === "Practice History" ? <PracticeHistory /> : null}
                {this.state.activeItem === "Recordings" ? <Recordings /> : null}
              </Grid.Row>
            </Grid.Column>

          </Grid.Row>



        </Grid>
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
    call: Meteor.call,
    browserHistory
  }
}, LibraryItem);
