var React = require('react');
var uuid = require('node-uuid');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      // some dummy data, to begin
      showCompleted: false, // Just not yet complete ones
      searchText: '', // empty string, gets em all
      todos: TodoAPI.getTodos(),
      // todos: [
      //   {
      //     id: uuid(),
      //     text: 'Walk that dog',
      //     completed: false,
      //   }, {
      //     id: uuid(),
      //     text: 'Clean that yard',
      //     completed: true,
      //   }, {
      //     id: uuid(),
      //     text: 'Walk that durned cat moochie hoohah',
      //     completed: true,
      //   }, {
      //     id: uuid(),
      //     text: 'Make a budget (ouch) Moochie',
      //     completed: false,
      //   },
      // ]
    };
  },
  // React Life-cycle. Gets fired after either
  // PROPS *or* STATE changes:
  componentDidUpdate: function () {
    // *ANY* change (to State) (?) we update the todos array
    TodoAPI.setTodos(this.state.todos); 
  },
  handleAddTodo: function (text) {
    // alert('new todo! : ' + text); // needed a '+', not a ',' like works in console.log. hokay

    // Spread operator time ...
    // Put all the existing todos in the same array (again)
    // Node Package for UUID! (will we ever run out of them?) node-uuid
    this.setState({
      todos : [
        ...this.state.todos,
        {
          id: uuid(),
          text: text,
          completed: false,
        }
      ]
    });
  },
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase() // regardless of input, search it up
    });
  },
  handleToggle: function (id) {
    // alert(id);
    var updatedTodos = this.state.todos.map( (todo) => {
      if(todo.id === id) {
        // This is the one changed!
        todo.completed = !todo.completed; // flip the Boolean
      }
      return todo; // put each todo ("back") into the (new) array, updatedTodos
      // only one of them will have been changed
    });
    this.setState({todos: updatedTodos});
  },
  render: function () {
    var {todos} = this.state;
    return (
      <div>
        <TodoSearch onSearch={this.handleSearch} />
        <TodoList todos={todos} onToggle={this.handleToggle} />
        <AddTodo onAddTodo={this.handleAddTodo}/>
      </div>
    )
  }
});

module.exports = TodoApp;
