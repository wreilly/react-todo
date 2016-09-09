var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

// OLD ES5:
// var TodoList = require('TodoList');

// NEW ES6 import, for the export done on TodoList.jsx`
// *UPDATE* Hmm, see below import AddTodo. I think this import TodoList is the connected one, not the regular one.
// OLD: (?) We just do regular from 'TodoList', not the ConnectedTodoList,
// because this is just for testing (?) .... hmm.
import TodoList from 'TodoList';


// OLD ES5:
// var AddTodo = require('AddTodo');

// NEW ES6 import, for the export done on AddTodo.jsx`
// "I'm going to switch that to use import, so we can grab the default, which *is* connected to the Redux store":  Lecture 123 06:00
import AddTodo from 'AddTodo';

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
          /* moment() "gets called as a *function*" and "the unix *method*" which returns our timestamp. */
          createdAt: moment().unix(),
          completedAt: undefined,
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
  /* ******** REACT-REDUX ********** */
  /* handleToggle NO LONGER needed... */
  /* Why? Because w. Redux, this "middle" component (TodoList) can get
          state from the Store on its own.
          Does not rely on it being passed down from parent (TodoApp),
          nor does it pass it further along to child (Todo)
  */
  /*
  handleToggle: function (id) {
    // alert(id);
    var updatedTodos = this.state.todos.map( (todo) => {
      if(todo.id === id) {
        // This is the one changed!
        todo.completed = !todo.completed; // flip the Boolean

        // Let's deal with a change that means "Got completed!"
        // If the above line set "completed" to true (from false), that's it! We're done, and should slap on a timestap.
        // (If somebody was "un-completing" a previously marked completion (wtf?), we "undefine" that cwazy timestamp already.
        todo.completedAt = todo.completed ? moment().unix() : undefined;
        // console.log("WR__ 001 todo.completed AND todo.completedAt : " + todo.completed + " : " + todo.completedAt);
      }
      return todo; // put each todo ("back") into the (new) array, updatedTodos
      // only one of them will have been changed
    });
    this.setState({todos: updatedTodos});
  },
  */
  /* /handleToggle NO LONGER needed */

  render: function () {
    // Now, the todos is what the API brought back
    // from localStorage:
    var {todos, showCompleted, searchText } = this.state;
    // Next, if we' filtering (checkbox; search text),
    // then we use the API to apply that filter:
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return (
      <div>
        <h1 className="page-title">Todo Redux App (TodoApp.jsx)</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
                <TodoSearch onSearch={this.handleSearch} />
  {/* ******** REACT-REDUX ********** */}
  {/* <TodoList /> gets simpler: No need for state data nor toggle functionality / handler to be passed:
  */}
                {/*  <TodoList todos={filteredTodos} onToggle={this.handleToggle} />
                */}
                <TodoList />
                <AddTodo onAddTodo={this.handleAddTodo}/>
            </div>

          </div>
        </div>
      </div>
    )
  }
});

module.exports = TodoApp;
