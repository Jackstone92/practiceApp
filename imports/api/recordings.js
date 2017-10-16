import { Mongo } from 'meteor/mongo';

// required when setting up publications //
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { FilesCollection } from 'meteor/ostrio:files';

// import Simpl Schema from simpl-schema //
import SimpleSchema from 'simpl-schema';


export const Recordings = new FilesCollection({
  collectionName: 'Recordings',
  allowClientCode: false, // Disallow remove files from Client //
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload recording, with size equal or less than 10MB';
    }
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.recordings.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.recordings.all', function () {
    return Images.find().cursor;
  });
}
