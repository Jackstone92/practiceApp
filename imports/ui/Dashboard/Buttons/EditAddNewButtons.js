import React from 'react';

import { Button, Header, Image, Modal } from 'semantic-ui-react';


export default EditAddNewButtons = (props) => {
  return(

    <Button.Group
      floated="right"
    className="editAddNewButtons">
      <Button
        onClick={() => alert("Edit goals")}>Edit</Button>
      <Button.Or />
      <Button
        positive
        onClick={() => alert("Add new goal")}>
        Add New
      </Button>
    </Button.Group>
  );
}
