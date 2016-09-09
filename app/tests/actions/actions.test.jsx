// ACTION GENERATORS
// TESTING

var expect = require('expect');

var actions = require('actions');

describe('Actions', () => {
  it('should generate the search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'This thing is nice.',
    };

    var res = actions. setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate the add Todo action', () => {
    var action = {
      type: 'ADD_TODO',
      text: 'Gots to write more actions.',
// My NON-conventional name -
// To pass this test I had to change from todoText to text (see actions.jsx):
//    todoText: 'Gots to write more actions.',
    };
    // Also changed todoText to text here, on the action:
    var res = actions.addTodo(action.text);
    expect(res).toEqual(action);
  });

  it('should generate the toggleShowCompleted action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED',
      // Q. Hmm, any boolean here ??
      // A. Nope!
    };
    var res = actions.toggleShowCompleted();
    expect(res).toEqual(action);
  });

  it('should generate the toggle todo action (completed, or not)', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 79,
    }
    var res = actions.toggleTodo(action.id); // 79
    expect(res).toEqual(action);
  });

});
