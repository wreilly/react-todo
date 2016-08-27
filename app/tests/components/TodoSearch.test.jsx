var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
  it('should exist', () => {
    expect(TodoSearch).toExist();
  });

  it('should call onSearch with entered input text', () => {
    var searchText = "Moochie";
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);

    // Hmm, for onCHANGE (unlike onSUBMIT), there is
    //      no need for this $el stuff
    // var $el = $(ReactDOM.findDOMNode(todoSearch));
    // TestUtils.Simulate.submit($el.find('form')[0]);

    todoSearch.refs.searchTextref.value = searchText;

    TestUtils.Simulate.change(todoSearch.refs.searchTextref);
    expect(spy).toHaveBeenCalledWith(false, 'Moochie');
  });

  it('should call onSearch with proper checked value', () => {
    var checkValue = true;
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);

    todoSearch.refs.showCompletedref.checked =  checkValue;

    TestUtils.Simulate.change(todoSearch.refs.showCompletedref);
    expect(spy).toHaveBeenCalledWith(true, '');

  });

});
