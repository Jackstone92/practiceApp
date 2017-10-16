import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { ScalesCollection } from '../../api/scales';
import { ArpeggiosCollection } from '../../api/arpeggios';

import PrivateHeader from '../Header/PrivateHeader';
import ScaleCategory from './Scales/ScaleCategory';
import ArpeggioCategory from './Arpeggios/ArpeggioCategory';

import { Card, Grid, Item, Segment } from 'semantic-ui-react';


export class Scales extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.scalesReady && this.props.arpeggiosReady) {
      return(
        <div>
          <PrivateHeader title="Practice Perfect" />
          <Grid padded centered columns={2}>
            <Grid.Column>
              <Segment>
                <h1 className="text-center">Scales</h1>
                {this.props.scales.map((scale) => {
                  return(
                    <ScaleCategory key={scale._id} categories={scale.categories} scales={scale.scales} types={scale.types} />
                  );
                })}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <h1 className="text-center">Arpeggios</h1>
                {this.props.arpeggios.map((arpeggio) => {
                  return(
                    <ArpeggioCategory key={arpeggio._id} categories={arpeggio.categories} arpeggios={arpeggio.arpeggios} types={arpeggio.types} />
                  );
                })}
              </Segment>
            </Grid.Column>
          </Grid>

        </div>
      );
    } else {
      return(
        <div>Loading...</div>
      );
    }
  }
}

export default createContainer((params) => {
  Meteor.subscribe('scalesCollectionPublication');
  Meteor.subscribe('arpeggiosCollectionPublication');

  return {
    scalesReady: Meteor.subscribe('scalesCollectionPublication', params.id).ready(),
    arpeggiosReady: Meteor.subscribe('arpeggiosCollectionPublication', params.id).ready(),
    scales: ScalesCollection.find({}).fetch(),
    arpeggios: ArpeggiosCollection.find({}).fetch()
  }
}, Scales);
