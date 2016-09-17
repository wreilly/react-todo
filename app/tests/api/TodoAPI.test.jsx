var expect = require('expect');

/* We're not rendering React components,
   in our *API* testing!
*/
// var React = require('react');
// var ReactDOM = require('react-dom');
// var TestUtils = require('react-addons-test-utils');
// var $ = require('jquery');


var TodoAPI = require('TodoAPI');

/* *** FIREBASE Refactoring LECTURE 136 *** */
/* Hmm, no more localStorage use, but, the perfesser's code leaves in this (benign, I guess) Mocha 'beforeEach' call, to just make sure it ain't there, I suppose. All right.
*/
describe('TodoAPI', () => {
  // Clean up localStorage between tests!
  // Mocha: beforeEach()
  beforeEach( () => {
    localStorage.removeItem('todos');
  })

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });


/* *** FIREBASE Refactoring LECTURE 136 *** */
// No Longer use LocalStorage - no set/get

  // describe('setTodos', () => {
  //
  //   it('should set valid todos array', () => {
  //     var todos = [{
  //       id: 23,
  //       text: 'test all files',
  //       completed: false,
  //     }];
  //     TodoAPI.setTodos(todos);
  //
  //     var actualTodos = JSON.parse(localStorage.getItem('todos'));
  //     // .toEqual - Comparing values, of array of objects
  //     // Whereas .toBe is pointing to same object
  //     expect(actualTodos).toEqual(todos);
  //   });
  //
  //   it('should not set invalid todos array', () => {
  //     // e.g. NOT an array!
  //     var badTodos = {
  //       a: 'b'
  //     };
  //     TodoAPI.setTodos(badTodos);
  //     // Hmm. Try to set with bad, you "get back" null.
  //     // Not undefined. Not empty array. null. Okay.
  //     expect(localStorage.getItem('todos')).toBe(null);
  //   });
  //
  // });
/* *** /FIREBASE Refactoring LECTURE 136 *** */


/* *** FIREBASE Refactoring LECTURE 136 *** */
  // describe('getTodos', () => {
  //
  //   it('should return empty array for bad localStorage data', () => {
  //     // localStorage is empty at beginning of each test
  //     var actualTodos = TodoAPI.getTodos();
  //     expect(actualTodos).toEqual([]); // empty array
  //   });
  //
  //   it('should return valid data in localStorage', () => {
  //     var todos = [{
  //       id: 23,
  //       text: 'test all files',
  //       completed: false,
  //     }];
  //     // Right here in testing GET, don't use
  //     // our own API's SET, but the
  //     // localStorage API itself to set.
  //     // Why? You wind up needing to test your own API
  //     // more than necessary ...
  //     localStorage.setItem('todos', JSON.stringify(todos));
  //     // No need to pass any param; it's hard-coded to
  //     // go get you those 'todos'.
  //     var actualTodos = TodoAPI.getTodos();
  //     expect(actualTodos).toEqual(todos);
  //   });
  //
  // });
/* *** /FIREBASE Refactoring LECTURE 136 *** */


  describe('filterTodos', () => {
    var todos = [{
        id: 1,
        text: 'Some text to do',
        completed: true,
    }, {
        id: 2,
        text: 'here are some 2nd text to do',
        completed: false,
    }, {
        id: 3,
        text: 'a THIRD text to do',
        completed: true,
    },];

    it('should return all items if showCompleted is true', () => {
      // pass in array, boolean, search text (none in this case):
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');

      // Update: Hah. This .toEqual test is flawed, kids.
      // Especially when you SORT the filtered array, kids. Hah!
      // We're going to show 'em all:
      // NO MO' : expect(filteredTodos).toEqual(todos);

      // And that number ("all") happens to be : 3
      expect(filteredTodos.length).toBe(3); // hmm
    });

    it('should return only completed: false if showCompleted is false', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, '');
      // Of our 3, only 1 has completed: false --
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort uncompleted to top', () => {
      // Get 'em all, to begin: true: show the completed ones!
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      // Properly sorted, the top one is not yet completed: false
      expect(filteredTodos[0].completed).toBe(false);
    });

    /* ******** SEARCH TEXT *********** */
    it('should filter by search text, return all todos if search text is empty string', () => {
      // Search text string is empty. (We also go for "showCompleted" why not)
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3); // got 'em all
    });

    it('should filter by search text, return only those todos that contain the search text string', () => {
      // Search text string is 'some' (matches 2 of 3 items).
      // Note: one has capital 'S'! 'Some'. We're going to lowercase things ...
      // (We also go for "showCompleted" why not, get more items to compare)
      var filteredTodos = TodoAPI.filterTodos(todos, true, 'Some');
      expect(filteredTodos.length).toBe(2); // 2 match 'some'

      var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
      expect(filteredTodos.length).toBe(2); // 2 match 'some'
    });

  });

});
