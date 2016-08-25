var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function () {
    var {todos} = this.props;
    var renderTodos = () => {
      return todos.map( (todo) => {
        return (
          // Need unique key prop (for React)
          // ... spread operator 9:22 Lecture 86
          // spread out all properties on an object...
          <Todo key={todo.id} {...todo}/>
        )
      });
    };
    return (
      <div>
        <p>TodoList test text, etc.</p>
        {renderTodos()}
      </div>
    )
  }
});

module.exports = TodoList;
