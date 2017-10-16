import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import ScaleList from './ScaleList';

import { Card, Menu, Segment } from 'semantic-ui-react';


export class ScaleCategory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: null
    }
  }

  componentDidMount() {
    this.setState({
      active: 'Similar Motion'
    });
  }

  handleItemClick(event) {
    this.setState({
      active: event.target.text
    });
  }

  render() {
    return(
      <div>
        <Menu attached='top' stackable tabular>
          {this.props.categories.map((category) => {
            return(
              <Menu.Item key={category} active={this.state.active === category} name={category} onClick={this.handleItemClick.bind(this)} />
            )
          })}
        </Menu>

        <Segment attached='bottom'>
          <Card.Group stackable itemsPerRow={2}>
            {this.props.scales.map((scale) => {
              return(
                <ScaleList active={this.state.active} key={scale} name={scale} types={this.props.types} />
              );
            })}
          </Card.Group>
        </Segment>
      </div>
    );
  }
}


export default createContainer((params) => {
  return {

  }
}, ScaleCategory);
