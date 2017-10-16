import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PiecesCollection } from '../../../api/pieces';

import { Image, List } from 'semantic-ui-react';

export class PieceTitleImageAndCategories extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    if(!this.props.ready){
      return <span>Loading...</span>
    }

    return(
      <div>
        <h1>{this.props.thisPiece.title}</h1>
        {this.props.thisPiece.coverImageUrl !== '' ? <Image src={this.props.thisPiece.coverImageUrl} fluid /> : <Image src={this.props.thisPiece.coverImage} fluid />}

        <div>
          <h3>Categories:</h3>
          <List horizontal>
            {this.props.thisPiece.categoriesArray.map((category) => {
              return(
                <List.Item key={category}>
                  {category}
                </List.Item>
              );
            })}
          </List>

          {this.props.thisPiece.customLists ? <h3>Linked to the following Lists:</h3> : null}
          {this.props.thisPiece.customLists ? <List horizontal>{this.props.thisPiece.customLists.map((item) => <List.Item key={item}>{item}</List.Item>)}</List> : null}
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
  }
}, PieceTitleImageAndCategories);
