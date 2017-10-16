import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Button, Checkbox, Form, Grid, Header, Icon, Image, Label, List, Menu, Modal, Radio, Search, Segment, Table } from 'semantic-ui-react';


export class NewGoalForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      selectedCategory: '',
      newCategory: '',
      startDate: '',
      endDate: '',
      minsPerSession: '',
      selectedPracticeSchedule: '',
      reachTempo: '',
      customAchievements: '',
      linkedLesson: '',
      linkedExam: ''
    }
  }

  handleFormSubmission() {
    // update session to be accessed back in AddNewGoal.js //
    const formObject = {
      title: this.state.title,
      selectedCategory: this.state.selectedCategory,
      newCategory: this.state.newCategory,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      minsPerSession: this.state.minsPerSession,
      selectedPracticeSchedule: this.state.selectedPracticeSchedule,
      reachTempo: this.state.reachTempo,
      customAchievements: this.state.customAchievements,
      linkedLesson: this.state.linkedLesson,
      linkedExam: this.state.linkedExam
    }

    // TODO: handle required items here //

    setTimeout(() => {
      this.props.Session.set('addGoalFormContent', formObject);
      // console.log("Successfully set");
      // console.log(formObject);
    }, 100);
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({
      title
    });

    this.handleFormSubmission();
  }

  handleNewCategoryChange(event) {
    const newCategory = event.target.value;
    this.setState({
      newCategory
    });

    this.handleFormSubmission();
  }

  handleMinsPerSessionChange(event) {
    const minsPerSession = event.target.value;
    this.setState({
      minsPerSession
    });

    this.handleFormSubmission();
  }

  handleReachTempoChange(event) {
    const reachTempo = event.target.value;
    this.setState({
      reachTempo
    });

    this.handleFormSubmission();
  }

  handleCustomAchievementsChange(event) {
    const customAchievements = event.target.value;
    this.setState({
      customAchievements
    });

    this.handleFormSubmission();
  }


  render() {
    return(
      <div>
        <Segment>
          <Form warning error widths={"equal"}>
            <Form.Input
              required
              value={this.state.title}
              label='Title'
              placeholder='Eg. Practice for ABRSM exam'
              onChange={this.handleTitleChange.bind(this)}
            />

            <Form.Group widths={'equal'} inline>
              <Form.Select
                fluid
                value={this.state.selectedCategory}
                label="Category"
                search
                selection
                options={this.props.categories}
                placeholder='Select from categories'
                onChange={(event, { value }) => {
                  this.setState({
                    selectedCategory: value
                  });
                  this.handleFormSubmission();
                }}
              />
              <Form.Input
                fluid
                value={this.state.newCategory}
                placeholder='Or add a new category...'
                onChange={this.handleNewCategoryChange.bind(this)}
              />
            </Form.Group>

            <Form.Group widths={'equal'} inline>
              <label>Start Date</label>
              <DayPickerInput
                value={this.state.startDate ? moment(this.state.startDate).format('MM/DD/YYYY') : undefined}
                placeholder="Select a starting date"
                hideOnDayClick={true}
                onDayChange={(day, { selected }) => {
                  this.setState({
                    startDate: moment(day).valueOf()
                  });
                  this.handleFormSubmission();
                }}
              />
              <label>End Date</label>
              <DayPickerInput
                value={this.state.endDate ? moment(this.state.endDate).format('MM/DD/YYYY') : undefined}
                placeholder="Select an end date"
                hideOnDayClick={true}
                onDayChange={(day, { selected }) => {
                  this.setState({
                    endDate: moment(day).valueOf()
                  });
                  this.handleFormSubmission();
                }}

              />
            </Form.Group>

            <Form.Input
              label="Mins per session"
              value={this.state.minsPerSession}
              type="number"
              placeholder="Eg. 60 (minutes)"
              onChange={this.handleMinsPerSessionChange.bind(this)}
            />

            <Form.Select
              value={this.state.selectedPracticeSchedule}
              label="Practice Schedule"
              search
              selection
              options={this.props.practiceSchedule}
              placeholder='Select an ideal practice schedule'
              onChange={(event, { value }) => {
                this.setState({
                  selectedPracticeSchedule: value
                });
                this.handleFormSubmission();
              }}
            />

            <Form.Input
              label="Reach Tempo"
              value={this.state.reachTempo}
              type="number"
              placeholder="Eg. 120 (bpm)"
              onChange={this.handleReachTempoChange.bind(this)}
            />

            <Form.Input
              label="Specify a custom achievement (separate by tab)"
              value={this.state.customAchievements}
              placeholder="Eg. Focus on measure 56"
              onChange={this.handleCustomAchievementsChange.bind(this)}
            />

            <Form.Select
              label="Link a lesson"
              value={this.state.linkedLesson}
              search
              selection
              options={this.props.lessons}
              placeholder='Select an existing lesson...'
              onChange={(event, { value }) => {
                this.setState({
                  linkedLesson: value
                });
                this.handleFormSubmission();
              }}
            />

            <Form.Select
              label="Link an exam"
              value={this.state.linkedExam}
              search
              selection
              options={this.props.exams}
              placeholder='Select an existing exam...'
              onChange={(event, { value }) => {
                this.setState({
                  linkedExam: value
                });
                this.handleFormSubmission();
              }}
            />

          </Form>
        </Segment>
      </div>
    );
  }
}

export default createContainer((params) => {
  return {
    Session
  }
}, NewGoalForm);
