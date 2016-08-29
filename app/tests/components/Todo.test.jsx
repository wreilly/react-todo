var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Todo = require('Todo');

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  // that prop gets called when someone clicks ...
  it('should call onToggle prop with the id, on click', () => {
    var todoData = {
      id: 199,
      text: "Write a todo test",
      completed: true,
    }
    // TODO next ...
  });

});
