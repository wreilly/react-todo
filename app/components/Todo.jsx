var React = require('react');
var {connect} = require('react-redux');
var moment = require('moment');

var actions = require('actions');

// OLD:
// var Todo = React.createClass({
// NEW: "export"
// Plain Old Original React Component:
// We keep it around - Will be used only for Tests...
export var Todo = React.createClass({
  /* REACT-REDUX */
  // ADD dispatch from this.props.
  render: function () {
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;

    // Style stuff:
    // Set the style depending on status
    var todoClassName = completed ? 'todo todo-completed' : 'todo';

    var renderDate = () => {
      // Default
      var message = 'Created ';
      var timestamp = createdAt;

      // If it's completed, though...
      if (completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm A');
    };
    return (
      <div className={todoClassName} onClick={ () => {
        {/* ******** REACT-REDUX ********** */}
        {/*  As in TodoList, remove onToggle - it's no longer passed down.
          this.props.onToggle(id);

          Instead, we invoke the toggleTodo directly off the actions
          Hmm, what is it makes them (the actions) available here, other than simply having required them in ?? (?)

          Update:
         */}
         dispatch(actions.toggleTodo(id));

        }}>
{/* We'll remove the now veddy long 'id'
  (User doesn't need to see it, know of it)
e.g. node--uuid: 0bd2b527-0b5e-4603-8b02-4518c39cce7b
         <p>{id}. {text}</p> */}
         <div>
           <input type="checkbox" checked={completed} />
         </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    )
  }
});



// module.exports = Todo;
// No state needed to be obtained off the store, for Todo.
// (Hmm. Not sure I understand oh well.)

// OLD:
// module.exports = connect()(Todo);
// NEW:
export default connect()(Todo);

/* From NOTES. 2016-08-29
See also similar in AddTodo.jsx, for onSubmit

Figured it out: (revisited)

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
onClick - TOGGLE 'Completed' checkbox
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

(As before) Essentially, naming convention to use "on" and "handle" - that is:
- "onX" for the thing (?) that simply captures the triggering of event
- "handleX" for the function that does logic work

So, an instance of this, in three parts:
1. THE CHILD - EVENT HANDLER
- onClick  << On user clicking "Completed" checkbox, calls props.onToggle

2. INTERMEDIATE PARENT (if you like)
("Ancestor")
Just passes along the prop ...
onToggle = onToggle
(no use of "handle" here in the intermediate step)

3. TOP-MOST PARENT FUNCTION TO PROCESS
- onToggle  << Upon getting invoked (see above), this "onToggle" is really simply a passed-in pointer to connect us to the parent's "handleToggle"
- handleToggle  << Contains the logic to "handle" what the code should do, in toggling Completed (on or off)


TOP-MOST PARENT COMPONENT:
Todoapp.jsx

INTERMEDIATE PARENT COMPONENT:
TodoList.jsx

CHILD COMPONENT:
Todo.jsx


Notes:

TOP-MOST PARENT:
Within createClass():
- function named "handle..."
Within render / return / TodoList component:
- prop passed named "on..." = {handle...}

e.g.
var Todoapp = React.createClass({
  ...
  handleToggle: function (id) {  <<<<<<<<<<
    .... // e.g. alert(id) etc.
  },
  ...
  render: function () {
    ...
    return (
      ...
      <TodoList onToggle={this.handleToggle} /> <<<<<<
    )
  }
})

INTERMEDIATE PARENT:
Within render / return / Todo component:
- prop passed named "on..." = {on...}

e.g.
  ...
  render: function () {
    ...
    return (
      ...
      <Todo onToggle={this.props.onToggle} /> <<<<<<
    )
  }
})


CHILD:
within render / return / <div>
- onClick={this.props.onToggle}

e.g.
  render: function () {
    ...
    return (
      ...
        <div onClick={this.props.onToggle}>
    )
  }
});
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/
