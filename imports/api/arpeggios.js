import { Mongo } from 'meteor/mongo';

// required when setting up publications //
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

// import Simpl Schema from simpl-schema //
import SimpleSchema from 'simpl-schema';


export const ArpeggiosCollection = new Mongo.Collection('arpeggiosCollection');

if(Meteor.isServer) {
  Meteor.publish('arpeggiosCollectionPublication', function() {
    return ArpeggiosCollection.find();
  });
}

Meteor.methods({

  'arpeggiosCollection.flushDemoContent': function(insertObject) {
    ArpeggiosCollection.remove({ demo: true });
  } // scalesCollection.flushDemoContent end //

});
