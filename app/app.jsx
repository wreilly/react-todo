var React = require('react');
var ReactDOM = require('react-dom');
// Provider - provide Store to children (Grandchildren too I think)
// We only use Redux *Provider* here at the top of the app, for providing access to state (store)
// Further below (TodoList, Todo) we use Redux *connector* for access to state (store)
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// *** LOCALSTORAGE Redux Refactoring, going to LocalStorage
var TodoAPI = require('TodoAPI');


var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();

// FIREBASE
// Hmm, different use of import. No 'from'. Lecture 126 8:35
// "Since we're not exporting any variables..." << Does he mean firebase/index.js? Or this app.jsx?
// use import followed by the path.
// We leave off 'from' - because:
// We "don't care about creating any variables from the module's exports" (?) << We don't create a variable here in app.jsx, from out of what the imported module makes available? "exports"? Huh?
// I guess I think this means, all we do here is import it, such that the code over in firebase/index.js actually just gets run.
// That code doesn't interact any further with the code here in app.jsx. No variables over there, nor over here, reference one another, interact, etc. ? Can this be correct? Hmm.

/* *** FIREBASE Refactoring into the real Todo App *** */
// We need to COMMENT OUT the playground now,
//  because it "deletes our entire database" ... (tsk, tsk)
/* **** import './../playground/firebase/index'; // ? *** */
/* *** /FIREBASE Refactoring into the real Todo App *** */



/* *** FIREBASE Refactoring LECTURE 136 *** */
/* No More LOCALSTORAGE */

// store.subscribe( () => {
//   var state = store.getState();
//   console.log("New state (using LocalStorage now): ", state);
//
//   // *** NOW LOCALSTORAGE Redux Refactoring, Store now going to LocalStorage ...
//   /* *****
// hah!
// - Used to be on React life-cycle componentDidUpdate, in TodoApp.jsx. todos went to app state.
// - Now instead here in the Redux store.subscribe() listener, todos going to localStorage.
// Cool.
//   */
//   TodoAPI.setTodos(state.todos);
// });
//
// // *** LOCALSTORAGE Redux Refactoring, going to LocalStorage
// // New: Need a way to load up any existing todo items.
// // Use our API to get them out of LocalStorage. (May or may not be any)
// var initialTodos = TodoAPI.getTodos();
/* *** /FIREBASE Refactoring LECTURE 136 *** */
/* /No More LOCALSTORAGE */



// New Action and Reducer,  for BULK ADD of Todo items to todos
/* *** FIREBASE Refactoring LECTURE 136 *** */
// We *used to* refresh the app store with this action:
// store.dispatch(actions.addTodos(initialTodos));
// Now instead: Firebase Asynchronous Action to go GET the initial todos out of Firebase. No longer LocalStorage.
// After the Asynchronous action (startAddTodos), we'll
//   still call the Synchronous action (addTodos) to
//   refresh the store, providing data to the app
store.dispatch(actions.startAddTodos());
/* *** /FIREBASE Refactoring LECTURE 136 *** */



/* **** This was a nice temporary Default Todo */
// Fire an action!
// store.dispatch(actions.addTodo('Learn evermore about JavaScript'));
// store.dispatch(actions.setSearchText('evermore'));
// store.dispatch(actions.toggleShowCompleted()); // across all Todos



// Older way: (Now importing foundation from app.scss)
// Load foundation
// No longer using this plain CSS version:
// require('style!css!foundation-sites/dist/foundation.min.css');

// Start up foundation:
$(document).foundation();

// App css
// SASS loader
require('style!css!sass!applicationStyles');


ReactDOM.render(
  <div>
    <p>React Redux TodoApp - (app.jsx)</p>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </div>,
  document.getElementById('app')
);
