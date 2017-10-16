import { Mongo } from 'meteor/mongo';

// required when setting up publications //
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

// import Simpl Schema from simpl-schema //
import SimpleSchema from 'simpl-schema';


export const GoalsCollection = new Mongo.Collection('goalsCollection');

if(Meteor.isServer) {
  Meteor.publish('goalsCollectionPublication', function() {
    return GoalsCollection.find();
  });
}

Meteor.methods({

  'goalsCollection.insert': function(insertObject, insertedConnectedPiece) {
    if(!this.userId) {
      throw new Meteor.Error('Not-Authorised');
    }

    const title = insertObject.title,
          selectedCategory = insertObject.selectedCategory,
          newCategory = insertObject.newCategory,
          startDate = insertObject.startDate,
          endDate = insertObject.endDate,
          minsPerSession = parseInt(insertObject.minsPerSession),
          selectedPracticeSchedule = insertObject.selectedPracticeSchedule,
          reachTempo = parseInt(insertObject.reachTempo),
          customAchievements = insertObject.customAchievements,
          linkedLesson = insertObject.linkedLesson,
          linkedExam = insertObject.linkedExam,
          connectedPiece = insertedConnectedPiece;

    // console.log(connectedPiece);

    new SimpleSchema({
      title: {
        type: String,
        min: 1
      },
      selectedCategory: {
        type: String
      },
      newCategory: {
        type: String,
        optional: true
      },
      startDate: {
        type: Number
      },
      endDate: {
        type: Number
      },
      minsPerSession: {
        type: Number
      },
      selectedPracticeSchedule: {
        type: String
      },
      reachTempo: {
        type: Number,
        optional: true
      },
      customAchievements: {
        type: String,
        optional: true
      },
      linkedLesson: {
        type: String,
        optional: true
      },
      linkedExam: {
        type: String,
        optional: true
      },
      connectedPiece: {
        type: String
      }
    }).validate({
      title,
      selectedCategory,
      newCategory,
      startDate,
      endDate,
      minsPerSession,
      selectedPracticeSchedule,
      reachTempo,
      customAchievements,
      linkedLesson,
      linkedExam,
      connectedPiece
    });

    return GoalsCollection.insert({
      userId: this.userId,
      createdOn: moment().valueOf(),
      title,
      selectedCategory,
      newCategory,
      startDate,
      endDate,
      minsPerSession,
      selectedPracticeSchedule,
      reachTempo,
      customAchievements,
      linkedLesson,
      linkedExam,
      connectedPiece
    });
  } // goalsCollection.insert end //



});
