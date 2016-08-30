var $ = require('jquery');


module.exports = {
  setTodos: function (todos) {
    // Got to have an Array coming in!
    if ($.isArray(todos)) {
      // Must be made a String (Whole array as one thing in LS)
      localStorage.setItem('todos', JSON.stringify(todos));

      // "todos will be undefined if you didn't send in an array" << ??
      // Instructor said above, but I don't quite understand.
      // That is, if you didn't send in an array,
      // you'll never get to these lines of code.
      // You'll never try to setItem. Hmm.

      // if successful, you get back your array
      return todos;
    }
    // Hmm. No "else" statement.
    // So if not an array, you
    // get back null (sez Instructor; see test)
    // Not empty array. Not undefined. null. Okay.
  },
  getTodos: function () {
    // Arguably kind of "hard-coded" to
    // go get you something called: 'todos'
    var stringTodos = localStorage.getItem('todos');
    var todos = [];
    // Gotta have good data! (array, not object!)
    try {
      /* '[1,2]' string --> [1,2] array */
      todos = JSON.parse(stringTodos);
    } catch (e) {
      // if fails, keep our default empty array []
    }

    // Ternary operator, cleaner, shorter, than if-else:
    return $.isArray(todos) ? todos : [];
    // if ($.isArray(todos)) {
    //   return todos;
    // } else {
    //   return [];
    // }
  }
};
