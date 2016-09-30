// ACTION GENERATORS
// TESTING

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';

var actions = require('actions');

// MOCK STORE!  "generator"
// create as many stores as you need ...
// Do not share/reuse them among tests. ...
// Pass in an array of middleware (thus far just, thunk)
var createMockStore = configureMockStore([thunk]);


describe('Actions', () => {

  // SYNCHRONOUS
  it('should MERELY generate the login action', () => {
    var action = {
      // Cool: yes, this also passes.
      //  That is, the ordering of object properties does NOT
      //  matter for object equivalency testing. Bon.
      // uid: '12345testuid',
      // type: 'LOGIN',
      type: 'LOGIN',
      uid: '12345testuid',
    };

    const response = actions.login(action.uid);
    expect(response).toEqual(action);
  });

  // SYNCHRONOUS
  it('should MERELY generate the logout action', () => {
    const action = {
      type: 'LOGOUT',
    };

    const response = actions.logout();
    expect(response).toEqual(action);
  });

  it('should generate the search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'This thing is nice.',
    };

    var res = actions. setSearchText(action.searchText);

    expect(res).toEqual(action);
  });


  it('should MERELY generate the add Todo action', () => {
/* *** FIREBASE Refactoring **** */
// Yep:
    var todo_handmade = {
      id: 'handmade_id_123',
      text: 'HANDMADEVAR Write me a hard-coded Todo inside action test, for Firebase (using null)',
      completed: false,
      completedAt: null,
      createdAt: 1000,
    };
    var action = {
      type: 'ADD_TODO',
      todo: todo_handmade, // cool. call a var for the todo.
      // Yep: also works to code the todo right in here:
      // todo: {
      //   id: 'handmade_id_123',
      //   text: 'HANDMADE RIGHT INSIDE Write me a hard-coded Todo inside action test, for Firebase (using null)',
      //   completed: false,
      //   completedAt: null,
      //   createdAt: 1000,
      // },

    // text: 'Gots to write more actions.',

// My NON-conventional name -
// To pass this test I had to change from todoText to text (see actions.jsx):
//    todoText: 'Gots to write more actions.',

    }; // /action! oo-la. type: 'ADD_TODO'

  // Also changed todoText to text here, on the action:
  /* *** FIREBASE Refactoring **** */
  // Now whole action, not just action.text
  // Hmm, correction: we want to send in whole todo, not whole action!
  // var res = actions.addTodo(action.text); // OLD
  // var res = actions.addTodo(action); // New. Nope.
  // var res = actions.addTodo(...action); // New. Not quite.
  // Hmm. Interesting (above) the spread operator on this action object. We got:
  /*  { todo: undefined, type: 'ADD_TODO' }
  */
    var res = actions.addTodo(action.todo); // New. Hope so! YEAH. Worked! :o)
    expect(res).toEqual(action);
  });


  /* *** TESTING w. AUTHENTICATION  LECTURE 146 ***  07:04 */
  /* This Test used to be in this first section - not truly using Firebase todos.
  Now with Authentication, has to be moved down to lower, nested Describe() group that does use Firebase, authenticates. etc.
  */
  // it('should run startAddTodo (singular), to create todo and dispatch ADD_TODO (singular)', (done) => {


// *** LOCALSTORAGE Redux Refactoring, going to LocalStorage
// SYNCHRONOUS:
  it('should MERELY generate the add Todos (plural) action object', () => {
    var todos: [
      {
        id: 1,
        text: 'PLURAL ACTION 1 stuff',
        completed: false,
        completedAt: undefined,
        createdAt: 500,
      }, {
        id: 2,
        text: 'PLURAL ACTION 2 stuff too',
        completed: false,
        completedAt: undefined,
        createdAt: 5000,
      }
    ];
    var action = {
      type: 'ADD_TODOS',
      todos,
    };
    var res = actions.addTodos(action.todos);
    expect(res).toEqual(action);
  });


