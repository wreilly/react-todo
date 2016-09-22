import React from 'react';

/* *** OAUTH GITHUB LOGIN LOGOUT **** */
// As also in TodoApp.jsx, Now we need Redux, to get 'dispatch', which we need for actions, which we now need to wire up this Login component, to do actions like Log In, Log Out!
import * as Redux from 'react-redux';
import * as actions from 'actions';





// OLD ES5, I guess:. Still worked.
var Login = React.createClass({
// NEW ES6 / import/export grooviness, I guess: Worked.
// export var Login = React.createClass({


/* *** OAUTH GITHUB LOGIN LOGOUT **** */
  onLogin() {
    var {dispatch} = this.props;

    dispatch(actions.startLogin());
  },
/* *** /OAUTH GITHUB LOGIN LOGOUT **** */



  // Hmm, the colon works, but the ES6 way can even remove that
  // render: () => {
  /* Hmm, are we so sure?

*UPDATE* Error was, I'm an idiot! I removed the colon, but failed to notice to also remove the "fat arrow". Sigh.

ERROR in ./app/components/Login.jsx
Module build failed: SyntaxError: Unexpected token (7:11)

   5 |   // Hmm, the colon works, but the ES6 way can even remove that
   6 |   // render: () => {
>  7 |   render() => {
     |            ^
   8 |
  */
  // O.K., we'll try this NEW ES6 thing again:
  // WRONG-O! d'oh. not an arrow function, kid.
  // No: render() => {
  render() {

    return (
      <div>
        <h3 className="page-title">Please Log In Component</h3>
{/* Nope!
        // <div>
        //   {props.children}
        // </div>
*/}

        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>Do this, do that, do the other thing. Login with Github account, below.</p>

{/* *** OAUTH GITHUB LOGIN LOGOUT **** */}
{/*              <button className="button">Login with Github</button> */}
              <button className="button" onClick={this.onLogin}>Login with Github</button>
{/* *** /OAUTH GITHUB LOGIN LOGOUT **** */}
            </div>
          </div>
        </div>
      </div>
    );
  },
});



/* *** OAUTH GITHUB LOGIN LOGOUT **** */
// O.K., more change: 9:11 Lecture 142
/* Need to go re-learn this Connect stuff ... oo-la
Connect, connects the component to the Redux Store.
If you don't do that, the component is not getting any State information. Hah.
*/
// Again default IS this one. See also app.jsx where this is imported.
export default Redux.connect()(Login);

// Worked, but:
// module.exports = Login;
// Instructor code:
// export default Login;
// Having here used export default, you must over in app.jsx use import. require will not work.
// APP.JSX: import Login from 'Login';
