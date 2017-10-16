import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

// import 'semantic-ui-css/semantic.min.css';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  // console.log('currentPagePrivacy', currentPagePrivacy);
  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedPieceId = Session.get('selectedPieceId');

  if(selectedPieceId) {
    browserHistory.replace(`/library/${selectedPieceId}`);
  }
});

Tracker.autorun(() => {
  const addGoalPieceSelection = Session.get('addGoalPieceSelection');
  const addGoalFormContent = Session.get('addGoalFormContent');
  const addPieceFormContent = Session.get('addPieceFormContent');
});

Tracker.autorun(() => {
  const libraryDeleteMode = Session.get('libraryDeleteMode');
});

Meteor.startup(() => {
  Session.set('selectedPieceId', undefined);
  Session.set('addGoalPieceSelection', undefined);
  Session.set('addGoalFormContent', undefined);
  Session.set('addPieceFormContent', undefined);
  Session.set('libraryDeleteMode', false);

  ReactDOM.render(routes, document.getElementById('app'));
});
