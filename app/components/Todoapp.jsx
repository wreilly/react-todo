var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');

var Todoapp = React.createClass({
  getInitialState: function() {
    return {
      // some dummy data, to begin
      todos: [
        {
          id: 1,
          text: 'Walk that dog'
        }, {
          id: 2,
          text: 'Clean that yard'
        }, {
          id: 3,
          text: 'Walk that durned cat'
        }, {
          id: 4,
          text: 'Make a budget (ouch)'
        },
      ]
    };
  },
  handleAddTodo: function (text) {
    alert('new todo! : ' + text); // needed a '+', not a ',' like works in console.log. hokay
  },
  render: function () {
    var {todos} = this.state;
    return (
      <div>
        <TodoList todos={todos} />
        <AddTodo onAddTodo={this.handleAddTodo}/>
      </div>
    )
  }
});

module.exports = Todoapp;
