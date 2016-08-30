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
    // Parameters: The parent component (in this case, the List), and then the individual component (of which you expect many) (in this case, the Todo(s))
    // Returns, it would appear, an array
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

    expect(todosComponents.length).toBe(todos.length);

  });

  it('should render Empty message if no todos', () => {
    var todos = [];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);

    var $el = $(ReactDOM.findDOMNode(todoList));
    expect($el.find('.container__message').length).toBe(1);

  });

});
