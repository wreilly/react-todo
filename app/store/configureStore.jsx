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

// NEW 'import' way:
import { searchTextReducer, showCompletedReducer, todosReducer} from 'reducers';


// New: pass in initialState; if none, set to empty object
export var configure = (initialState = {}) => {
  /* http://redux.js.org/docs/api/combineReducers.html
A popular convention is to name reducers after the state slices they manage, so you can use ES6 property shorthand notation: combineReducers({ counter, todos }). This is equivalent to writing combineReducers({ counter: counter, todos: todos }).
*/
  var reducer = redux.combineReducers({
    // KEY "state slice" e.g. text, Boolean, array ...
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
