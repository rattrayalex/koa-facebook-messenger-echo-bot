/* global it, describe */
/* eslint-disable no-unused-expressions */
import 'should';
import bot from './bot';

describe('base bot', () => {
  describe('respondToMessage', () => {
    const testData = {
      message: {
        text: 'Hello!',
      },
      sender: {
        id: 1,
      },
    };
    it('should return a Promise', done => {
      bot.respondToMessage(testData)
        .then(() => done());
    });
    it('should return an object with messageText and senderId', done => {
      bot.respondToMessage(testData)
        .then(actual => {
          actual.messageText.should.exist;
          actual.senderId.should.exist;
          done();
        });
    });
  });
});
