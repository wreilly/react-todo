var expect = require('expect');

//  PASS VALUES TO DEEPFREEZE, then to our Reducers
var df = require('deep-freeze-strict');

import moment from 'moment';

var lilInspector = require('lilInspector');

var reducers = require('reducers');

describe('Reducers',  () => {

  describe('authReducer', () => {
    it('should upon login, add/set user.uid to state', () => {
      const action = {
        type: 'LOGIN',
        uid: '123456testuid',
      };

      // This did work:
      // const response = reducers.authReducer(df({}), df(action));
      /* Interesting: Instructor code passes 'undefined' for the state, which I believe he said means that the initial default state will get used. okay. */
      const response = reducers.authReducer(undefined, df(action));

      // Wrong - See reducers.jsx re: my WR__ Code erroneous understanding.
      // expect(result.auth.uid).toEqual(action.uid);
      // This did work, but see below for Instructor Code better test:
      // expect(response.uid).toEqual(action.uid);

      /* Instructor code: okay, here we see what is returned from the reducer is literally:
      {
        uid: '123456testuid'
      }
      such that what's returned is attached to the state like so:
      {
        ...state,
        auth: {
          uid: '123456testuid'
        }
      }
      */
      expect(response).toEqual(
        {
          uid: action.uid
        }
      );
    });

    it('should upon logout, remove user.uid from state (Wipe!)', () => {
      // Need a default value, here in the test, to wipe!
      const authData = {
        uid: '123abc',
      };

      const action = {
        type: 'LOGOUT',
      };

      // "reducers should not be updating their inputs"
      const response = reducers.authReducer(df(authData), df(action));

      // Error: Expected undefined to be null
      // Wrong - See reducers.jsx re: my WR__ Code misunderstanding
      // expect(result.auth.uid).toBe(undefined); // not null, but undefined. ok.

      // This worked ...
      // expect(response.uid).toBe(undefined);

      // Instructor Code
      expect(response).toEqual(
        {
          // empty object. No { uid: '123abc' } anymore. Wiped.
        }
      );
    });
  });

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

    it('should wipe all todos out upon Logout (in addition to wiping out user:uid, in the authReducer)', () => {
      const todos = [
        {
          id: 'handmade_id_123499',
          text: 'WIPEOUT 99 HANDMADEVAR REDUCER Write me a hard-coded Todo inside Reducer test',
          completed: false,
          completedAt: null,
          createdAt: 1000,
        },
        {
          id: 'handmade_id_123488',
          text: 'WIPEOUT 88 HANDMADEVAR REDUCER Write me a hard-coded Todo inside Reducer test',
          completed: false,
          completedAt: null,
          createdAt: 1001,
        },
      ];
      const action = {
        type: 'LOGOUT',
      };
      // TESTING *NOT* RUNNING THIS REDUCER.
      const response = reducers.todosReducer( df(todos), df(action) );

      // expect(response).toEqual([]); // ?
      expect(response.length).toEqual(0);
    });

    it('should add new todo (singular)', () => {
  /* *** FIREBASE Refactoring **** */
  // Yep: (see also actions.test.jsx)
      var todo_handmade = {
        id: 'handmade_id_1234',
        text: 'HANDMADEVAR REDUCER Write me a hard-coded Todo inside Reducer test, for Firebase (using null)',
        completed: false,
        completedAt: null,
        createdAt: 1000,
      };

      var action = {
        type: 'ADD_TODO',
        /* *** FIREBASE Refactoring **** */
        // text: 'Walk that dog, once again',
        todo: todo_handmade,
      };
      var res = reducers.todosReducer( df([]), df(action));
      // Hmm, don't pass in the todo (below), pass in the whole action (above)
      // var res = reducers.todosReducer( df([]), df(action.todo));

// lilInspector(res, 'res! todosReducer([], the action todo ~ handmade)');
/* Nuttin'!:
*** !!!! lilInspector !!!! ****'
LOG: 'objectVariableNameThisTime : res! todosReducer([], the action todo ~ handmade)'
LOG: '**** !!!! /END lilInspector !!!! ***
*/

      expect(res.length).toEqual(1); // added 1 todo to array
      // expect(res[0].text).toEqual(action.text);
      expect(res[0].text).toEqual(action.todo.text);
      // Also (why not):
      expect(res[0]).toEqual(action.todo);
    });



/* *** FIREBASE REFACTORING *** TOGGLE_TODO -> UPDATE_TODO */
    // case for TOGGLE_TODO -> now UPDATE_TODO
    it('should UPDATE (from having started a toggle) a single todo  --- completed or not; timestamp or clear', () => {
      var todosTest = [
        {
          id: 1,
          text: "FIREBASE ? Toggle this one!",
          completed: true,
          completedAt: 2000, // 2,000 seconds into 1970
          createdAt: 1000, // 1,000 seconds into 1970
        },
        {
          id: 2,
          text: "FIREBASE ? Leave this one untouched, kids!",
          completed: false,
          completedAt: undefined, // never got to this, back in 1970
          createdAt: 3000, // 3,000 seconds into 1970
        },
      ];
      /* *UPDATE* Yeah, but here in REDUCERS we are on 2nd step, and the action is now an OBJECT (SYNCH).
      1st step action was a FUNCTION (ASYNCH), and it called Firebase, but when 'done' it generates a SYNCH Action OBJECT, to send here in Reducer.
      Cheers
      */
      // Corrected above >> With Firebase Asynch, action is no longer an OBJECT. It's a FUNCTION. << Not correct! See above.
      // ORIG (Pre-Firebase)
      // var action = {
      //   type: 'TOGGLE_TODO',
      //   id: 1,
      // };
      // FIREBASE REFACTOR: Now includes 'updates'
      // Like in actions.test.jsx, let's pass in an update of F -> T ??
      var updates = {
        completed: true,
        completedAt: moment().unix(),
      };

      // SIMPLIFY Test. T -> F instead
      // var updates = {
      //   completed: false,
      //   completedAt: null,
      // };



      // Let's do id:2, which has false, we'll set to true.
      // Back to id:1 which has true we'll make false
      // Back to id:2 which has false we'll make true
      var action = {
        // type: 'TOGGLE_TODO',
        type: 'UPDATE_TODO',
        // id: 1,
        // This gets same value (1), but comes from the array now, not hard-coded here. Hmm.
        id: todosTest[1].id, // for id:2
        updates: updates,
      };

// NOPE! NOT A FUNCTION, HERE IN THIS TEST:
      // Remember! "Toggle" means send in the NEGATE of the completed value T -> F, F-> T. Gracias.
      // var action = actions.startToggleTodo(todosTest[0].id, !todosTest[0].completed);
      // WR__ QUESTION
      // What do we do now, w. above? ...

      var res = reducers.todosReducer(df(todosTest), df(action));

      // NEW Assertion (FIREBASE refactoring)
      // Prove that a property *not* in the updates
      //   also remains intact, through the reducer.
      // expect(res[0].text).toEqual(todosTest[0].text);
      expect(res[1].text).toEqual(todosTest[1].text);


      // expect(res[0].completed).toBe(false);
      expect(res[1].completed).toEqual(updates.completed);
      // expect(res[1].completed).toBe(true);

      // expect(res[0].completedAt).toBe(undefined);
      expect(res[1].completedAt).toEqual(updates.completedAt);
      /* http://www.epochconverter.com/
      1474020444
      Your time zone: 9/16/2016, 6:07:21 AM GMT-4:00 DST
      */
      var unixTimeWhenIWroteTest = 1474020444;
      expect(res[1].completedAt).toBeGreaterThan(unixTimeWhenIWroteTest);


// Let's toggle again! <<<< DO THIS BIT LATER
      // lilInspector(res[0], 'res[0] first run, completed false');
      //
      // var res02 = reducers.todosReducer(df(res), df(action));
      //
      // lilInspector(res02[0], 'res02[0] second run, completed true');
      // lilInspector(res02[0], 'res02[0] second run, completedAt > 1473070948');
      //
      // expect(res02[0].completed).toBe(true);
      // // http://www.unixtimestamp.com/
      // /*
      // 1473070948 seconds since Jan 01 1970. (UTC)
      // 09/05/2016 @ 10:22am (UTC)
      // */
      // // https://github.com/mjackson/expect#tobegreaterthan
      // expect(res02[0].completedAt).toBeGreaterThan(1473070948);
    });
/* *** /FIREBASE REFACTORING *** TOGGLE_TODO -> UPDATE_TODO */






/* *** PRE-FIREBASE REFACTORING *** TOGGLE_TODO */
//     // case for TOGGLE_TODO
//     // match item of action.id e.g. 1
//     // modify - set completed ! opposite
//     // set completed at timestamp or clear
//
//     // pass array as default; toggle action; check has completed opposite
//     // todos array w realistic todo item
//     //action with that id #
//     // assert completedFlipped
//
//     it('should toggle a single todo  --- completed or not; timestamp or clear', () => {
//       var todosTest = [
//         {
//           id: 1,
//           text: "Toggle this one!",
//           completed: true,
//           completedAt: 2000, // 2,000 seconds into 1970
//           createdAt: 1000, // 1,000 seconds into 1970
//         },
//         {
//           id: 2,
//           text: "Leave this one untouched, kids!",
//           completed: false,
//           completedAt: undefined, // never got to this, back in 1970
//           createdAt: 3000, // 3,000 seconds into 1970
//         },
//       ];
//       var action = {
//         type: 'TOGGLE_TODO',
//         id: 1,
//       };
//       var res = reducers.todosReducer(df(todosTest), df(action));
//       expect(res[0].completed).toBe(false);
//       expect(res[0].completedAt).toBe(undefined);
// // Let's toggle again!
// // NOPE!:      var res = reducers.todosReducer(df(todosTest), df(action));
// // Hmm, thought I could pass res in.
// // TypeError: Cannot read property 'id' of undefined
//       // var res02 = reducers.todosReducer(df(res), df(action));
//
//       // console.log("WR__ res res[0] res[0].completed : " + res + " : " + res[0] + " : " + res[0].completed);
//
//       lilInspector(res[0], 'res[0] first run, completed false');
//
//       var res02 = reducers.todosReducer(df(res), df(action));
//
//       lilInspector(res02[0], 'res02[0] second run, completed true');
//       lilInspector(res02[0], 'res02[0] second run, completedAt > 1473070948');
//
//       expect(res02[0].completed).toBe(true);
//       // http://www.unixtimestamp.com/
//       /*
//       1473068041 seconds since Jan 01 1970. (UTC)
//       This epoch translates to:
//       09/05/2016 @ 9:34am (UTC)
//       2016-09-05T09:34:01+00:00 in ISO 8601
//
//       1473070948 seconds since Jan 01 1970. (UTC)
//
// This epoch translates to:
//
// 09/05/2016 @ 10:22am (UTC)
// 2016-09-05T10:22:28+00:00 in ISO 8601
//       */
//       // https://github.com/mjackson/expect#tobegreaterthan
//       expect(res02[0].completedAt).toBeGreaterThan(1473070948);
//     });
/* *** /PRE-FIREBASE REFACTORING *** TOGGLE_TODO */







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
