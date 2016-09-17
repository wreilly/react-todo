var React = require('react');
// Redux connect: children indicate which data from store they want
var {connect} = require('react-redux');
// OLD: ES5
// var Todo = require('Todo');
// NEW ES6: ? Is this getting the connect(ed) Todo? YES. Or plain old? NO. To get plain old, use {destructuring}.
// Hmm. See also the test files TodoList.test.jsx, TodoApp.test.jsx. Hmm.
// "We don't use destructuring here because that would only give us access to the (plain old, pure React) Todo component, and we only use that for testing; here in the real app component (vs. testing) we want the connected Todo component."
import Todo from 'Todo';

/* REDUX refactoring of TodoSearch. Lecture 124 11:48
We had not needed TodoAPI until now, here on the TodoList.jsx
We just obtained the unfiltered todos array.
But now we want to get the showCompleted state and the searchText too.
*/
var TodoAPI = require('TodoAPI');

// As in Todo.jsx, we export the
// plain old original regular React component: (but the export default (below) is for the Reduxed connected component.)
export var TodoList = React.createClass({
  render: function () {

    // var {todos} = this.props;
        // REDUX Refactor TodoSearch:
        // We used to only get array todos, now we get all 3 properties


    var {todos, showCompleted, searchText} = this.props;
    var renderTodos = () => {

      /* *** INSTRUCTOR CODE SOLUTION *** */
      // LECTURE 137 10:20
      var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

      /* *** CRAZY WILLIAM CODE SOLUTION *** */
      // NOT ELEGANT.
      var allTodosCompleted = false; // default of nope. some are still goin'
      var notCompletedTodos = []; // empty array to hold any not completed (if any!)

      notCompletedTodos = todos.filter( (aTodo) => {
        return !aTodo.completed; // If you're not completed, we wanna know about it
      });

      // If after all that, the empty array is STILL empty, well,
      //    they are ALL completed!
      if (notCompletedTodos.length === 0) {
        allTodosCompleted = true;
      }


      /* *** INSTRUCTOR CODE SOLUTION *** */
      // LECTURE 137 10:20
      // That's all you need to do! Put the whole filter bit ABOVE.
      // If the filteredTodos gets down to no entries, we put up the "no todos!" msg.
      // (Even though there may *Be* entries, but they're Completed! - Get it?)
      if ( filteredTodos.length === 0) {

      /* *** CRAZY WILLIAM CODE SOLUTION *** */
      // NOT ELEGANT.
      // If ALL are completed, we now show you the "no todos for you" msg. :)
      // One more bit: show "No todos, kid" msg. ONLY IF the overall "showCompleted" is set to FALSE. Thank you.
      // if ( (todos.length === 0) || ( allTodosCompleted && !showCompleted ) ) {
        return (
          <p className="container__message">No wr__todos for you!</p>
        );
      }


      // return todos.map( (todo) => {
      // REDUX Refactor TodoSearch. Call the API and its filter,
      //   to get the application of those 2 props: showCompleted and searchText!

      /* *** INSTRUCTOR CODE SOLUTION *** */
      // LECTURE 137 10:20 ...
      // return TodoAPI.filterTodos(todos, showCompleted, searchText).map( (todo) => {
      return filteredTodos.map( (todo) => {
        return (
          // 1) Need unique key prop (for React)
          // 2) ... spread operator 9:22 Lecture 86
          //        spread out all properties on an object.
          // Q. IS the following CORRECT? (I think it is) :
          // So for our 'todo' array element,
          // that would be:
          // - todo.id e.g. id={todo.id}
          // - todo.text e.g. text={todo.text}
          // - todo.completed e.g. completed = {todo.completed}

          /* onToggle - passed down from TodoApp.jsx here to TodoList.jsx. Next, going to pass down further to each Todo.jsx */
          /* ******** REACT-REDUX ********** */
          /* Remove the onToggle hander - no longer passed down:
            <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
           */
            <Todo key={todo.id} {...todo} />
        );
      });
    };
    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
});

// Connect to the TodoList  Minute 6:25 ~
// module.exports = TodoList;


// OLD:
/* module.exports = connect(
  // Just get state we need
  (state) => {
    return {
      todos: state.todos,
    };
  }
)(TodoList);
*/
// NEW: (ES6)
// Was: only todos.
// Now REDUX Refactor of TodoSearch, we want all 3 properties of the state: todos, showCompleted, searchText. Just return state.
// AH CRAP. See Below.
// This now works O.K.
export default connect(
  (state) => {
    return {
      todos: state.todos,
      showCompleted: state.showCompleted,
      searchText: state.searchText,
    };
  }
)(TodoList);


/* ********** */
/*
OY! !! !!!
ME GOOF UP. (above)
I put return of an object:
return {

}
and inside that object instead of key: value object properties, I put a whole object as a key
return {
  state,
}
And I did it in coolio ES6 way. Woulda been in ES5:
return {
  state: state,
}
But, methinks you don't want a whole object there, just a scalar, right? right??
OOF.
See the perfesser's UDEMY Code below.
One-liner - just return state; with a semi-colon to finish.
OOF TWO.

WR__:
===========================
 export default connect(
   (state) => {
     // return {
     //   todos: state.todos,
     // };
     return {
       state, // <<< <<< !!! WRONGWRONGWRONG
     };
   }
 )(TodoList);
 ===========================


UDEMY:
===========================
export default connect(
  (state) => {
    return state;
  }
)(TodoList);
===========================
*/
/* /************ */
