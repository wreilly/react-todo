var React = require('react');
var ReactDOM = require('react-dom');

// FORM:
var AddTodo = React.createClass ({

   // Udemy:
   handleSubmit: function (event) {
  // WR__ WORKS.   onSubmitAddTodo: function (event) {
    event.preventDefault();
    // Validate stuff
    var todotext = this.refs.todotextref.value;
    // console.log("WR__ this.refs.todotextref.value: ", this.refs.todotextref.value); // yep
    if (todotext.length > 0 ) {
      // Got something at least
      // "Zero out" the input field itself
      this.refs.todotextref.value = '';
      // Call parent func. (per what we did in 05 WeatherForm.jsx)
      //   (not sure how/why it is on props, available right here; hmm)
      // this.props.onS???????ubmit(todotext);
      this.props.onAddTodo(todotext);
    } else {
      // Got nothing, do nothing. ( ? )
      // t.b.d.
      // Put cursor back in that field! :)
      this.refs.todotextref.focus();
    }
  },
  render: function () {
    return (
      <div>
        <p>Add a Todo!</p>
        {/* Udemy: */}
        <form onSubmit={this.handleSubmit}>
{/* WR__ WORKS.       <form onSubmit={this.onSubmitAddTodo}> */}
          <input type="text" ref="todotextref" placeholder="What needs doing."/>
          <button className="button expanded" type="submit" >Add your Todo</button>
        </form>
      </div>
    )
  }
});

module.exports = AddTodo;

/* From NOTES. 2016-08-24
See also similar in Todo.jsx, for onClick

Figured it out:

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
onSubmit - AddTodo FORM
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

Essentially, naming convention to use "on" and "handle" - that is:
- "onX" for the thing (?) that simply captures the triggering of event
- "handleX" for the function that does logic work

So, two instances of this:
1. THE CHILD FORM ITSELF
- onSubmit  << On user clicking form button, calls handleSubmit
- handleSubmit << Within is the logic (validation etc.). (This in turn invokes #2 below - the props's "onAddTodo")

2. THE PARENT FUNCTION TO PROCESS
- onAddTodo  << Upon getting invoked (see above), this "onAddTodo" is really simply a passed-in pointer to connect us to the parent's "handleAddTodo"
- handleAddTodo  << Contains the logic to "handle" what the code should do, in adding a Todo

Examples:

PARENT COMPONENT:
Todoapp.jsx
(or Weather.jsx)
(or Countdown.jsx)


CHILD COMPONENT (WITH THE FORM):
AddTodo.jsx
(or WeatherForm.jsx)
(or CountdownForm.jsx)


Notes:

PARENT:
within createClass():
- function named "handle..."
within render / return / form component:
- prop passed named "on..." = {handle...}

e.g.
var Todoapp = React.createClass({
  ...
  handleAddtodo: function (text) {  <<<<<<<<<<
    .... // e.g. alert etc.
  },
  ...
  render: function () {
    ...
    return (
      ...
      <AddTodo onAddTodo={this.handleAddTodo} /> <<<<<<
    )
  }
})


CHILD:

Note: I ("WR") had followed the earlier examples (Weather; Timer) to arrive at "my" example naming below, re: this form submit stuff.
Today, the Udemy instructor (Andrew Mead), in this video re: Todo, has a new and improved naming convention, which I'll now follow (the use of "handleSubmit").
Cheers.

within createClass():
- (Udemy): function named (e.g.) "handleSubmit"
- (WR):    function named (e.g.) "onSubmitAddTodo"
within handleSubmit (or onSubmitAddTodo):
- call (e.g.) "this.props.onAddTodo(text)"
within render / return / <form >
- (Udemy) onSubmit={this.handleSubmit}
- (WR)    onSubmit={this.onSubmitAddTodo}

e.g.
var AddTodo = React.createClass ({
  ...
    handleSubmit: function (event) { <<<<<<< (Udemy)
//  onSubmitAddTodo: function (event) { <<<<<<< (WR)
      ...
      this.props.onAddTodo(text); <<<<<<<
  },
  ...
  render: function () {
    ...
    return (
      ...
        <form onSubmit={this.handleSubmit}> <<<<<<< (Udemy)
//      <form onSubmit={this.onSubmitAddTodo}> <<<<<<< (WR)
    )
  }
});
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
*/
