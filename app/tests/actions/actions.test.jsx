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


// ASYNCH TEST
// Tell Mocha keep listening till done is called
  it('should run startAddTodo (singular), to create todo and dispatch ADD_TODO (singular)', (done) => {
    // call with empty store {}
    const store = createMockStore({});
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


  // ********* 2nd Level DESCRIBE 01  PLURAL *********
  describe('ASYNCH Tests with Firebase, getting all Todos - initial state', () => {
// WR__ we'll see...
    var aRefToTodos; // ?

    // MOCHA (again) :)
    beforeEach( (done) => {

// WR__ we'll see...
      aRefToTodos = firebase.database().ref().child('todos'); // ?

      var todosRef = firebaseRef.child('todos');

      // CLEAN OUT PRE-EXISTING CONDITIONS ;o)
      todosRef.remove().then( () => {
        // success handler for (1st) promise

        // NOW READY TO LOAD DB "BEFORE" EACH TEST:

// WR__ we'll see...        aRefToTodos.set([

        // CHAIN by Returning, to the promise ...
        return todosRef.set([
            {
              text: 'Firebase TODOS 01 actions test',
              completed: false,
              createdAt: 234567,
            },{
              text: 'Firebase TODOS 02 actions test',
              completed: false,
              createdAt: 234500,
            }
        ])
        // then moves on to the actual test case code...
      })
      .then( () => done() ) // success handler for (2nd) promise
      .catch(done);


    });

    afterEach( (done) => {
      aRefToTodos.remove().then( () => done() );
    });

    // ASYNCHRONOUS
    it('should run startAddTodos (plural), to get todos from Firebase, and dispatch ADD_TODOS (plural) ', (done) => {
      const store = createMockStore({});

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
          expect(actionsFired[0].todos.length).toBe(2);

          expect(actionsFired[0].todos[0].text).toEqual('Firebase TODOS 01 actions test');

          expect(actionsFired[0].todos[0].text).toInclude('01');

          done(); // Non dimenticare!
          // will go back to afterEach() ... :)

      }).catch(done); // error handler...
    });

  }); // /describe ASYNCH stuff...





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


  // ********* 2nd Level DESCRIBE 02 SINGULRAR *********
  /* *** FIREBASE Refactoring *** */
  // Lecture 135 7:30   SINGULAR UPDATE ONE TODO
  describe('Tests with Firebase todos', () => {
    var testTodoRef;

    // MOCHA:
    // Asynch
    beforeEach( (done) => {
      testTodoRef = firebaseRef.child('todos').push();

      testTodoRef.set({
        text: 'Firebase actions test',
        completed: false,
        createdAt: 2345,
      }).then( () => done() ); // when promise returns, we fire done()
      // Same as one-liner above:
      // }).then( () => {
      //   // when promise returns, we fire done()
      //   done();
      // });
    });

    // Clean up after testing!
    afterEach( (done) => {
      testTodoRef.remove().then( () => done() );
    });

    it('should toggle todo (run startToggleTodo) and dispatch UPDATE_TODO action', (done) => {
      // Optional: Pass in data for your store.
      const store = createMockStore({});
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
        //  expect(mockActions[0].updates).toInclude({
        //    completed: true,
        //  });

// PASSES:
        //  expect(mockActions[0].updates.completedAt).toExist();


/* http://www.epochconverter.com/
1474046932
Your time zone: 9/16/2016, 1:28:52 PM GMT-4:00 DST
*/
var unixTimeWhenIWroteTest = 1474046932;

// PASSES:
        //  expect(mockActions[0].updates.completedAt).toBeGreaterThan(unixTimeWhenIWroteTest);
        //
         done(); // Don't forgte to call done()!
        //
      }, // /1st function passed in to promise
        // 2nd function passed in to promise:
        done); // just 'done' not 'done()' We're not firing it, but passing it

    });

  })

});
