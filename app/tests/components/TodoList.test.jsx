var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one Todo component for each todo item', () => {
    var todos = [
      {
        id: 1,
        text: '1 stuff'
      }, {
        id: 2,
        text: '2 stuff too'
      }
    ];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
    // how many components rendered under a component
    // scry - finding all the elements. 'scry' sort of 'search, look, see' (oh brother)
    // Parameters: The parent component (here, list), and then the individual component (of which you expect many) (here, Todo)
    // Returns, it would appear, an array
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

    expect(todosComponents.length).toBe(todos.length);

  });

});
