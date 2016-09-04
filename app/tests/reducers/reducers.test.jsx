var expect = require('expect');

//  PASS VALUES TO DEEPFREEZE, then to our Reducers
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers',  () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      /* Note: we here manually create / hard-code our action, as opposed to generating it dynamically from the action generator code.
      Why?
      To avoid, here in testing, that the thing we're focussed on testing isn't breaking actually owing to other code elsewhere (e.g. that generator...)
      Cheers.
      */
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'dog',
      };
      /* Note: the invocation of the reducer here passes in a boring empty string default state, but what matters (for the test) is that the action we pass in along with that does contain the searchText we are testing ('dog'). Very nice.
      */
      var res = reducers.searchTextReducer(df(''), df(action));
      expect(res).toEqual(action.searchText);
    });
  });

  // showCompletedStatus gets flipped
  describe('showCompletedReducer', () => {
    it('should flip Boolean logic on showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED',
        // id: 15, // could be anything << Not needed
        // completed: false, << Nope! Not neededs
      };
      var res = reducers.showCompletedReducer(df(false), df(action));
      expect(res).toEqual(true); // ?
      // var res = reducers.showCompletedReducer('', action.completed);
      // expect(res).toNotEqual(action.completed); // ?
      /* Error: Expected '' to not equal false */
    });
  });

});
