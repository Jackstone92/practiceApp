import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
// from meteor add react-meteor-data //
import { createContainer } from 'meteor/react-meteor-data';

import { Menu, Button } from 'semantic-ui-react'


export class PrivateHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    }
  }

  // convert path to lowercase with hyphens - for url //
  toUrlFormat(str) {
    return str.replace(/\s+/g, '-').toLowerCase();
  }


  handleItemClick(event) {
    // console.log(event.target.text);

    this.setState({
      activeItem: event.target.text
    });

    const path = this.toUrlFormat(event.target.text);

    switch (event.target.text) {
      case 'Library':
        if(window.location.href.indexOf('/library') > -1) {
          browserHistory.push('/library');
        } else {
          browserHistory.push('/library');
        }
        break;

      case this.props.title:
        browserHistory.push('/');
        break;

      default:
        browserHistory.push(path);
        break;

    }

  }

  render() {

    return (
      <Menu
        stackable={true}>

        <Menu.Item
          name="title"
          className="header__title"
          active={this.state.activeItem === this.props.title}
          onClick={this.handleItemClick.bind(this)}>
          {this.props.title}
        </Menu.Item>

        <Menu.Item
          name="library"
          className="button--link-text"
          active={this.state.activeItem === "Library"}
          onClick={this.handleItemClick.bind(this)}>
          Library
        </Menu.Item>

        <Menu.Item
          name="scales"
          className="button--link-text"
          active={this.state.activeItem === "Scales"}
          onClick={this.handleItemClick.bind(this)}>
          Scales
        </Menu.Item>

        <Menu.Item
          name="startPractice"
          className="button--link-text"
          active={this.state.activeItem  === "Start Practice"}
          onClick={this.handleItemClick.bind(this)}>
          Start Practice
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name="logout"
            className="button--link-text"
            onClick={() => this.props.handleLogout()}>
            Logout
          </Menu.Item>
        </Menu.Menu>

      </Menu>
    );
  }
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout()
  };
}, PrivateHeader);