/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$  Tests with Firebase todos  $$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$  MOVED FROM THIS SECTION TO BELOW $$$ */
/* $$$$$$$$   OK - TIME FOR CLEAN-UP $$$$$$$$$$$$ */
/* Have to refactor, consolidate, correct.
    WR__ code had 2 sections where should have been 1.
    WR__ code had lacunae where should have been none.
*/
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
  // ********* 2nd Level DESCRIBE 01  PLURAL *********
  /* *** TESTING w. AUTHENTICATION  LECTURE 146 ***  07:28 */
  /* The WR__ Code has two sections for this, whereas the Instructor Code has it in one.
  I refer to the Describe() section that actually goes to Firebase for actionable todos data, and that has setup and teardown code for testing (beforeEach() and afterEach()).
  WR__ Code has one section that creates a 2-item todos array ("plural"), and another that creates a 1-item todos array ("singular").

  In these two sections are the two tests that needed to go to Firebase for actual todos:
  1. - Testing Update a Todo (toggle showCompleted). So, startToggleTodo does the Find of that particular Todo on Firebase. (1-item section, above)
  2. - Testing Add all the Todos to the app (e.g. TodoList). So startAddTodos (plural) does the Find of all those Todos on Firebase. (2-item section, below)

  Now that AUTHENTICATION is involved, a 3rd test must join this section (the one with 2-item (though it doesn't really matter which)):
  3. - Testing Add a single Todo to Firebase. So, startAddTodo (singular) - it doesn't do a "FIND" on Firebase, but, to do any adding, you DO need to be authenticated, and to say which User you are.
  That's why it now joins the Describe() section for Firebase actions.
  */
//   describe('ASYNCH Tests with Firebase, getting all Todos - initial state', () => {
// // WR__ we'll see...
//     var aRefToTodos; // ?
//
//
//     // MOCHA (again) :)
//     beforeEach( (done) => {
//
// // WR__ we'll see...
//       aRefToTodos = firebase.database().ref().child('todos'); // ?
//
//       var todosRef = firebaseRef.child('todos');
//
//       // CLEAN OUT PRE-EXISTING CONDITIONS ;o)
//       todosRef.remove().then( () => {
//         // success handler for (1st) promise
//
//         // NOW READY TO LOAD DB "BEFORE" EACH TEST:
//
// // WR__ we'll see...        aRefToTodos.set([
//
//         // CHAIN by Returning, to the promise ...
//         return todosRef.set([
//             {
//               text: 'Firebase TODOS 01 actions test',
//               completed: false,
//               createdAt: 234567,
//             },{
//               text: 'Firebase TODOS 02 actions test',
//               completed: false,
//               createdAt: 234500,
//             }
//         ])
//         // then moves on to the actual test case code...
//       })
//       .then( () => done() ) // success handler for (2nd) promise
//       .catch(done);
//
//
//     });
//
//     afterEach( (done) => {
//       aRefToTodos.remove().then( () => done() );
//     });


    /* *** TESTING w. AUTHENTICATION  LECTURE 146 ***  7:04 */
    /*
    Before, this test for startAddTodo WAS in the general Describe() section above. But now that we use Authentication, must be in this lower-down, nested Describe() that uses Firebase todos.
    To ADD a todo now, we must authenticate, and must have a specific user ID.
    */

    // ASYNCH TEST
    // Tell Mocha keep listening till done is called
    // it('should run startAddTodo (singular), to create todo and dispatch ADD_TODO (singular)', (done) => {
    //   // call with empty store {}
    //   const store = createMockStore({});
    //   const todoText = 'My aysnch todo item, from actions.test.jsx';
    //
    //   store.dispatch(actions.startAddTodo(todoText)).then( () => {
    //     // success handler
    //     // returns array of all actions that were fired...
    //     const actions = store.getActions();
    //     // toInclude tests simply that what you specify is in there, is included (Among perhaps other properties etc.)
    //     expect(actions[0]).toInclude({
    //       type: 'ADD_TODO'
    //     });
    //     expect(actions[0].todo).toInclude({
    //       text: todoText
    //     });
    //     // You must call done!
    //     done();
    //   }).catch(done);
    // });




  //   // ASYNCHRONOUS
  //   it('should run startAddTodos (plural), to get todos from Firebase, and dispatch ADD_TODOS (plural) ', (done) => {
  //     const store = createMockStore({});
  //
  //     // From the instructor code/video:
  //     const action = actions.startAddTodos();
  //
  //     // store.dispatch(actions.startAddTodos()).then( () => {
  //     // Instructor improvement:
  //     store.dispatch(action).then( () => {
  //         // success handler
  //         // returns all the actions since store created:
  //         const actionsFired = store.getActions();
  //
  //         expect(actionsFired[0]).toInclude({
  //           type: 'ADD_TODOS',
  //         });
  //         // same thing:
  //         expect(actionsFired[0].type).toEqual('ADD_TODOS');
  //
  //         // or .toEqual
  //         expect(actionsFired[0].todos.length).toBe(2);
  //
  //         expect(actionsFired[0].todos[0].text).toEqual('Firebase TODOS 01 actions test');
  //
  //         expect(actionsFired[0].todos[0].text).toInclude('01');
  //
  //         done(); // Non dimenticare!
  //         // will go back to afterEach() ... :)
  //
  //     }).catch(done); // error handler...
  //   });
  //
  // }); // /describe ASYNCH stuff...





  it('should generate the toggleShowCompleted action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED',
      // Q. Hmm, any boolean here ??
      // A. Nope!
    };
    var res = actions.toggleShowCompleted();
    expect(res).toEqual(action);
  });



