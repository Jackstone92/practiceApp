import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';


export const Sounds = new FilesCollection({
  debug: true,
  collectionName: 'Sounds',
  onBeforeUpload() {
    // Disallow uploads from client //
    return false;
  }
});


// To have sample files in DB we will upload them on server startup:
if (Meteor.isServer) {
  Sounds.denyClient();

  Meteor.startup(() => {

    if (!Sounds.findOne()) {
      Sounds.load('http://www.openmusicarchive.org/audio/Deep_Blue_Sea_Blues.mp3', {
        fileName: 'Deep_Blue_Sea_Blues.mp3'
      });
    }
  });

  Meteor.publish('files.sounds.all', () => Sounds.find().cursor);
} else {
  Meteor.subscribe('files.sounds.all');
}
