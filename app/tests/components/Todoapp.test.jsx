var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Todoapp = require('Todoapp');

describe('Todoapp', () => {
  it('should exist', () => {
    expect(Todoapp).toExist();
  });
});
