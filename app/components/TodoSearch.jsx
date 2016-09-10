var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');



// Listen for changes (Vs. submit a form)
// plain , for testing
export var TodoSearch = React.createClass({

/* ******** REACT-REDUX *********** */
/*
  // OLD (pre-REDUX) Used Handler:
  // ALSO Note that Handler here passed BOTH: showCompleted AND searchText.
  // But now our Actions have one for each. We'll split those up...
  handleSearch: function () {
    // for onChange: no "event", no "preventDefault" needed
    var showCompleted = this.refs.showCompletedref.checked; // T/F
    var searchText = this.refs.searchTextref.value;

    // onSearch is passed down from the parent
    this.props.onSearch(showCompleted, searchText);
  },
*/
/* ******** /REACT-REDUX *********** */
/* ******** REACT-REDUX *********** */
/*
// OLD: Calls the Handler:
    render: function () {
    return (
      <div className="container__header">
        <div>
          <input type="search" ref="searchTextref" placeholder="Search your Todos" onChange={this.handleSearch} />
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompletedref" onChange={this.handleSearch} />
            Show Completed?
          </label>
        </div>
      </div>
    )
  }
  */
  /* ******** /REACT-REDUX *********** */

  render: function () {

    var {dispatch, showCompleted, searchText} = this.props;
    // Below:
    // I. SEARCHTEXT INPUT
    // A. value={searchText} . Hmm, passed in, from var here,
    //   gotten from props. We can now "pass this in before the app even gets started" Lecture 124 04:30 (?)
    // B. onChange={}  we remove the props handleSearch handler.
    //   And we insert right inline anonymous arrow function, that
    //   uses dispatch action ...
    // II. SEARCHCOMPLETED CHECKBOX
    // C. checked={searchCompleted} . default value Hmm, passed in, from var here,
    //   gotten from props. We can now "pass this in before the app even gets started" Lecture 124 04:30 (?)
    // D. onChange={}  Here too we remove the same props handleSearch handler.
    //   And we then insert right inline anonymous arrow
    //   function, that uses dispatch action ... No param, just toggles whatever current Boolean is

    return (
      <div className="container__header">
        <div>
          <input type="search" ref="searchTextref" placeholder="Search your Todos"
            value={searchText} onChange={ () => {
              var searchText = this.refs.searchTextref.value;
              dispatch(actions.setSearchText(searchText));
            }} />
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompletedref" checked={showCompleted} onChange={ () => {
                dispatch(actions.toggleShowCompleted());
              }} />
            Show Completed?
          </label>
        </div>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {
      showCompleted: state.showCompleted,
      searhText: state.searchText,
    }
  }
)(TodoSearch);
// module.exports = TodoSearch;
