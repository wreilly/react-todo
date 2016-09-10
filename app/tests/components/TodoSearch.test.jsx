var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

// var TodoSearch = require('TodoSearch');
// For testing, the one that is NOT tied to connect
import {TodoSearch} from 'TodoSearch';

describe('TodoSearch', () => {
  it('should exist', () => {
    expect(TodoSearch).toExist();
  });

  // it('should call onSearch with entered input text', () => {
  it('should dispatch SET_SEARCH_TEXT on input change', () => {
    var searchText = "MoochieRedux";
    var action = {
      type: 'SET_SEARCH_TEXT',
      // OLD ES5 way:
      // searchText: searchText,
      // GROOVY NEW ES6 WAY (IF you use "same damned nam" everywhere):
      searchText, // I believe you can get away with that final comma,
    }
    var spy = expect.createSpy();
    // var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);

    // Hmm, for onCHANGE (unlike onSUBMIT), there is
    //      no need for this $el stuff
    // var $el = $(ReactDOM.findDOMNode(todoSearch));
    // TestUtils.Simulate.submit($el.find('form')[0]);

    todoSearch.refs.searchTextref.value = searchText;

    TestUtils.Simulate.change(todoSearch.refs.searchTextref);
    // expect(spy).toHaveBeenCalledWith(false, 'Moochie');
    expect(spy).toHaveBeenCalledWith(action);
  });

  // it('should call onSearch with proper checked value', () => {
  it('should dispatch TOGGLE_SHOW_COMPLETED when checkbox checked', () => {
    var checkValue = true;
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED', // no param
    }
    var spy = expect.createSpy();
    // var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);

    todoSearch.refs.showCompletedref.checked =  checkValue;

    TestUtils.Simulate.change(todoSearch.refs.showCompletedref);
    // expect(spy).toHaveBeenCalledWith(true, '');
    expect(spy).toHaveBeenCalledWith(action);

  });

});
