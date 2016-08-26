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

  it('should, if valid text entered upon onSubmitAddTodo, successfully call onAddTodo prop, points to -> parent handleAddTodo', () => {
    var todoTextGood = 'A Good Message';
    var spyFunctionForText = expect.createSpy();
    // Next line is emulating the PARENT creating the CHILD component:
    var mySpyladenAddTodoForm = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spyFunctionForText} />);
    var $el = $(ReactDOM.findDOMNode(mySpyladenAddTodoForm));
    mySpyladenAddTodoForm.refs.todotextref.value = todoTextGood;
    TestUtils.Simulate.submit($el.find('form')[0]); // first element of the array
    expect(spyFunctionForText).toHaveBeenCalledWith(todoTextGood);
  });

  it('should, if invalid text (no text) entered, upon onSubmitAddTodo, *not* call onAddTodo -> handleAddTodo', () => {
    var todoTextBad = '';
    var spyFunctionForNoText = expect.createSpy();
    var my2ndSpyladenAddTodoForm = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spyFunctionForNoText} />);
    var $el = $(ReactDOM.findDOMNode(my2ndSpyladenAddTodoForm));
    my2ndSpyladenAddTodoForm.refs.todotextref.value = todoTextBad; // EMPTY !
    TestUtils.Simulate.submit($el.find('form')[0]);
    expect(spyFunctionForNoText).toNotHaveBeenCalled();
  });

});
