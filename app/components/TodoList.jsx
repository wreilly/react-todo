var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function () {
    var {todos} = this.props;
    var renderTodos = () => {
      return todos.map( (todo) => {
        return (
          // 1) Need unique key prop (for React)
          // 2) ... spread operator 9:22 Lecture 86
          //        spread out all properties on an object.
          <Todo key={todo.id} {...todo}/>
        )
      });
    };
    return (
      <div>
        <p>I gots to: </p>
        {renderTodos()}
      </div>
    )
  }
});

module.exports = TodoList;
