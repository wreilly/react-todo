var React = require('react');
var ReactDOM = require('react-dom');
// Provider - provide Store to children (Grandchildren too I think)
// We only use Redux *Provider* here at the top of the app, for providing access to state (store)
// Further below (TodoList, Todo) we use Redux *connector* for access to state (store)
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();

// *** LOCALSTORAGE Redux Refactoring, going to LocalStorage
var TodoAPI = require('TodoAPI');

store.subscribe( () => {
  var state = store.getState();
  console.log("New state (using LocalStorage now): ", state);

  // *** NOW LOCALSTORAGE Redux Refactoring, Store now going to LocalStorage ...
  /* *****
hah!
- Used to be on React life-cycle componentDidUpdate, in TodoApp.jsx. todos went to app state.
- Now instead here in the Redux store.subscribe() listener, todos going to localStorage.
Cool.
  */
  TodoAPI.setTodos(state.todos);
});

// *** LOCALSTORAGE Redux Refactoring, going to LocalStorage
// New: Need a way to load up any existing todo items.
// Use our API to get them out of LocalStorage. (May or may not be any)
var initialTodos = TodoAPI.getTodos();
// New Action and Reducer,  for BULK ADD of Todo items to todos
store.dispatch(actions.addTodos(initialTodos));



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
