var React = require('react');
var ReactDOM = require('react-dom');
// Provider - provide Store to children (Grandchildren too I think)
// The only place we use Redux *Provider* is here at the top of the app, for providing access to state (store)
// Further below, conceptually, in the app (e.g. TodoList, Todo) we use Redux *connector* for access to that state (store)
var {Provider} = require('react-redux');

/* *** LECTURE 143 PRIVATE PAGES *** */
// Let's clean up some imports.
// With new /app/router/index.jsx, we no longer use Router things here in /app.jsx, except hashHistory:
// var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var {hashHistory} = require('react-router');

/* *** LOGIN REFACTORING *** */
// Cwazy William, invented a whole 'Main' container, wasn't *really* necessary.
// Got the idea of course from what was it the ReactTimer app ? Cheers.
/* *** LECTURE 143 PRIVATE PAGES *** */
// Let's clean up some imports.
// Now over in new /app/router/index.jsx:
// var Main = require('Main');

/* *** OAUTH GITHUB LOGIN LOGOUT **** */
// Worked, but....
// var Login = require('Login');
// Instructor code.
// Having used export default, you must here use import. require will not work.
/* Also note: this is getting the "connected" "default" Login, not the one used only in testing (which I believe is invoked with {Login}) */
/* Perhaps minor note: When we put this line in, late in the game, we were already doing this 'ES6'/Import/Export manner of writing lines, so this one was already "future-proofed," ready to go, with the newly adjusted 'export' over in Login.jsx, to do the connect thing. Bon.
*/
/* *** LECTURE 143 PRIVATE PAGES *** */
// Let's clean up some imports. Login now in router code
// import Login from 'Login';

/* *** OAUTH GITHUB LOGIN LOGOUT **** */
/* Perhaps minor note: This line, put in long ago during the dark days of OLD 'ES5'/REQUIRE etc., now must be UPDATED to ES6/Import, to work with the just now updated ES6/EXPORT connected on the TodoApp.jsx. There you go.
*/
// var TodoApp = require('TodoApp');
// NEW & GROOVY
/* *** LECTURE 143 PRIVATE PAGES *** */
// Let's clean up some imports. TodoApp now in router code
// import TodoApp from 'TodoApp';

var actions = require('actions');
var store = require('configureStore').configure();

// *** LOCALSTORAGE Redux Refactoring, going to LocalStorage
/* *** LECTURE 143 PRIVATE PAGES *** */
// Let's clean up some imports. TodoAPI since quite awhile now is largely replaced by Firebase.
// TodoAPI now only has utility function to FILTER and SORT the todos
// var TodoAPI = require('TodoAPI');

/* *** LECTURE 143 PRIVATE PAGES **** */
// Using the webpack.config.js alias: { app: 'app'} to find /app/firebase/index.js :
import firebase from 'app/firebase/';

/* *** LECTURE 143 PRIVATE PAGES **** */
// Contains <Router> code; put this var now inside JSX below ... {router}
import router from 'app/router/';



/* auth() returns an object with many functions.
We want this "auth state change" listener.
Takes a function. If user present: logged in.
If missing: logged out
*/
/* As noted in actions.jsx, I don't really understand how result.user is made available here, but, have to take it that, well, it is. Firebase Auth() magic etc.
*/
/* Hmm. https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged
Okay, guess I read here that this method (onAuthStateChanged) takes a function. That function can expect that something (Firebase magic?) is going to pass to it a firebase.USER. All right. Go to town.
*/
firebase.auth().onAuthStateChanged( (user) => {
  if (user) {
    /* *** LECTURE 144 Action, Reducer. Pass user ID */
    /* Here in the listener/observer, which was actuated/called by the ASYNCHRONOUS action "startLogin" (or "startLogout"), we now call/dispatch the SYNCHRONOUS action, to do/trigger the 'login' action (which, basically, in turn runs/calls the 'login' reducer.)
    */

    /* *UPDATE* Hmm, am I wrong? Instructor code has dispatch first.
    */ /* DOUBLE UPDATE. Well, I am finding I DO need to put the redirect BEFORE the dispatch.
    What the hell.
    */ /* TREBLE UPDATE (hopefully last!)
    Sheeshsush Cristobal.
    I had left off 'store.' in 'store.dispatch(...)'
    o-la!
    So - I expect the perfesser code of putting the redirect AFTER the dispatch (er, ah, store.dispatch) is correct-a-mundo in the end.
    oy!
    LAST WORD: Tried both. Seems to NOT MATTER whether redirect is before or after dispatch. Good.
    */
    /* Hah. Found out you need to do this *before* you dispatch the action. It ain't comin' back after that, 'pparently. H-okay.
    */

    console.log("WR__ APP.JSX IF USER user.uid :) ", user.uid);
    // D'oh!  dispatch(actions.login(user.uid));
    store.dispatch(actions.login(user.uid));
    /* *** PER-USER/TODOS  LECTURE 145 *** */
    /* This used to get all todos; now must come only after login tells us WHICH user:
    */
    store.dispatch(actions.startAddTodos());
    // swap out the URL with something new
    hashHistory.push('/todos');
  } else {
    console.log("WR__ APP.JSX IF NO USER user.uid :) ");
    // D'oh!  dispatch(actions.logout());
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

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


/* *** PER-USER/TODOS  LECTURE 145 8:30 *** */
/* Interesting: No longer can we call a generic startAddTodos here in app.jsx like so.
Now we must wait till login has occurred, so we know which user's todos we are to start adding!
See above at login dispatch for where this startAddTodos dispatch has been moved.
*/
// store.dispatch(actions.startAddTodos());

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


/* *** LOGIN REFACTORING *** */
// NO USE OF REACT ROUTER:
// ReactDOM.render(
//   <div>
//     <p>React Redux TodoApp - (app.jsx)</p>
//     <Provider store={store}>
//       <TodoApp />
//     </Provider>
//   </div>,
//   document.getElementById('app')
// );

/*  ??          <IndexRoute component={Login} /> */

// HASHHISTORY on BROWSER (not server)


/* *** LECTURE 143 PRIVATE PAGES *** */
// React MIDDLEWARE Router methods
// Now put into /app/router/index.js. Cheers.

/* WR__ CODE: */
ReactDOM.render(
  <div>
    <p>React Redux TodoApp - (app.jsx)</p>
    <Provider store={store}>

      {/* *** LECTURE 143 PRIVATE PAGES *** */}
      {router}

      {/*  Now, just invoke the imported router! (Above)

      // below is Now over in /app/router/index.js:

      // <Router history={hashHistory}>
      //   <Route path='/' component={Main} >
      //     <Route path='todos' component={TodoApp} onEnter={requireLogin}/>
      //     <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
      //   </Route>
      // </Router>
      */}

    </Provider>
  </div>,
  document.getElementById('app')
);
/* /WR__ CODE: */


/* INSTRUCTOR CODE: 4:48 */
// ReactDOM.render(
//   <div>
//     <p>React Redux TodoApp - (app.jsx)</p>
//     <Provider store={store}>
//       <Router history={hashHistory}>
//         <Route path='/' >
//           <Route path='todos' component={TodoApp} />
//           <IndexRoute component={Login} />
//         </Route>
//       </Router>
//     </Provider>
//   </div>,
//   document.getElementById('app')
// );
/* /INSTRUCTOR CODE: */