/* *** FIREBASE Refactoring *** */
  // it('should generate the toggle todo action (completed, or not)', () => {
  it('should generate the UPDATE todo action (completed, or not) & UPDATES ETC.', () => {
    // Let's pass in an update of F -> T ??
    var updates = {
      completed: true,
      completedAt: moment().unix(),
    };
    var action = {
      // type: 'TOGGLE_TODO',
      type: 'UPDATE_TODO',
      id: 79,
      updates: updates,
    };
    // var res = actions.toggleTodo(action.id); // 79
    var res = actions.updateTodo(action.id, action.updates); // 79, true, timestamp...
    expect(res).toEqual(action);
  });


/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$$$  Tests with Firebase todos  $$$$$$$ */
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
/* $$$$$$$$   OK - TIME FOR CLEAN-UP $$$$$$$$$$$$ */
/* Have to refactor, consolidate, correct.
    WR__ code had 2 sections where should have been 1.
    WR__ code had lacunae where should have been none.
*/
/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
  /* *** TESTING w. AUTHENTICATION  LECTURE 146 ***  7:04 */
  // ********* 2nd Level DESCRIBE 02 SINGULRAR *********
  /* *** FIREBASE Refactoring *** */
  // Lecture 135 7:30   SINGULAR UPDATE ONE TODO


  describe('Tests with Firebase todos', () => {
    var testTodoRef; // individual Todo

    /* *** TESTING w. AUTHENTICATION  LECTURE 146 ***  8:02 */
    var uid;
    var todosRef; // all todos

    // MOCHA:
    // Asynch
    beforeEach( (done) => {
      /* *** TESTING w. AUTHENTICATION  LECTURE 146 ***  8:15 */
      /* Notes:
      O.K., /app/firebase/index.js has:
      /* *** OAUTH GITHUB **** ...
      export var githubProvider = new firebase.auth.GithubAuthProvider();
      And actions.jsx, which runs the app's U/I, has:
      firebase.auth().signInWithPopup(githubProvider)...
      Whereas here below we want to TEST, with NO U/I, so we used to use 1) Personal Access Tokens, till that no longer worked (ca. 28/Sep/16) and now we use 2) signInAnonymously instead. See below. Cheers.
      */



      // GitHub Personal Access Token - No Longer Used!
      // https://www.udemy.com/the-complete-react-web-app-developer-course/learn/v4/questions/1669006
      // var credential = firebase.auth.GithubAuthProvider.credential(process.env.GITHUB_ACCESS_TOKEN);
      // firebase.auth().signInWithCredential(credential).then( (user) => {
      // Call in as a function. No redirects etc.
      // We get back the user object (in 'then')
      // NEW! "Anonymously" instead:
      firebase.auth().signInAnonymously().then( (user)  => {
      // success funct
        uid = user.uid;
        // tick marks are `template string`:
        // Recall our database root now has /users/, no longer /todos/
        todosRef = firebaseRef.child(`users/${uid}/todos`);
        // We move this next line from below to here inside the "success" function, and keep the chain going by returning it, to 'then()...'
        return todosRef.remove();
      }).then( () => {
        // Old location: at the todos that was at top of Firebase database.
        // testTodoRef = firebaseRef.child('todos').push();
        // New location: at the todos for that particular user
        testTodoRef = todosRef.push();
        return testTodoRef.set({
          text: 'Firebase actions test',
          completed: false,
          createdAt: 2345,
        })
      })
      .then( () => done())
      .catch(done);
      // when promise returns, we fire done()
      // Same as one-liner above:
      // }).then( () => {
      //   // when promise returns, we fire done()
      //   done();
      // });
    });

    // Clean up after testing!
    afterEach( (done) => {
      // We used to just remove the one Todo we made
      // testTodoRef.remove().then( () => done() );
      // Now we remove them all, off that particular user:
      todosRef.remove().then( () => done() );
    });


    /* *** TESTING w. AUTHENTICATION  LECTURE 146 ***  7:04 */
    /*
    Before, this test for startAddTodo WAS in the general Describe() section above. But now that we use Authentication, must be in this lower-down, nested Describe() that uses Firebase todos.
    To ADD a todo now, we must authenticate, and must have a specific user ID.
    */
    it('should run startAddTodo (singular), to create todo and dispatch ADD_TODO (singular)', (done) => {
      // call with empty store {}
      // const store = createMockStore({});
      /* Now with TESTING AUTHENTICATION, we want to pass in not empty object but an object that has auth: { uid } information:
      */
      // const store = createMockStore({ auth: { uid: uid} }); // ES5
      const store = createMockStore({ auth: { uid } }); // ES6
      const todoText = 'My aysnch todo item, from actions.test.jsx';

      store.dispatch(actions.startAddTodo(todoText)).then( () => {
        // success handler
        // returns array of all actions that were fired...
        const actions = store.getActions();
        // toInclude tests simply that what you specify is in there, is included (Among perhaps other properties etc.)
        expect(actions[0]).toInclude({
          type: 'ADD_TODO'
        });
        expect(actions[0].todo).toInclude({
          text: todoText
        });
        // You must call done!
        done();
      }).catch(done);
    });



    // ASYNCHRONOUS
    it('should run startAddTodos (plural), to get todos from Firebase, and dispatch ADD_TODOS (plural) ', (done) => {
      // const store = createMockStore({});
      const store = createMockStore({ auth: { uid } }); // ES6

      // From the instructor code/video:
      const action = actions.startAddTodos();

      // store.dispatch(actions.startAddTodos()).then( () => {
      // Instructor improvement:
      store.dispatch(action).then( () => {
          // success handler
          // returns all the actions since store created:
          const actionsFired = store.getActions();

          expect(actionsFired[0]).toInclude({
            type: 'ADD_TODOS',
          });
          // same thing:
          expect(actionsFired[0].type).toEqual('ADD_TODOS');

          // or .toEqual
          // expect(actionsFired[0].todos.length).toBe(2);
          // We used to have a separate beforeEach setup for plural that had 2 items; no longer, it just shares the same set up of a 1-item array.
          expect(actionsFired[0].todos.length).toBe(1);

          expect(actionsFired[0].todos[0].text).toEqual('Firebase actions test');

          expect(actionsFired[0].todos[0].text).toInclude('actions');

          done(); // Non dimenticare!
          // will go back to afterEach() ... :)

      }).catch(done); // error handler...
    });


    it('should toggle todo (run startToggleTodo) and dispatch UPDATE_TODO action', (done) => {
      // Optional: Pass in data for your store.
      // const store = createMockStore({});
      const store = createMockStore({ auth: { uid } }); // ES6
      // The ID is the key from Firebase:
      // Set the 'completed' value in hard-coded manner to true (since it's false in our test Todo (above), and we want to toggle it.)
      // (I suppose we could negate the value on that object; oh well)
      const action = actions.startToggleTodo(testTodoRef.key, true);

      /*
      Okay: the then promise gets 2 functions passed to it: 1st is the success; 2nd is the fail. We just pass in done; if/when it fails any error messages get passed back via done to then.
      */
      store.dispatch(action).then(
        // 1st function passed in to promise:
        () => {
          // returns array of all actions that were fired...
          const mockActions = store.getActions();

          // Note: it's tricky to assert EQUAL on the unix timestamp ... inside updates{ completedAt: ____ }
          // Better to just use toINCLUDE:
          // expect(mockAction[0]).toEqual({

// FAILING ( ? ) 5000 milliseconds....
          expect(mockActions[0]).toInclude({
            type: 'UPDATE_TODO',
            id: testTodoRef.key,
            // updates: {
            // }
          });

// PASSES:
         expect(mockActions[0].updates).toInclude({
           completed: true,
         });

// PASSES:
         expect(mockActions[0].updates.completedAt).toExist();


/* http://www.epochconverter.com/
1474046932
Your time zone: 9/16/2016, 1:28:52 PM GMT-4:00 DST
*/
var unixTimeWhenIWroteTest = 1474046932;

// PASSES:
         expect(mockActions[0].updates.completedAt).toBeGreaterThan(unixTimeWhenIWroteTest);
        //
         done(); // Don't forgte to call done()!
        //
      }, // /1st function passed in to promise
        // 2nd function passed in to promise:
        done); // just 'done' not 'done()' We're not firing it, but passing it

    });

  })

});
