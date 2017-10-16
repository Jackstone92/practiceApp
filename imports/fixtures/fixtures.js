import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { PiecesCollection } from '../api/pieces';
import { ScalesCollection } from '../api/scales';
import { ArpeggiosCollection } from '../api/arpeggios';
import { GoalsCollection } from '../api/goals';

// import faker from 'faker';
// import _ from 'lodash';
import moment from 'moment';

import { piecesSeed } from './pieces/pieces';
import { scalesSeed } from './scalesAndArpeggios/scalesAndArpeggios';
import { arpeggiosSeed } from './scalesAndArpeggios/scalesAndArpeggios';
import { goalsSeed } from './goals/goals';
import { practicesSeed } from './practices/practices';
import { listsSeed } from './lists/lists';


if(PiecesCollection.find().count() === 0) {
  console.log("Pieces seed data added!");

  // add to MongoDB Database //
  piecesSeed.forEach((piece) => {
    PiecesCollection.insert(piece);
  });
} // if end //

if(ScalesCollection.find().count() === 0) {
  console.log("Scales seed data added!");

  // add to MongoDB Database //
  scalesSeed.forEach((scale) => {
    ScalesCollection.insert(scale);
  });
}

if(ArpeggiosCollection.find().count() === 0) {
  console.log("Arpeggios seed data added!");

  // add to MongoDB Database //
  arpeggiosSeed.forEach((arpeggio) => {
    ArpeggiosCollection.insert(arpeggio);
  });
}


if(GoalsCollection.find().count() === 0) {
  console.log("Goals seed data added!");

  // add to MongoDB Database //
  goalsSeed.forEach((goal) => {
    GoalsCollection.insert(goal);
  });
}







// export const librarySeed = [
//   {
//     demo: true,
//     _id: 'piece1',
//     name: 'Für Elise',
//     description: 'This is a description',
//     image: 'https://ec-assets.sheetmusicplus.com/items/2924332/cover_images/cover-large_file.png',
//     categories: ['Piano', 'Beethoven', 'Für Elise'],
//     youtubeLink: 'https://www.youtube.com/watch?v=_mVW8tgGY_w',
//     linkedLessonGoals: [
//       {
//         createdOn: moment().format('2017-09-01 13:00', 'YYYY-MM-DD HH:mm'),
//         lessonDate: moment().format('2017-09-25 14:30', 'YYYY-MM-DD HH:mm'),
//         lessonDetails: {
//           teacher: 'Teacher Name',
//           comments: 'This is a comment'
//         }
//       }
//     ],
//     linkedExamGoals: [
//       {
//         createdOn: moment().format('2017-09-01 13:30', 'YYYY-MM-DD HH:mm'),
//         examDetails: moment().format('2017-09-29 17:30', 'YYYY-MM-DD HH:mm')
//       }
//     ],
//     notes: ['Here are my first set of notes'],
//     practiceHistory: [
//       {
//         date: moment().format('2017-09-10 12:00', 'YYYY-MM-DD HH:mm'),
//         duration: 4, // hours //
//         practiceRanking: 5, // out of 5 //
//         comments: 'Here are my comments'
//       }
//     ],
//     recordings: ['recording 1', 'recording 2', 'recording 3'],
//     containedInLists: ['My Final Recital']
//   }
// ]; // seed end //
// // library is collection of pieces + collection of lists //
