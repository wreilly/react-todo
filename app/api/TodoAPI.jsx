// https://www.udemy.com/the-complete-react-web-app-developer-course/learn/v4/questions/1441482
// HMM. Going to HEROKU (Lecture 138), hit error,
// solution (for someone else, at least) included
// commenting out this no longer needed jQuery:
// (Was used in handlers, way back when...)
// var $ = require('jquery');


module.exports = {

/* *** FIREBASE Refactoring LECTURE 136 *** */
// NO LONGER LocalStorage. No need for set/get

  // setTodos: function (todos) {
  //   // Got to have an Array coming in!
  //   if ($.isArray(todos)) {
  //     // Must be made a String (Whole array as one thing in LS)
  //     localStorage.setItem('todos', JSON.stringify(todos));
  //
  //     // "todos will be undefined if you didn't send in an array" << ??
  //     // Instructor said above, but I don't quite understand.
  //     // That is, if you didn't send in an array,
  //     // you'll never get to these lines of code.
  //     // You'll never try to setItem. Hmm.
  //
  //     // if successful, you get back your array
  //     return todos;
  //   }
  //   // Hmm. No "else" statement.
  //   // So if not an array, you
  //   // get back null (sez Instructor; see test)
  //   // Not empty array. Not undefined. null. Okay.
  // },
/* *** /FIREBASE Refactoring LECTURE 136 *** */


/* *** FIREBASE Refactoring LECTURE 136 *** */
// NO LONGER LocalStorage. No need for set/get

  // getTodos: function () {
  //   // Arguably kind of "hard-coded" to
  //   // go get you something called: 'todos'
  //   var stringTodos = localStorage.getItem('todos');
  //   var todos = [];
  //   // Gotta have good data! (array, not object!)
  //   try {
  //     /* '[1,2]' string --> [1,2] array */
  //     todos = JSON.parse(stringTodos);
  //   } catch (e) {
  //     // if fails, keep our default empty array []
  //   }
  //
  //   // Ternary operator, cleaner, shorter, than if-else:
  //   return $.isArray(todos) ? todos : [];
  //   // if ($.isArray(todos)) {
  //   //   return todos;
  //   // } else {
  //   //   return [];
  //   // }
  // },
/* *** /FIREBASE Refactoring LECTURE 136 *** */




  filterTodos: function (todos, showCompleted, searchText) {
    // start with all todos ...
    var filteredTodos = todos;

    /* ************** 1. (of 3) SHOW COMPLETED ************** */
    // Filter by showCompleted
    // filter = built-in Array function. Takes callback().
    filteredTodos = filteredTodos.filter( (todo) => {
      // if not completed, we DO want to show it!
      // OR, if the overall showCompleted is set to true,
      // we show 'em all:
      return !todo.completed || showCompleted;

/* William's humble truth table:
showCompleted-01: true
todo-01 completed: true ==> SHOW
todo-02 completed: false ==> SHOW

showCompleted-02: false
todo-03 completed: true ==> NO SHOW
todo-04 completed: false ==> SHOW

return !todo.completed || showCompleted;
01-01   !true ==> false BUT true SO false || true ==> TRUE = SHOW = CORRECT
01-02   !false ==> true AND true SO true || true ==> TRUE = SHOW = CORRECT
02-03   !true ==> false AND false SO false || false ==> FALSE = NO SHOW = CORRECT
02-04   !false ==> true BUT false SO true || false ==> TRUE = SHOW = CORRECT
*/

    });

    /* ************** 2. (of 3)  SEARCHTEXT ************** */
    // (further) Filter by searchText
    filteredTodos = filteredTodos.filter( (todo) => {
      // if search text = '' return all
      // if stext = asdf.lowerCase().indexOf('as') yep; nope -1

      var textLowerCase = todo.text.toLowerCase();
      var searchTextLowerCase = searchText.toLowerCase();

/* **************   WRONG  WAY ****************** */
/*  NOPE. Don't use this if () {} else if () {} construction.
    See below for better expression.

      // if ( searchText === '' ) {
      if ( searchText.length === 0 ) {
        return todo; // just put each one back on the Array
      }
*/

// BAD LOGIC WILHELM !!
// You get "Truthy" for: -1 (when string not found) = BAD, WRONG
// You get "Falsy" for: 0 (when string found at first position) = BAD, WRONG
/* Tsk, tsk:
      else if (
         textLowerCase.indexOf(searchTextLowerCase)
       )
*/
/*
        {
         console.log("WR__ textLowerCase.indexOf(searchTextLowerCase) : " +  textLowerCase + " : " + searchTextLowerCase);
        return todo; // only those that contain that searched text ...
      }
*/
/* **************   /WRONG  WAY ****************** */


/* **************   RIGHT WAY ****************** */
      // indexOf returns -1 if not found
      /* Basically saying:
      1) If we did *not* get any searchText, then the left side is 'Truthy' and therefore the
      whole thing is 'Truthy' and you return true (that is,
      the 'todo' item is going to go on the resultant array)
      2) OR, if we *did* get some searchText, then:
      2.A.) the left side is 'Falsy' (okay), and
      2.B.) the right side is tested for IndexOf:
       - So long as we get something
      greater than -1 (0 is ok, 1 is ok, etc.), then this
      whole thing is also 'Truthy' and this 'todo' goes onto
      the resultant array.
       - If we got -1, then it is 'Falsy' and the whole thing is Falsy - this 'todo' is *not* going on the resultant array
      */
      return searchText.length === 0 || textLowerCase.indexOf(searchTextLowerCase) > -1;
/* **************   /RIGHT WAY ****************** */

    });


    /* ************** 3. (of 3)  SORT ************** */
    // Sort uncompleted todos to top of list
    // Built-in Array method: Sort
    filteredTodos.sort( (a, b) => {
/* How Array Sort Works:
      return -1; // if a should go before b
      return  1; // if b should go before a
      return  0; // if no change; they're equal
*/

      // if (a.completed ==== false && b.completed === true) {
      // Equivalent logic:
      if (!a.completed && b.completed) {
        // We want to put a before b.
        // Uncompleted before Completed
        return -1; // a before b
      } else if (a.completed && !b.completed) {
        return 1;  // b before a
      } else {
        return 0; // no sort. they're equal.
      }
    });


    return filteredTodos;
  }
};
