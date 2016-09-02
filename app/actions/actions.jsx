// ACTION GENERATORS

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText,
  };
};

export var addTodo = (todoText) => {
  return {
    type: 'ADD_TODO',
    todoText,
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
