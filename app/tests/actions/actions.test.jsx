// ACTION GENERATORS
// TESTING

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

var expect = require('expect');

var actions = require('actions');

// MOCK STORE!  "generator"
// create as many stores as you need ...
// Do not share/reuse them among tests. ...
// Pass in an array of middleware (just, thunk)
var createMockStore = configureMockStore([thunk]);


describe('Actions', () => {
  it('should generate the search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'This thing is nice.',
    };

    var res = actions. setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate the add Todo action', () => {
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
    };
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
  it('should create todo and dispatch ADD_TODO', (done) => {
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



  it('should generate the toggleShowCompleted action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED',
      // Q. Hmm, any boolean here ??
      // A. Nope!
    };
    var res = actions.toggleShowCompleted();
    expect(res).toEqual(action);
  });

  it('should generate the toggle todo action (completed, or not)', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 79,
    }
    var res = actions.toggleTodo(action.id); // 79
    expect(res).toEqual(action);
  });

});
