var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');

var Todoapp = React.createClass({
  getInitialState: function() {
    return {
      // some dummy data, to begin
      showCompleted: false, // Just not yet complete ones
      searchText: '', // empty string, gets em all
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
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase() // regardless of input, search it up
    });
  },
  render: function () {
    var {todos} = this.state;
    return (
      <div>
        <TodoSearch onSearch={this.handleSearch} />
        <TodoList todos={todos} />
        <AddTodo onAddTodo={this.handleAddTodo}/>
      </div>
    )
  }
});

module.exports = Todoapp;
