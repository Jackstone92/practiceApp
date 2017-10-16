import { Mongo } from 'meteor/mongo';

// required when setting up publications //
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

// import Simpl Schema from simpl-schema //
import SimpleSchema from 'simpl-schema';


export const PiecesCollection = new Mongo.Collection('piecesCollection');

if(Meteor.isServer) {
  Meteor.publish('piecesCollectionPublication', function() {
    return PiecesCollection.find();
  });

}

Meteor.methods({

  'piecesCollection.flushDemoContent': function(insertObject) {
    PiecesCollection.remove({ demo: true });
  }, // piecesCollection.flushDemoContent end //

  'piecesCollection.scrape': function(url) {

    new SimpleSchema({
      url: {
        optional: true,
        type: String,
        regEx: SimpleSchema.RegEx.Url
      },
    }).validate({
      url
    });

    const raw_data = Scrape.url(url);

    const websiteData = Scrape.website(url);

    return websiteData;
  },

  'piecesCollection.insert': function(insertObject) {
    if(!this.userId) {
      throw new Meteor.Error('Not-Authorised');
    }

    const title = insertObject.title,
          composer = insertObject.composer,
          description = insertObject.description,
          genre = insertObject.genre,
          instrument = insertObject.instrument,
          coverImageUrl = insertObject.coverImageUrl,
          coverImage = insertObject.coverImage,
          categories = insertObject.categories,
          categoriesArray = insertObject.categoriesArray,
          youtubeLink = insertObject.youtubeLink,
          customLists = insertObject.customLists,
          linkedLessonGoals = insertObject.linkedLessonGoals,
          newLessonGoal = insertObject.newLessonGoal,
          linkedExamGoals = insertObject.linkedExamGoals,
          newExamGoal = insertObject.newExamGoal,
          notes = insertObject.notes;

    // SimpleSchema //
    new SimpleSchema({
      title: {
        type: String,
        min: 1
      },
      composer: {
        type: String,
        min: 1
      },
      description: {
        type: String,
        min: 1
      },
      genre: {
        type: String,
        min: 1
      },
      instrument: {
        type: String,
        min: 1
      },
      coverImageUrl: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
      },
      // coverImage: {
      //   optional: true
      // },
      // categories: {
      //   optional: true
      // },
      // categoriesArray: {
      //   optional: true
      // },
      youtubeLink: {
        optional: true,
        type: String,
        regEx: SimpleSchema.RegEx.Url
      },
      // customLists: {
      //   optional: true
      // },
      // linkedLessonGoals: {
      //   optional: true
      // },
      // newLessonGoal: {
      //   optional: true
      // },
      // linkedExamGoals: {
      //   optional: true
      // },
      // newExamGoal: {
      //   optional: true
      // },
      // notes: {
      //   type: String,
      //   min: 1,
      //   optional: true
      // }
    }).validate({
      title,
      composer,
      description,
      genre,
      instrument,
      coverImageUrl,
      // coverImage,
      // categories,
      // categoriesArray,
      youtubeLink,
      // customLists,
      // linkedLessonGoals,
      // newLessonGoal,
      // linkedExamGoals,
      // newExamGoal,
      // notes
    });

    return PiecesCollection.insert({
      userId: this.userId,
      title: title,
      composer: composer,
      description: description,
      genre: genre,
      instrument: instrument,
      coverImageUrl: coverImageUrl,
      coverImage: coverImage,
      categories: categories,
      categoriesArray: categoriesArray,
      youtubeLink: youtubeLink,
      customLists: customLists,
      linkedLessonGoals: linkedLessonGoals,
      newLessonGoal: newLessonGoal,
      linkedExamGoals: linkedExamGoals,
      newExamGoal: newExamGoal,
      notes: notes,
      createdOn: moment().valueOf()
    });
  }, // piecesCollection.insert end //

  'piecesCollection.remove': function(_id) {
    if(!this.userId) {
      throw new Meteor.Error('Not-Authorised');
    }

    // validate _id //
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({
      _id: _id
    });

    PiecesCollection.remove({ _id: _id, userId: this.userId });
  }, // library.remove end //

  'piecesCollection.update': function(_id, updates) {
    if(!this.userId) {
      throw new Meteor.Error('Not-Authorised');
    }

    new SimpleSchema({
      id: {
        type: String,
        min: 1
      },
      name: {
        type: String
      }
      // TODO: add further validation //
    }).validate({
      id: _id,
      ...updates
    });

    PiecesCollection.update({
      _id: _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  } // library.update end //
});
