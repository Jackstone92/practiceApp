// import { Meteor } from 'meteor/meteor';

// import { PiecesCollection } from '../../api/pieces';

import moment from 'moment';


export const goalsSeed = [
  {
    demo: true,
    _id: 'goal1',
    title: '',
    selectedCategory: 'Category1',
    newCategory: '',
    startDate: moment().valueOf(),
    endDate: moment().add(3, 'months').valueOf(),
    minsPerSession: 60,
    selectedPracticeSchedule: 'Daily',
    reachTempo: 120,
    specifyAGoal: 'Focus on measure 56',
    linkedLesson: 'Lesson 1',
    linkedExam: 'Exam 1',
    connectedPiece: 'piece1' // _id of piece
  }
];
