import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Button } from 'semantic-ui-react'


export class ToggleDeleteButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentDeleteMode: true
    }
  }

  handleClick(event, props) {
    this.setState({
      currentDeleteMode: !this.state.currentDeleteMode
    })
    this.props.Session.set('libraryDeleteMode', this.state.currentDeleteMode);
    // console.log(this.props.Session.get('libraryDeleteMode'));
  }

  render() {
    return(
      <Button
        floated="right"
        color={this.props.Session.get('libraryDeleteMode') ? 'green' : 'orange'}
        content={this.props.Session.get('libraryDeleteMode') ? 'Done' : 'Edit'}
        icon={this.props.Session.get('libraryDeleteMode') ? 'check' : 'edit'}
        labelPosition='right' onClick={this.handleClick.bind(this)}
      />
    );
  }
}

export default createContainer((params) => {
  return {
    Session
  }
}, ToggleDeleteButton);
