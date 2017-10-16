import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Button, Card } from 'semantic-ui-react';


export const ScaleList = (props) => {
  if(props.active !== null) {
    return(
      <Card>
        <Card.Content textAlign="center">
          <Card.Header>
            {props.name}
          </Card.Header>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <div className='ui three buttons'>
            {props.types.map((type) => {
              let colour = '';

              switch (type) {
                case 'Major':
                  color = 'green';
                  break;

                case 'Harmonic Minor':
                  color = 'orange';
                  break;

                case 'Melodic Minor':
                  color = 'red';
                  break;
                default:
                  break;
              }

              return <Button key={type} basic color={color}>{type}</Button>
            })}
          </div>
        </Card.Content>
      </Card>
    );
  } else {
    // active is null //
    return(
      <div></div>
    );
  }
}

export default createContainer((params) => {
  return {

  }
}, ScaleList);
