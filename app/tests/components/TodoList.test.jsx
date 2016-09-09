var expect = require('expect');
var React = require('react');
var {Provider} = require('react-redux');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

// ---  STORE BIZ  -------------
/*
Contrast below with equivalent (from TodoApp.test.jsx):
var configureStore = require('configureStore');
...
var store = configureStore.configure();
*/
import {configure} from 'configureStore';
// With above line, you'd use it like so:
//   var store = configure();
// ---  /STORE BIZ  -------------

// OLD ES5:
// var TodoList = require('TodoList');

// NEW ES6 import, for export, export default
// First bit is the var name: 'ConnectedTodoList'
// I guess (?) that is a convention:
// Your component name (TodoList) concatenated onto 'Connected' when you pass it to Connect()(TodoList)
// Then ES6 destructuring lets you get {TodoList} from out of the imported component 'TodoList'.
// whew
// Note: looks like no need for final semi-colon. Oooh.
import ConnectedTodoList, {TodoList} from 'TodoList';

// OLD ES5:
// var Todo = require('Todo');
// NEW ES6:
// Another shot at this: (MBU: My Best Understanding)
// 1. ConnectedTodo is imported from 'Todo'
// 2. {Todo} is also imported from 'Todo'
// 3. 'Todo' is rather plain quoted name of JS module/file, kinda just like require used ('Todo') in parens and quotes.
// # 1 doesn't need the destructuring, because ... ? connect knows about it (?). And yet we do "import" it from 'Todo'. Hmm.
// # 2 does use destructuring, to extract/obtain a rather plain old JS var from out of an imported module, namely 'Todo'
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render one Todo component for each todo item', () => {
    var todos = [
      {
        id: 1,
        text: '1 stuff',
        completed: false,
        completedAt: undefined,
        createdAt: 500,
      }, {
        id: 2,
        text: '2 stuff too',
        completed: false,
        completedAt: undefined,
        createdAt: 5000,
      }
    ];
    var store = configure({
      // init state
      // todos: todos, // ES5
      todos //, // ES6 - same name? you can just do like so.
    });

    // No longer use: Instead we "renderIntoDocument" the containing Provider. Cheers.
    // var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);

    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        {/* DUMKOPPFF!
          IF YOU *MUST* COMMENT INSIDE OF RENDER (!!!!)
          you REALLY have to wrap it in different delimiters ! ! !
        // No need pass in properties; gets data off store
        */}
        <ConnectedTodoList />
      </Provider>
    );

    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0]; // only one element, get it off the array

    // how many components rendered under a component
    // scry - finding all the elements. 'scry' sort of 'search, look, see' (oh brother)
    // Parameters: The parent component (in this case, the List), and then the individual component (of which you expect many) (in this case, the Todo(s))
    // Returns, it would appear, an array

    // OLD plain old Todo:
    // var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);
    // NEW: it's the CONNECTEDTodo ...
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

    expect(todosComponents.length).toBe(todos.length); // e.g. 2 in our test data above.

  });

  it('should render Empty message if no todos', () => {
    var todos = [];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);

    var $el = $(ReactDOM.findDOMNode(todoList));
    expect($el.find('.container__message').length).toBe(1);

  });

});
