import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import moment from 'moment';

import { PiecesCollection } from '../../../api/pieces';

import { Button, Divider, Form, Grid, Label, Modal, Segment } from 'semantic-ui-react';


export class AddNewPiece extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      scrapeUrl: '',
      title: '',
      composer: '',
      genre: '',
      instrument: '',
      coverImageUrl: '',
      coverImage: '',
      categories: '',
      categoriesArray: [],
      description: '',
      youtubeLink: '',
      customLists: [],
      linkedLessonGoals: '',
      newLessonGoal: '',
      linkedExamGoals: '',
      newExamGoal: '',
      notes: '',
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

  handlePieceSubmission() {
    const formObject = {
      title: this.state.title,
      demo: false,
      composer: this.state.composer,
      genre: this.state.genre,
      instrument: this.state.instrument,
      coverImageUrl: this.state.coverImageUrl,
      coverImage: this.state.coverImage,
      categories: this.state.categories,
      categoriesArray: this.state.categoriesArray,
      description: this.state.description,
      youtubeLink: this.state.youtubeLink,
      customLists: this.state.customLists,
      linkedLessonGoals: this.state.linkedLessonGoals,
      newLessonGoal: this.state.newLessonGoal,
      linkedExamGoals: this.state.linkedExamGoals,
      newExamGoal: this.state.newExamGoal,
      notes: this.state.notes
    }

    // add selected piece and add to pieces database //
    this.props.Session.set('addPieceFormContent', formObject);
    // console.log("Successfully set");
    // console.log(this.props.Session.get('addPieceFormContent'));

    Meteor.call('piecesCollection.insert', formObject, (err, res) => {
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

    // clear session state //
    this.props.Session.set('addPieceFormContent', undefined);
  }

  scrapeDataFromUrl(event) {
    event.preventDefault();
    const scrapeUrl = this.state.scrapeUrl;

    Meteor.call('piecesCollection.scrape', scrapeUrl, (err, res) => {
      if(!err) {
        console.log(res);
        // set temporary values //
        if(res.title) {
          this.setState({
            title: res.title
          });
        }
        if(res.description) {
          this.setState({
            description: res.description
          });
        }
        if(res.image) {
          this.setState({
            coverImageUrl: res.image
          });
        }

        if(res.tags) {
          let categoriesText = '';
          res.tags.map((tag) => {
            categoriesText += (tag + ', ');
          });
          this.setState({
            categories: categoriesText
          })
        }

      } else {
        this.setState({
          error: err.reason
        });
        return false;
      }

    });
  }


  handleScrapeUrlChange(event) {
    const scrapeUrl = event.target.value;
    this.setState({
      scrapeUrl
    })
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({
      title
    });
  }

  handleComposerChange(event) {
    const composer = event.target.value;
    this.setState({
      composer
    });
  }

  handleCoverImageUrlChange(event) {
    const coverImageUrl = event.target.value;
    this.setState({
      coverImageUrl
    });
  }

  handleCoverImageUploadChange(event) {
    event.preventDefault();
  }

  handleCategoriesChange(event) {
    const categories = event.target.value;
    const categoriesArray = [];
    categories.split(', ').map((category) => {
      categoriesArray.push(category);
    });
    this.setState({
      categories,
      categoriesArray
    });
  }

  handleDescriptionChange(event) {
    const description = event.target.value;
    this.setState({
      description
    });
  }

  handleYoutubeLinkChange(event) {
    const youtubeLink = event.target.value;
    this.setState({
      youtubeLink
    });
  }

  handleCustomListsChange(event) {
    const customListItems = event.target.value;
    const customLists = [];
    customListItems.split(', ').map((item) => {
      customLists.push(item);
    });
    this.setState({
      customLists
    })
  }

  handleGenreChange(event) {
    const genre = event.target.value;
    this.setState({
      genre
    });
  }

  handleInstrumentChange(event) {
    const instrument = event.target.value;
    this.setState({
      instrument
    });
  }


  render() {
    return(
      <Modal
        size={'fullscreen'}
        trigger={<Button floated="right" positive onClick={this.handleOpen.bind(this)}>Add New Piece</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose.bind(this)}>
        <Modal.Header className="text-center">Add New Piece</Modal.Header>

        <Form warning error widths={"equal"}>
          <Grid centered columns={2} padded stackable>
            <Grid.Row columns={1}>
              <Grid.Column width={8}>
                <Form.Group inline>
                  <Form.Input width={12}
                    value={this.state.scrapeUrl}
                    label="Add online sheetmusic product url to autocomplete details"
                    placeholder="Eg. https://www.musicroom.com/product-detail/product1130178/variant1130178/beethoven-bagatelle-in-a-minor-woo-59-f-r-elise/"
                    onChange={this.handleScrapeUrlChange.bind(this)}
                  />
                  <Form.Button
                    content='Scrape'
                    width={4}
                    onClick={this.scrapeDataFromUrl.bind(this)}
                  />
                </Form.Group>
              </Grid.Column>

            </Grid.Row>
            <Grid.Row>
              <Grid.Column>

                <Modal.Content>
                  <Form.Field>
                    <Form.Input
                      required
                      value={this.state.title}
                      label='Add Title'
                      placeholder='Eg. Für Elise...'
                      onChange={this.handleTitleChange.bind(this)}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Input
                      required
                      value={this.state.composer}
                      label='Add Composer'
                      placeholder='Eg. Claude Debussy...'
                      onChange={this.handleComposerChange.bind(this)}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Upload cover image / select from our database</label>
                    <Form.Group inline>
                      <Form.Input
                        fluid
                        required
                        type="url"
                        value={this.state.coverImageUrl}

                        placeholder='Enter cover image url here'
                        onChange={this.handleCoverImageUrlChange.bind(this)}
                      />

                      <Form.Button
                        fluid
                        type="button"
                        onClick={this.handleCoverImageUploadChange.bind(this)}>
                        Upload cover image
                      </Form.Button>
                    </Form.Group>
                  </Form.Field>

                  <Form.Field>
                    <Form.Input
                      required
                      value={this.state.genre}
                      label='Genre'
                      placeholder='Eg. Classical...'
                      onChange={this.handleGenreChange.bind(this)}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Form.Input
                      required
                      value={this.state.instrument}
                      label='Instrument'
                      placeholder='Eg. Piano...'
                      onChange={this.handleInstrumentChange.bind(this)}
                    />
                  </Form.Field>

                </Modal.Content>
              </Grid.Column>

              <Grid.Column>
                <Modal.Content>
                  <Form.Field>
                    <Form.TextArea
                      required
                      value={this.state.description}
                      label="Add Description"
                      placeholder="Write something about the piece..."
                      onChange={this.handleDescriptionChange.bind(this)}
                    />
                  </Form.Field>

                  <Form.Input
                    value={this.state.youtubeLink}
                    label="Add YouTube Link"
                    placeholder=""
                    onChange={this.handleYoutubeLinkChange.bind(this)}
                  />

                  <Form.Input
                    value={this.state.customListItems}
                    label="Add to custom list"
                    placeholder=""
                    onChange={this.handleCustomListsChange.bind(this)}
                  />

                  <Form.Input
                    value={this.state.categories}
                    label="Add categories (separated by comma)"
                    placeholder='Eg. Piano, Solo, Romantic'
                    onChange={this.handleCategoriesChange.bind(this)}
                  />

                </Modal.Content>

              </Grid.Column>
            </Grid.Row>

          </Grid>
        </Form>

        <Modal.Actions>
          {this.state.error ? <Label color='red' pointing='right'>{this.state.error}</Label> : null}
          <Button primary onClick={this.handlePieceSubmission.bind(this)}>
            Add Piece
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}


export default createContainer((params) => {
  return {
    Session
  }
}, AddNewPiece);
