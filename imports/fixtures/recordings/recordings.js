import moment from 'moment';


export const recordingsSeed = [
  {
    demo: true,
    _id: moment().valueOf(),
    recordingDetails: [
      {
        date: moment().format('2017-09-10 12:00', 'YYYY-MM-DD HH:mm'),
        duration: 4.5, // hours //
        trueDuration: 4, // hours - based on truePractice Algorithm //
        userRating: 5, // out of 5 - by user //
        practiceRanking: 4.6, // out of 5 - computed based on goals and truePractice //
        notes: 'Here are my notes', // aims, journal //
        recordings: [
          'recording 1',
          'recording 2'
        ]
      }
    ]
  }
];

// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, '$'),
// }))
