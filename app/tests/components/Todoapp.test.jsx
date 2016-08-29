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
  });

  it('should toggle completed value when handleToggle called', () => {
    var todoData = {
      id: 11,
      text: 'Test this feature',
      completed: false,
    };
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState( { todos: [todoData]});

    // check todos first item has completed false
    expect(todoApp.state.todos[0].completed).toBe(false); // YEP!

    // call handleToggle with 11
    todoApp.handleToggle(todoApp.state.todos[0].id); // i.e. 11 ! ;o)

    // verify that completed value changed
    expect(todoApp.state.todos[0].completed).toBe(true);

  });

});
