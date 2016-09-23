// This code we initially had in /app.jsx, fwiw.
// This file extension .jsx vs. .js because it has some JSX code (<Router> ...)

import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Main from 'Main';
import TodoApp from 'TodoApp';
import Login from 'Login';

/* you do need final slash on firebase/ but because file there is index.js it is not needed to put filename here:
*/
import firebase from 'app/firebase/';


/* *** LECTURE 143 PRIVATE PAGES *** */
// React MIDDLEWARE
// next allows you to use asynchronous; we don't need that here
// I guess it's all REACT ROUTER stuff: 'nextState', 'replace', 'next'
var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    // null if not logged in
    // ! negate
    // nobody logged in? Back to root '/'
    replace('/');
  }
  // if currentUser was NOT null, somebody IS logged in - keep going:
  next();
};


/* If you are logged in, we're not taking you back nor letting you go back to the log-in page. We take you to the one-&-only other page we've got!
*/
var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/todos');
  }
  next();
};


/* // Was in /app.jsx, fwiw.
Hmm, I had this comment line inside below, was failing...
*/
export default (
  <Router history={hashHistory}>
    <Route path='/' component={Main} >
      <Route path='todos' component={TodoApp} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
);
