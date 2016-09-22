import React from 'react';
import ReactDOM from 'react-dom';

// Nope: var Link = require('react-router'.Link);
var {Link} = require('react-router'); // ?
// import {Link} from 'react-router'; // should work


// var Main = React.createClass({
//
//   render: () => {

var Main = (props) => {
  return (
    <div>
      <p>My Main Component</p>
      <ul>
        <li>
          <Link to="/" >Home/Root/Login, really</Link>
        </li>
        <li>
          <Link to="/todos" >The Todo App</Link>
        </li>
      </ul>
      <div>
{/* ??         {props.children}
Uncaught ReferenceError: props is not defined

      ?? {this.props.children}
Uncaught TypeError: Cannot read property 'props' of undefined
*/}
        {props.children}
      </div>
    </div>
  )
};

// });

module.exports = Main;
