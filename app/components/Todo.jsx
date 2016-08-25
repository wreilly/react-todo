var React = require('react');

var Todo = React.createClass({
  render: function () {
    var {id, text} = this.props;
    return (
      <div>
        <p>One of many Todo test text, etc.</p>
        <p>{id}. Gots to: {text}</p>
      </div>
    )
  }
});

module.exports = Todo;
