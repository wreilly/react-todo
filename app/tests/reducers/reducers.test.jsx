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

  describe('todosReducer', () => {
    it('should add new todo (singular)', () => {
      var action = {
        type: 'ADD_TODO',
        text: 'Walk that dog, once again',
      };
      var res = reducers.todosReducer( df([]), df(action));
      expect(res.length).toEqual(1); // added 1 todo to array
      expect(res[0].text).toEqual(action.text);
    });

    // case for TOGGLE_TODO
    // match item of action.id e.g. 1
    // modify - set completed ! oppositeC
    // set commpleted at timestamp or clear

// pass array as default; toggle action; check has completed opposite
// todos array w realistic todo item
//action with that id #
// assert completedFlipped

    it('should toggle a single todo  --- completed or not; timestamp or clear', () => {
      var action = {
        type: 'TOGGLE_TODO',
        id: 1,
      };
      var todosTest = [
        {
          id: 1,
          text: "Toggle this one!",
          completed: true,
          completedAt: 2000, // 2,000 seconds into 1970
          createdAt: 1000, // 1,000 seconds into 1970
        },
        {
          id: 2,
          text: "Leave this one untouched, kids!",
          completed: false,
          completedAt: undefined, // never got to this, back in 1970
          createdAt: 3000, // 3,000 seconds into 1970
        },
      ];
      var res = reducers.todosReducer(df(todosTest), df(action));
      expect(res[0].completed).toBe(false);
      expect(res[0].completedAt).toBe(undefined);
    });

  }); // todosReducer

}); // Reducers
