import React from 'react';

import _ from 'lodash';

import { Button, Checkbox, Form, Grid, Header, Icon, Image, Label, List, Menu, Modal, Radio, Search, Segment, Table } from 'semantic-ui-react';


export class LibrarySelectSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent() {
    this.setState({
      isLoading: false,
      results: [],
      value: ''
    });
  }

  handleResultSelect(event) {
    this.setState({
      // value: result.title
      result: event.target.value
    });
  }

  handleSearchChange(event) {
    this.setState({
      // isLoading: true, value
      isLoading: true,
      value: event.target.value
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      // TODO: fix search //
      const isMatch = re.test(this.state.result)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.piecesSearchItems, isMatch),
      });
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state;

    return(
      <div>
        <Search
          loading={this.state.isLoading}
          onResultSelect={this.handleResultSelect.bind(this)}
          onSearchChange={this.handleSearchChange.bind(this)}
          results={this.state.results}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default LibrarySelectSearch;
