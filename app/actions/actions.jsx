// ACTION GENERATORS

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText,
  };
};

// PERFESSER CODE: Works.
// Note: Because this follows the naming convention of 'text',
// then Yes you can use the ES6 shorthand of 'text' in the return.
// But see below the NON-conventional WR__ CODE example ...
/*
export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text,
  };
};
*/

// WR__ CODE:
// I chose to call it 'todoText' (why not). NON-conventional me.
// But then I cannot use th ES6 thing: text,
// No sir, I gotta do: text: todoText,
export var addTodo = (todoText) => {
  return {
    type: 'ADD_TODO',
    text: todoText, // Gots to do this ES5 way
    // todoText, // << NOPE ES6 shortcut - Was not working.
  };
};

// toggleShowCompleted - no params
// TOGGLE_SHOW_COMPLETED

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
    // Q. Hmm, any boolean here ??
    // A. Nope!
  };
};

// toggleTodo(id) - one param
// TOGGLE_TODO

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};
