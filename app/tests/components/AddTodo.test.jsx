var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

/* *** FIREBASE Refactoring *** */
/* For Firebase, we now have one action generator that returns a FUNCTION (not just action OBJECT)
Ergo, we invoke that action generator method right off the actions.jsx file, so, we import it here:
*/
// var actions = require('actions'); // << Works. ES5
// import actions from 'actions'; // << No.
// This lets us invoke, e.g. actions.startAddTodo
// Give us an object of all those exported vars
//   e.g. startAddTodo  on an object we've named 'actions'  ok.
import * as actions from 'actions'; // << Yep! ES6

/* ***** REDUX REACT ********** */
// Now that we modified exports from AddTodo.jsx,
//   here we shift to destructuring {} to get the
//   plain raw React component off 'AddTodo'
//  If we didn't do {}, then we'd be getting
//   the default export which is the "connect"ed one.
// var AddTodo = require('AddTodo');
var {AddTodo} = require('AddTodo');

// Ready to begin writing 'describe' groupings, and 'it (should)' tests.
// (No declaring this test file as a named component, no export.modules.)

describe('AddTodo', () => {

  it('should exist', () => {
    expect(AddTodo).toExist();
  });


  // OLD Test - used handler:
  // it('should, if valid text entered upon onSubmitAddTodo, successfully call onAddTodo prop, points to -> parent handleAddTodo'
  // NEW: Uses Redux dispatch action:
  it('should dispatch ADD_TODO when valid todo text is entered in form field (and submit clicked)', () => {
/* **** FIREBASE Refactoring **** */
// *UPDATE* Wrong: Not just text anymore, now it's a whole todo passed in
    var todoTextGood = 'A Good Message'; //
// NOPE! We do NOT do a whole "handmade" todo right here.
// We still just trigger the "start" of making a todo with a bit of text! (like before) (see above)
    // var todo_handmade = {
    //   id: 'handmade_id_123',
    //   text: 'HANDMADEVAR Write me a hard-coded Todo inside action test, for Firebase (using null)',
    //   completed: false,
    //   completedAt: null,
    //   createdAt: 1000,
    // };
/* **** FIREBASE Refactoring **** */
/*
** NOTE! Use of THUNK. Our action this time is not returning an OBJECT {}, it is returning a FUNCTION.
We invoke the action 'startAddTodo', and get returned a FUNCTION.
That Function in turn 1) adds to the Todo to the Firebase array, and 2) dispatches the ADD_TODO action which goes to the reducer to add the Todo also to the app state / store.
We now need this FUNCTION instead of mere OBJECT for this reason : we need to execute more logic first, go to Firebase, and *then* go to the reducer. More than just going straight to the reducer, with an action OBJECT (like we were doing before, pre-Firebase).
La.
*/
    // var action = {
    //   type: 'ADD_TODO',
    //   todo: todo_handmade, // << NOPE!
    //   // text: todoTextGood, // WAS:
    // }

    // Kick off startAddTodo with just our bit of text:
    var action = actions.startAddTodo(todoTextGood);

    var spyFunctionForText = expect.createSpy();
    // Next line is emulating the PARENT creating the CHILD component:
    // OLD Non-Redux: (handle event)
    // var mySpyladenAddTodoForm = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spyFunctionForText} />);

    // NEW REACT-REDUX: (dispatch action)

/* WR__ testing: Do I have to call it 'dispatch'?
How about dispatchfoobar99 ??
1. PASSES NPM TEST
2. FAILS NPM START

<< Well, works ok for NPM test
*UPDATE*
But, for NPM START, Error:
 TypeError: dispatchfoobar99 is not a function
 O.K. changing back to dispatch, works OK in NPM START (browser)

In AddTodo.test.jsx, and here in AddTodo.jsx
*/

// dispatchfoobar99 vs. dispatch
    var mySpyladenAddTodoForm = TestUtils.renderIntoDocument(<AddTodo dispatch={spyFunctionForText} />);
    var $el = $(ReactDOM.findDOMNode(mySpyladenAddTodoForm));
/* *** FIREBASE Refactoring *** */
    mySpyladenAddTodoForm.refs.todoTextref.value = todoTextGood; // *UPDATE* Not so: No longer just text. Now whole todo
// NO! :    // mySpyladenAddTodoForm.refs.todoTextref.value = action.todo.text; // all that "handmade" stuff, above...
    TestUtils.Simulate.submit($el.find('form')[0]); // first element of the array
    // OLD: on handle event, calls with string:
    // expect(spyFunctionForText).toHaveBeenCalledWith(todoTextGood);
    // NEW: dispatch action: calls with whole action object:
    expect(spyFunctionForText).toHaveBeenCalledWith(action);
  });

  // OLD:
  // it('should, if invalid text (no text) entered, upon onSubmitAddTodo, *not* call onAddTodo -> handleAddTodo'
  // NEW: (not a lot of change, for this "negative" test...)
  it('should, if invalid text (no text) entered, upon onSubmit - this.handleSubmit, should **not** dispatch ADD_TODO', () => {
    var todoTextBad = '';
    var spyFunctionForNoText = expect.createSpy();
    // OLD: pass Handler
    // var my2ndSpyladenAddTodoForm = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spyFunctionForNoText} />);
    // NEW: pass dispatch instead:
    // This is "the prop name of the function that gets passed in..."
    var my2ndSpyladenAddTodoForm = TestUtils.renderIntoDocument(<AddTodo dispatchfoobar={spyFunctionForNoText} />);
    var $el = $(ReactDOM.findDOMNode(my2ndSpyladenAddTodoForm));
    my2ndSpyladenAddTodoForm.refs.todoTextref.value = todoTextBad; // EMPTY !
    TestUtils.Simulate.submit($el.find('form')[0]);
    expect(spyFunctionForNoText).toNotHaveBeenCalled();
  });

});
