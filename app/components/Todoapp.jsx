var React = require('react');
var TodoList = require('TodoList');

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
  render: function () {
    var {todos} = this.state;
    return (
      <div>
        <TodoList todos={todos} />
      </div>
    )
  }
});

module.exports = Todoapp;
