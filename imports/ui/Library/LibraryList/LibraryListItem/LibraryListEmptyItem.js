import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


const LibraryListEmptyItem = (props) => {
  return(
    <p className="text-center">You have no pieces!</p>
  );
}

export default LibraryListEmptyItem;
