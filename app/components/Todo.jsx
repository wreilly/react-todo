var React = require('react');

var Todo = React.createClass({
  render: function () {
    var {id, text, completed} = this.props;
    return (
      <div onClick={ () => {
          this.props.onToggle(id);
        }}>
{/* We'll remove the now veddy long 'id'
e.g. node--uuid: 0bd2b527-0b5e-4603-8b02-4518c39cce7b
         <p>{id}. {text}</p> */}
        <input type="checkbox" checked={completed} />
        <p>{text}</p>
      </div>
    )
  }
});

module.exports = Todo;
