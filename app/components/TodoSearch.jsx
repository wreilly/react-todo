var React = require('react');


// Listen for changes (Vs. submit a form)
var TodoSearch = React.createClass({
  handleSearch: function () {
    // for onChange: no "event", no "preventDefault" needed
    var showCompleted = this.refs.showCompletedref.checked; // T/F
    var searchText = this.refs.searchTextref.value;

    // onSearch is passed down from the parent
    this.props.onSearch(showCompleted, searchText);
  },
  render: function () {
    return (
      <div>
        <div>
          <input type="search" ref="searchTextref" placeholder="Search your Todos" onChange={this.handleSearch} />
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompletedref" onChange={this.handleSearch} />
            Shall we show the completed ones?
          </label>
        </div>
      </div>
    )
  }
});

module.exports = TodoSearch;
