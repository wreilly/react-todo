var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var AddTodo = require('AddTodo');

// Ready to begin writing 'describe' groupings, and 'it (should)' tests.
// (No declaring this test file as a named component, no export.modules.)

describe('AddTodo', () => {

  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should, if valid text entered upon onSubmitAddTodo, successfully call onAddTodo -> handleAddTodo', () => {
    var spyFunctionForText = expect.createSpy();
    // Next line is emulating the PARENT creating the CHILD component:
    var mySpyladenAddTodoForm = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spyFunctionForText} />);
    var $el = $(ReactDOM.findDOMNode(mySpyladenAddTodoForm));
    mySpyladenAddTodoForm.refs.todotextref.value = "Good message!";
    TestUtils.Simulate.submit($el.find('form')[0]);
    expect(spyFunctionForText).toHaveBeenCalledWith("Good message!");
  });

  it('should, if invalid text (no text) entered, upon onSubmitAddTodo, *not* call onAddTodo -> handleAddTodo', () => {
    var spyFunctionForNoText = expect.createSpy();
    var my2ndSpyladenAddTodoForm = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spyFunctionForNoText} />);
    var $el = $(ReactDOM.findDOMNode(my2ndSpyladenAddTodoForm));
    my2ndSpyladenAddTodoForm.refs.todotextref.value = ""; // EMPTY !
    TestUtils.Simulate.submit($el.find('form')[0]);
    expect(spyFunctionForNoText).toNotHaveBeenCalled();
  });

});
