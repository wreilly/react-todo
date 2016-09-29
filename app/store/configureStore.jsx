// OLD 'require' way:
// var redux = require('redux');
// NEW ES6 'import' way: ("redux does not have a default import")
import * as redux from 'redux';

// MIDDLEWARE:
// REDUX-THUNK
// https://www.npmjs.com/package/redux-thunk
//
// Redux Thunk middleware allows you to write action creators that return a function instead of an action. USEFUL FOR ASYNCH.
// thunk *is* the default import:
import thunk from 'redux-thunk';


// OLD require way:
// var { searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');

/* *** WR__ IDEA ***  stateReducer cwaziness */
// NEW 'import' way:
// NO. NO DAMNED 'stateReducer'. Busted. Oy!
// import { stateReducer, authReducer, searchTextReducer, showCompletedReducer, todosReducer} from 'reducers';
import { authReducer, searchTextReducer, showCompletedReducer, todosReducer} from 'reducers';


// New: pass in initialState; if none, set to empty object
export var configure = (initialState = {}) => {
  /* http://redux.js.org/docs/api/combineReducers.html
  The shape of the state object matches the keys of the passed reducers.

A popular convention is to name reducers after the state slices they manage, so you can use ES6 property shorthand notation: combineReducers({ counter, todos }). This is equivalent to writing combineReducers({ counter: counter, todos: todos }).
*/
/* *** WR__ IDEA *** */
/*
Hah! Busted. What are you going to name your overall "state" reducer here, eh?
That is -you cannot expect to put some one thing in the 'left-hand side' in the object below, to represent BOTH the 'auth:' AND the 'todos:'. Those two things are already on the state! You can't introduce a 'new' (?) reducer here, to tackle handling two sibling parts of state, both up at the root level like this. (To my understanding.)
Maybe instead: do the authReducer removal of auth:, and right there, dispatch another Action to go get the todosReducer to remove the todos: ? (Prob can't dispatch an Action from inside a reducer.)
Googling: No, squire, no dispatching of an action from a reducer. "Anti-pattern!" Oo-la.
Next idea up: re-write the 'LOGOUT' reducer to receive a two-part slice of state? { auth: {}, todos: [] } ??
Can you do that? No idea.
*/
/* http://redux.js.org/docs/basics/Reducers.html

*/
  var reducer = redux.combineReducers({
    // KEY "state slice" e.g. text, Boolean, array ...
    auth: authReducer,
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
  });

// As seen in LearnRedux project ...
// If the I guess Redux code (devToolsExtension) is available, call it
// If not (?), we "pass through" the "passed-in" ? function ('f'). Hmm.
/* ES6 Anonymous "arrow" function, basic pattern:
  () => { return ; }
  So:
  (f) => { return f;  }
  (f) => return f; // 1. Don't need {}
  (f) => f; // 2. return implicit
  f => f; // 3. With just one param only you can skip ()
  */
  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  return store;
};
