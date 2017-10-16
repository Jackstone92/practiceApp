import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { PiecesCollection } from './pieces';

import moment from 'moment';

if(Meteor.isServer) {

  describe('PiecesCollection', function() {

    const piecesItem1 = {
      userId: 'testUserId1',
      updatedAt: 0,
      demo: true,
      _id: 'piece1',
      count: 1,
      name: 'Für Elise',
      composer: 'Ludvig Van Beethoven',
      description: 'This is a description for Für Elise',
      coverImage: 'https://ec-assets.sheetmusicplus.com/items/2924332/cover_images/cover-large_file.png',
      youtubeLink: 'https://www.youtube.com/watch?v=_mVW8tgGY_w',
      createdOn: moment().valueOf()
    };

    beforeEach(function() {
      PiecesCollection.remove({});
      PiecesCollection.insert(piecesItem1);
    })

    // Tests //
    it('should insert new library item', function() {
      const _id = Meteor.server.method_handlers['piecesCollection.insert'].apply({ userId: 'testId' });

      expect(PiecesCollection.findOne({ _id: _id, userId: 'testId' })).toBeTruthy();
    });

    it('should not insert library item if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['piecesCollection.insert']();
      }).toThrow();
    });

    it('should remove note', function() {
      Meteor.server.method_handlers['piecesCollection.remove'].apply({ userId: piecesItem1.userId }, [piecesItem1._id]);

      expect(PiecesCollection.findOne({ _id: piecesItem1._id})).toBeFalsy();
    });

    it('should not remove library item if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['piecesCollection.remove'].apply({}, piecesItem1._id);
      }).toThrow();
    });

    it('should not remove library item if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['piecesCollection.remove'].apply({ userId: piecesItem1.userId });
      }).toThrow();
    });

    // it('should update library item', function() {
    //
    //   const name = 'This is an updated name!';
    //   const pieceOld = PiecesCollection.findOne(piecesItem1._id);
    //   console.log(pieceOld);
    //   console.log(piecesItem1._id);
    //   console.log(typeof(piecesItem1._id));
    //
    //   Meteor.server.method_handlers['piecesCollection.update'].apply({
    //     userId: piecesItem1.userId
    //     },
    //     [
    //       piecesItem1._id,
    //       { name: name }
    //     ]
    //   );
    //
    //   const piece = PiecesCollection.findOne(piecesItem1._id);
    //   console.log(piece);
    //
    //   expect(piece.updatedAt).toBeGreaterThan(0);
    //   expect(piece).toIncludeKey('_id');
    // });

  }); // describe end //
} // if end //
