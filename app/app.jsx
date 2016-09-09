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

store.subscribe( () => {
  console.log("New state: ", store.getState());
});

// Fire an action!
store.dispatch(actions.addTodo('Learn evermore about JavaScript'));
store.dispatch(actions.setSearchText('evermore'));
store.dispatch(actions.toggleShowCompleted()); // across all Todos

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
    {/* <TodoApp /> */}
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </div>,
  document.getElementById('app')
);
