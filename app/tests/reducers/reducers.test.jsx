var expect = require('expect');

//  PASS VALUES TO DEEPFREEZE, then to our Reducers
var df = require('deep-freeze-strict');

var lilInspector = require('lilInspector');

var reducers = require('reducers');

describe('Reducers',  () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      /* Note: we here manually create / hard-code our action, as opposed to generating it dynamically from the action generator code.
      Why?
      To avoid, here in testing, that the thing we're focussed on testing isn't reporting that it is failing, though actually it might be fine, and the failure is owing to other code elsewhere (e.g. that generator...)
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
      var action = {
        type: 'TOGGLE_TODO',
        id: 1,
      };
      var res = reducers.todosReducer(df(todosTest), df(action));
      expect(res[0].completed).toBe(false);
      expect(res[0].completedAt).toBe(undefined);
// Let's toggle again!
// NOPE!:      var res = reducers.todosReducer(df(todosTest), df(action));
// Hmm, thought I could pass res in.
// TypeError: Cannot read property 'id' of undefined
      // var res02 = reducers.todosReducer(df(res), df(action));

      // console.log("WR__ res res[0] res[0].completed : " + res + " : " + res[0] + " : " + res[0].completed);

      lilInspector(res[0], 'res[0] first run, completed false');

      var res02 = reducers.todosReducer(df(res), df(action));

      lilInspector(res02[0], 'res02[0] second run, completed true');
      lilInspector(res02[0], 'res02[0] second run, completedAt > 1473070948');

      expect(res02[0].completed).toBe(true);
      // http://www.unixtimestamp.com/
      /*
      1473068041 seconds since Jan 01 1970. (UTC)
      This epoch translates to:
      09/05/2016 @ 9:34am (UTC)
      2016-09-05T09:34:01+00:00 in ISO 8601

      1473070948 seconds since Jan 01 1970. (UTC)

This epoch translates to:

09/05/2016 @ 10:22am (UTC)
2016-09-05T10:22:28+00:00 in ISO 8601
      */
      // https://github.com/mjackson/expect#tobegreaterthan
      expect(res02[0].completedAt).toBeGreaterThan(1473070948);
    });

    // N.B. This gets called from app.jsx, to get "initialTodos"
    it('should add (plural) existing todo items (to todos array)', () => {
      var todos = [
        {
          id: 1,
          text: "One of many! This was, say, on LocalStorage",
          completed: true,
          completedAt: 20000, // 20,000 seconds into 1970
          createdAt: 3000, // 3,000 seconds into 1970
        },
        {
          id: 2,
          text: "TWO of many! This was, say, on LocalStorage",
          completed: false,
          completedAt: undefined, // never got to this, back in 1970
          createdAt: 5000, // 5,000 seconds into 1970
        },
      ];
      var action = {
        type: 'ADD_TODOS',
        todos,
      };

      // Hmm, empty array?
      // expects state and action
      // Not getting why empty state
      // Guess we're testing world in which basically
      //   app is just starting ?, state is empty,
      //   and the code is supposed to go to LocalStorage
      //   to populate the state with the todo items it finds there.
      // hmm. ?
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(2); // same array we sling in there, no ? (length is 2)
      expect(res[0]).toEqual(todos[0]);
      expect(res[1]).toEqual(todos[1]);
    });


  }); // todosReducer

}); // Reducers
