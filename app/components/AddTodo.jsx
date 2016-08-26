var React = require('react');
var ReactDOM = require('react-dom');

// FORM:
var AddTodo = React.createClass ({
  onSubmitAddTodo: function (event) {
    event.preventDefault();
    // Validate stuff
    var todotext = this.refs.todotextref.value;
    console.log("WR__ this.refs.todotextref.value: ", this.refs.todotextref.value); // yep
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
    }
  },
  render: function () {
    return (
      <div>
        <p>Add a Todo!</p>
        <form onSubmit={this.onSubmitAddTodo}>
          <input type="text" ref="todotextref"/>
          <button className="button" type="submit" />
        </form>
      </div>
    )
  }
});

module.exports = AddTodo;
