import { Mongo } from 'meteor/mongo';

// required when setting up publications //
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

// import Simpl Schema from simpl-schema //
import SimpleSchema from 'simpl-schema';


export const ScalesCollection = new Mongo.Collection('scalesCollection');

if(Meteor.isServer) {
  Meteor.publish('scalesCollectionPublication', function() {
    return ScalesCollection.find();
  });
}

Meteor.methods({

  'scalesCollection.flushDemoContent': function(insertObject) {
    PiecesCollection.remove({ demo: true });
  } // scalesCollection.flushDemoContent end //

});
