var expect = require('expect');

/* We're not rendering React components,
   in our *API* testing!
*/
// var React = require('react');
// var ReactDOM = require('react-dom');
// var TestUtils = require('react-addons-test-utils');
// var $ = require('jquery');


var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
  // Clean up localStorage between tests!
  // Mocha: beforeEach()
  beforeEach( () => {
    localStorage.removeItem('todos');
  })

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () => {

    it('should set valid todos array', () => {
      var todos = [{
        id: 23,
        text: 'test all files',
        completed: false,
      }];
      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));
      // .toEqual - Comparing values, of array of objects
      // Whereas .toBe is pointing to same object
      expect(actualTodos).toEqual(todos);
    });

    it('should not set invalid todos array', () => {
      // e.g. NOT an array!
      var badTodos = {
        a: 'b'
      };
      TodoAPI.setTodos(badTodos);
      // Hmm. Try to set with bad, you "get back" null.
      // Not undefined. Not empty array. null. Okay.
      expect(localStorage.getItem('todos')).toBe(null);
    });

  });

  describe('getTodos', () => {

    it('should return empty array for bad localStorage data', () => {
      // localStorage is empty at beginning of each test
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]); // empty array
    });

    it('should return valid data in localStorage', () => {
      var todos = [{
        id: 23,
        text: 'test all files',
        completed: false,
      }];
      // Right here in testing GET, don't use
      // our own API's SET, but the
      // localStorage API itself to set.
      // Why? You wind up needing to test your own API
      // more than necessary ...
      localStorage.setItem('todos', JSON.stringify(todos));
      // No need to pass any param; it's hard-coded to
      // go get you those 'todos'.
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual(todos);
    });

  });

})
