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

});
