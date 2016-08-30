var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
  it('should exist', () => {
    expect(TodoApp).toExist();
  });

  it('should add Todo to todos state on handleAddTodo', () => {
    var todoText = "test text stuff";
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />); // root object

    todoApp.setState({ todos: [] }); // empty array to start
    todoApp.handleAddTodo(todoText);

    expect(todoApp.state.todos[0].text).toBe(todoText);

    // Expect createdAt to be set to a number
    // Michael Jackson expect
    // https://github.com/mjackson/expect
    // Asserts the typeof the given object is string.
    // e.g. expect(2).toBeA('number')
    expect(todoApp.state.todos[0].createdAt).toBeA('number');

  });

  // From false (not completed) to true (completed), completedAt set to a number. woot.
  it('should toggle completed value to TRUE - COMPLETED when handleToggle called', () => {
    var todoData = {
      id: 11,
      text: 'Test this feature',
      completed: false,
      createdAt: 0,
      completedAt: undefined,
    };
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState( { todos: [todoData]});

    // check todos first item (in the bit of hard-coded data above) has indeed completed false
    expect(todoApp.state.todos[0].completed).toBe(false); // YEP!

    // call handleToggle with 11
    // I sorta self-referenced the sample data, to make my call. Bit fudgy. But hey.
    todoApp.handleToggle(todoApp.state.todos[0].id); // i.e. 11 ! ;o)

    // verify that completed value changed (since it was hard-coded false, oughta now be true)
    expect(todoApp.state.todos[0].completed).toBe(true);

    // expect completedAt to be a number
    expect(todoApp.state.todos[0].completedAt).toBeA('number');

  });

// From true (completed) to false (not completed (solly!)), completedAt gets removed
// timestamp craziness: 1472591868
// More or less 5:15 pm Aug 30, 2016
// So this: 1472419068
// 60*60*48 = 172800 = 2 days
// 1472591868 - 172800 = 1472419068
// Or 5:15 or so Aug 28, 2016
  it('should toggle completed value BACK TO FALSE - NOT COMPLETED when handleToggle called', () => {
    var todoData = {
      id: 11,
      text: 'Test this feature',
      completed: true,
      createdAt: 1472419068, // Aug 28
      completedAt: 1472591868, // Aug 30, yah?
    };
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState( { todos: [todoData]});

    // check todos first item (in the bit of hard-coded data above) has indeed completed false
    expect(todoApp.state.todos[0].completed).toBe(true); // YEP!

    // call handleToggle with 11
    todoApp.handleToggle(todoApp.state.todos[0].id); // i.e. 11 ! ;o)

    // verify that completed value changed (since it was hard-coded true, oughta now be false)
    expect(todoApp.state.todos[0].completed).toBe(false);

    // expect completedAt to be G-O-N-E. (removed) "undefined"
    expect(todoApp.state.todos[0].completedAt).toNotExist();

  });


});
