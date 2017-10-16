import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import _ from 'lodash';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


import { PiecesCollection } from '../../../api/pieces';
import { GoalsCollection } from '../../../api/goals';
import { ScalesCollection } from '../../../api/scales';

import LibrarySelect from './LibrarySelect/LibrarySelect';
import NewGoalForm from './NewGoalForm/NewGoalForm';

import { Button, Checkbox, Form, Grid, Header, Icon, Image, Label, List, Menu, Modal, Radio, Search, Segment, Table } from 'semantic-ui-react';


const dummyCategories = [
  {
    key: 'category1',
    text: 'Category 1',
    value: 'Category 1'
  },
  {
    key: 'category2',
    text: 'Category 2',
    value: 'Category 2'
  },
  {
    key: 'category3',
    text: 'Category 3',
    value: 'Category 3'
  },
  {
    key: 'category4',
    text: 'Category 4',
    value: 'Category 4'
  }
];

const dummyPracticeSchedule = [
  {
    key: 'daily',
    text: 'Daily',
    value: 'Daily'
  },
  {
    key: 'everyOtherDay',
    text: 'Every Other Day',
    value: 'Every Other Day'
  },
  {
    key: '3TimesAWeek',
    text: '3 Times A Week',
    value: '3 Times A Week'
  },
  {
    key: 'twiceAWeek',
    text: 'Twice A Week',
    value: 'Twice A Week'
  },
  {
    key: 'weekly',
    text: 'Weekly',
    value: 'Weekly'
  }
];

const dummyLessons = [
  {
    key: 'lesson1',
    text: 'Lesson 1',
    value: 'Lesson 1'
  },
  {
    key: 'lesson2',
    text: 'Lesson 2',
    value: 'Lesson 2'
  },
  {
    key: 'lesson3',
    text: 'Lesson 3',
    value: 'Lesson 3'
  },
  {
    key: 'lesson4',
    text: 'Lesson 4',
    value: 'Lesson 4'
  }
];

const dummyExams = [
  {
    key: 'exam1',
    text: 'Exam 1',
    value: 'Exam 1'
  },
  {
    key: 'exam2',
    text: 'Exam 2',
    value: 'Exam 2'
  },
  {
    key: 'exam3',
    text: 'Exam 3',
    value: 'Exam 3'
  },
  {
    key: 'exam4',
    text: 'Exam 4',
    value: 'Exam 4'
  }
];


export class AddNewGoal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      error: ''
    }
  }

  handleOpen() {
    this.setState({
      modalOpen: true
    })
  }

  handleClose() {
    this.setState({
      modalOpen: false
    })
  }

  handleGoalSubmission() {
    // access selected piece from library //
    // TODO: add selected piece and add to goals database //
    // console.log(this.props.Session.get('addGoalFormContent'));
    // console.log(this.props.Session.get('addGoalPieceSelection'));

    const formObject = this.props.Session.get('addGoalFormContent');
    const connectedPiece = this.props.Session.get('addGoalPieceSelection');

    Meteor.call('goalsCollection.insert', formObject, connectedPiece, (err, res) => {
      if(!err) {
        // close modal //
        this.setState({
          modalOpen: false
        });
        // console.log('db insert complete!');
      } else {
        this.setState({
          error: err.reason
        });
        // console.log(err);
        return false;
      }
    });

    // close modal //
    // if(this.props.Session.get('addGoalFormContent') !== undefined &&
    //   this.props.Session.get('addGoalPieceSelection') !== undefined) {
    //     this.setState({
    //       modalOpen: false
    //     });
    // } else {
    //   // show error to fill out required inputs //
    //   return false;
    // }

    // clear session state //
    this.props.Session.set('addGoalFormContent', undefined);
    this.props.Session.set('addGoalPieceSelection', undefined);
  }

  render() {
    if(this.props.pieces && this.props.scales) {
      return(
        <div>
          <Modal
            size={'fullscreen'}
            trigger={<Button floated="right" positive onClick={this.handleOpen.bind(this)}>Add New</Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose.bind(this)}>
            <Modal.Header className="text-center">Add new goal</Modal.Header>

            <Grid columns={2} padded stackable>
              <Grid.Column>
                <Modal.Content>
                  <NewGoalForm categories={dummyCategories} practiceSchedule={dummyPracticeSchedule} lessons={dummyLessons} exams={dummyExams} />
                </Modal.Content>
              </Grid.Column>

              <Grid.Column>
                <Modal.Content>
                  <LibrarySelect pieces={this.props.pieces} piecesTitle={this.props.piecesTitle} piecesComposer={this.props.piecesComposer} />
                </Modal.Content>
              </Grid.Column>
            </Grid>

            <Modal.Actions>
              <Button primary onClick={this.handleGoalSubmission.bind(this)}>
                Save Goal
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      );
    } else {
      // if no pieces in library //
      return <h1>It seems like you don't have any pieces in your library... Please add some before you add a new goal</h1>
    }
  } // render end //
}

export default createContainer((params) => {
  const addGoalPieceSelection = Session.get('addGoalPieceSelection');

  return {
    ready: Meteor.subscribe('piecesCollectionPublication', params.id).ready(),
    ready2: Meteor.subscribe('goalsCollectionPublication', params.id).ready(),
    ready3: Meteor.subscribe('scalesCollectionPublication', params.id).ready(),
    pieces: PiecesCollection.find({ userId: this.userId }).fetch(),
    piecesTitle: PiecesCollection.find({ userId: this.userId }, {sort: { name: 1}}).fetch(),
    piecesComposer: PiecesCollection.find({ userId: this.userId }, {sort: { composer: 1}}).fetch(),
    scales: ScalesCollection.find({}).fetch(),
    Session
  }
}, AddNewGoal);
