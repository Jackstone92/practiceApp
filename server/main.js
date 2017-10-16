import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import '../imports/api/pieces';
import '../imports/api/scales';
import '../imports/api/arpeggios';
import '../imports/api/goals';
import '../imports/startup/simple-schema-configuration.js';

// fixtures //
import '../imports/fixtures/fixtures';

Meteor.startup(() => {

});
