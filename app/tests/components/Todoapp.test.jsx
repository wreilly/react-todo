var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var configureStore = require('configureStore');


/* 14:20 :Lecture 142
Here, we shift from ES5 Require to ES6 Import.
We use ES6 destructuring to get the PLAIN OLD unConnected component, the regular 'var export' one:
*/
// OLD ES5:
// var TodoApp = require('TodoApp');
// NEW ES6:
import {TodoApp} from 'TodoApp';



// OLD ES5
// var TodoList = require('TodoList');
// NEW ES6 import for export
// As on TodoApp.jsx, this is just the plain regular TodoList component, not the ConnectedTodoList component. Cheers.
/* UPDATE*
Hey! See above re: ES6 ddestructuring to get the Plain Old UnConnected component.
I think my comment above is wrong.
The line of code below (which matches the Instructor code) is NOT getting the Plain Old UnConnected TodoList component.
It is getting the Connected TodoList component.
O.K. - I guess here in the TEST file for the TodoApp component, the import for THAT component specifically NEEDS to be the UnConnected one.
While the import of OTHER - RELATED Components herein (E.g. TodoList) does NOT need to be (kn fact should NOT be) the UnConnected one. It shold be the Connected one! Bon.
My Best Understanding.
*/
import TodoList from 'TodoList';

describe('TodoApp', () => {
  it('should exist', () => {
    expect(TodoApp).toExist();
  });

  it('should render TodoList', () => {
    // create a store...
    // give it to a mocked provider,
    var store = configureStore.configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );


// https://facebook.github.io/react/docs/test-utils.html#scryrenderedcomponentswithtype
    var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
    var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

    expect(todoList.length).toEqual(1);
  });

  /* ******* REACT-REDUX ************* */
  /* COMMENT OUT tests here in TodoApp.
  This component will not have the tests, in future.

    it('should add Todo to todos state on handleAddTodo', () => {
    var todoText = "test text stuff";
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />); // root object

    todoApp.setState({ todos: [] }); // empty array to start
    todoApp.handleAddTodo(todoText);

    expect(todoApp.state.todos[0].text).toBe(todoText);

    // Expect createdAt to be set to a number
    // Michael Jackson expect
    // https://github.com/mjackson/expect
    // Asserts the typeof the given object is string.
    // e.g. expect(2).toBeA('number')
    expect(todoApp.state.todos[0].createdAt).toBeA('number');

  });
  */
  /* ******* /REACT-REDUX ************* */


/* ******* REACT-REDUX ************* */
/* COMMENT OUT test for TOGGLE ----

  // From false (not completed) to true (completed), completedAt set to a number. woot.
  it('should toggle completed value to TRUE - COMPLETED when handleToggle called', () => {
    var todoData = {
      id: 11,
      text: 'Test this feature',
      completed: false,
      createdAt: 0,
      completedAt: undefined,
    };
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState( { todos: [todoData]});

    // check todos first item (in the bit of hard-coded data above) has indeed completed false
    expect(todoApp.state.todos[0].completed).toBe(false); // YEP!

    // call handleToggle with 11
    // I sorta self-referenced the sample data, to make my call. Bit fudgy. But hey.
    todoApp.handleToggle(todoApp.state.todos[0].id); // i.e. 11 ! ;o)

    // verify that completed value changed (since it was hard-coded false, oughta now be true)
    expect(todoApp.state.todos[0].completed).toBe(true);

    // expect completedAt to be a number
    expect(todoApp.state.todos[0].completedAt).toBeA('number');

  });

  */
  /* ******* /REACT-REDUX ************* */




  /* ******* REACT-REDUX ************* */
  /* COMMENT OUT tests here in TodoApp.
  This component will not have the tests, in future.

  // From true (completed) to false (not completed (solly!)), completedAt gets removed
// timestamp craziness: 1472591868
// More or less 5:15 pm Aug 30, 2016
// So this: 1472419068
// 60*60*48 = 172800 = 2 days
// 1472591868 - 172800 = 1472419068
// Or 5:15 or so Aug 28, 2016
  it('should toggle completed value BACK TO FALSE - NOT COMPLETED when handleToggle called', () => {
    var todoData = {
      id: 11,
      text: 'Test this feature',
      completed: true,
      createdAt: 1472419068, // Aug 28
      completedAt: 1472591868, // Aug 30, yah?
    };
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState( { todos: [todoData]});

    // check todos first item (in the bit of hard-coded data above) has indeed completed false
    expect(todoApp.state.todos[0].completed).toBe(true); // YEP!

    // call handleToggle with 11
    todoApp.handleToggle(todoApp.state.todos[0].id); // i.e. 11 ! ;o)

    // verify that completed value changed (since it was hard-coded true, oughta now be false)
    expect(todoApp.state.todos[0].completed).toBe(false);

    // expect completedAt to be G-O-N-E. (removed) "undefined"
    expect(todoApp.state.todos[0].completedAt).toNotExist();

  });
  */
  /* ******* /REACT-REDUX ************* */



});
