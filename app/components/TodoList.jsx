var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function () {
    var {todos} = this.props;
    var renderTodos = () => {

      if (todos.length === 0 ) {
        return (
          <p className="container__message">No todos for you!</p>
        )
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
          <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
        )
      });
    };
    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
});

module.exports = TodoList;
