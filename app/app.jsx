var React = require('react');
var ReactDOM = require('react-dom');

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
    <TodoApp />
  </div>,
  document.getElementById('app')
);
