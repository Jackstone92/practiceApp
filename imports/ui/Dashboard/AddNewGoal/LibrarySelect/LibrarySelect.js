import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import LibrarySelectSearch from './LibrarySelectSearch';

import { Button, Checkbox, Form, Grid, Header, Icon, Image, Label, List, Menu, Modal, Radio, Search, Segment, Table } from 'semantic-ui-react';


export class LibrarySelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeItem: null,
      sortRenderValue: null
    }
  }

  componentDidMount() {
    this.setState({
      activeItem: 'Title'
    });
  }

  handleItemClick(event) {
    this.setState({
      activeItem: event.target.text
    });
  }

  handlePieceSelection(pieceId) {
    // TODO: insert into practice database //
    // console.log("Inserting ", pieceId);
    this.props.Session.set('addGoalPieceSelection', pieceId);
    console.log('addGoalPiecesSelection session set');
    // console.log(this.props.Session.get('addGoalPieceSelection'));
  }

  render() {
    // select which props to use - sorting //
    let sortRenderValue;
    switch (this.state.activeItem) {
      case 'Title':
        sortRenderValue = this.props.piecesTitle;
        break;

      case 'Composer':
        sortRenderValue = this.props.piecesComposer;
        break;

      default:
        sortRenderValue = this.props.pieces;
        break;
    }

    return(
      <Segment>
        <Modal.Description>
          <Header className="text-center">Select a piece from your library to connect goal</Header>
        </Modal.Description>

        <br/>

        <Grid stackable stretched>
          <Grid.Row centered>
            <LibrarySelectSearch piecesSearchItems={this.props.pieces} />
          </Grid.Row>
          <Grid.Column width={3}>
            <Menu fluid pointing vertical>
              <Menu.Item name='Title' active={this.state.activeItem === 'Title'} onClick={this.handleItemClick.bind(this)} />
              <Menu.Item name='Composer' active={this.state.activeItem === 'Composer'} onClick={this.handleItemClick.bind(this)} />
              <Menu.Item name='Instrument' active={this.state.activeItem === 'Instrument'} onClick={this.handleItemClick.bind(this)} />
              <Menu.Item name='Scales' active={this.state.activeItem === 'Scales'} onClick={this.handleItemClick.bind(this)} />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={13}>
            <Table stackable selectable textAlign="left">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Composer</Table.HeaderCell>
                  <Table.HeaderCell>Instrument</Table.HeaderCell>
                  <Table.HeaderCell>Genre</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {sortRenderValue.map((piece) => {
                  return(
                    <Table.Row key={piece._id} onClick={this.handlePieceSelection.bind(this, piece._id)}>
                      <Table.Cell>{piece.title}</Table.Cell>
                      <Table.Cell>{piece.composer}</Table.Cell>
                      {piece.categoriesArray.map((category) => <Table.Cell key={category}>{category}</Table.Cell>)}
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default createContainer(() => {
  return {
    Session
  }
}, LibrarySelect);
