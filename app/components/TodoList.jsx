var React = require('react');
// Redux connect: children indicate which data from store they want
var {connect} = require('react-redux');
// OLD: ES5
// var Todo = require('Todo');
// NEW ES6: ? Is this getting the connect(ed) Todo? YES. Or plain old? NO. To get plain old, use {destructuring}.
// Hmm. See also the test files TodoList.test.jsx, TodoApp.test.jsx. Hmm.
// "We don't use destructuring here because that would only give us access to the (plain old, pure React) Todo component, and we only use that for testing; here in the real app component (vs. testing) we want the connected Todo component."
import Todo from 'Todo';

// As in Todo.jsx, we export the
// plain old original regular React component: (but the export default (below) is for the Reduxed connected component.)
export var TodoList = React.createClass({
  render: function () {
    var {todos} = this.props;
    var renderTodos = () => {

      if (todos.length === 0 ) {
        return (
          <p className="container__message">No todos for you!</p>
        );
      }

      return todos.map( (todo) => {
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
export default connect(
  (state) => {
    return {
      todos: state.todos,
    };
  }
)(TodoList);
