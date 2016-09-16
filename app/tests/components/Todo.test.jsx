var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

import * as actions from 'actions';

// ES6 import, in addition to destructuring:
import {Todo} from 'Todo';
// OLD ES5:
// var Todo = require('Todo');
// ES6 destructuring
// var {Todo} = require('Todo');
// ES6 destructuring can get the "raw old original React Todo component" off the 'Todo' module
// The 'Todo' module/component remember does its export in 2 ways:
// 1. export default is the Reduxed Connected Todo component
// 2. export to named var 'Todo' is the raw old original React component 'Todo'
// So the require('Todo') gets the whole Reduxed thing, since that is what the DEFAULT export is. And then off of that, by {destructuring}, we can obtain the plain old original React component, named 'Todo', inside of that module, also named 'Todo'. I think.

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  // that prop gets called when someone clicks ...
  // OLD:
  // it('should call onToggle prop with the id, on click', () => {
  // NEW: Redux Testing:
  // it('should dispatch the TOGGLE_TODO action on click', () => {
  /* *** FIREBASE Refactoring *** */
  it('should dispatch the UPDATE_TODO action on click', () => {
    var canIUseVarHere = 199;
    var todoData = {
      id: canIUseVarHere,
      text: "Write a todo test",
      completed: true,
      completedAt: 5000,
      createdAt: 1000,
    }

    // https://facebook.github.io/react/docs/test-utils.html

    var spyFunc = expect.createSpy();
    // hmm, what about the KEY ? (see TodoList): key={todoData.id} Not used in the video 94 8:00 or so...
    // OLD:
    // var testTodo = TestUtils.renderIntoDocument(<Todo onToggle={spyFunc} {...todoData} />);
    // NEW: Redux Testing:
    var testTodo = TestUtils.renderIntoDocument(<Todo dispatch={spyFunc} {...todoData} />);

    /* ******* HOW DOES ZIS WORK ?? ***** */
    //  video 94 ca. 8:34
    // "access the jQuery selector" ... and "pull out the root element" ....

    // CORRECT: hmm, the sought-after node'll be the one (and only) with that unique id we like: 199, ya?
    // NAH:     or, do I gotta specify "it's the 199 one, friends," right here in the test-biz? hmmph.
    var $el = $(ReactDOM.findDOMNode(testTodo));

    TestUtils.Simulate.click($el[0]); // ROOT ELEMENT of the jQuery selector = the <div>
    /* FINALLY ! I guess the "$el" here already IS the <div>,
    so going 'finding' a "child" <div> was not woikin'
    ? */
/* OTHER EARLIER ATTEMPTS : */
    // TestUtils.Simulate.click($el.find('div'));
/* TypeError: Cannot read property '__reactInternalInstance$m2m80yk20hn3v3cmv1a960f6r' of undefined
        at getClosestInstanceFromNode
*/
    // TestUtils.Simulate.click($el.find('div')[0]);
/* TypeError: Cannot read property 'tagName' of undefined
*/
    // TestUtils.Simulate.click($el.find('input')[0]);
/*   TypeError: _this.props.onToggle is not a function
*/

  // OLD:
    // since that is the data, on it
    // expect(spyFunc).toHaveBeenCalledWith(canIUseVarHere);
    // NEW: the func (spy) is dispatch, and it is called with the action object:
    // expect(spyFunc).toHaveBeenCalledWith({
    //   type: 'TOGGLE_TODO',
    //   id: todoData.id, // that is our 199 = ok
    // }); //

/* ** FIREBASE REfactoring *** */
    // We no longer call spy with Action OBJECT.
    // Now we call spy with Action FUNCTION
    //   Need to import actions (above), to invoke that ... startToggleTodo()

    // Define a var for the action, which is now a FUNCT:
    // Send in the ! NEGATE of completed T/F
    var action = actions.startToggleTodo(todoData.id, !todoData.completed);

    expect(spyFunc).toHaveBeenCalledWith(action);

    // Nope, not yet:
    // expect(testTodo.todoData.completed).toBe(false);
    /* TypeError: Cannot read property 'completed' of undefined
    */
  });

});

/* ********
We can IGNORE this.
A Warning, not an Error:

ERROR: 'Warning: Failed form propType: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`. Check the render method of `Todo`.
********
*/
