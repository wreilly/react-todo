var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Todo = require('Todo');

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  // that prop gets called when someone clicks ...
  it('should call onToggle prop with the id, on click', () => {
    var canIUseVarHere = 199;
    var todoData = {
      id: canIUseVarHere,
      text: "Write a todo test",
      completed: true,
    }
    // TODO next ...
    // https://facebook.github.io/react/docs/test-utils.html

    var spyFunc = expect.createSpy();
    // hmm, what about the KEY ? (see TodoList): key={todoData.id} Not used in the video 94 8:00 or so...
    var testTodo = TestUtils.renderIntoDocument(<Todo onToggle={spyFunc} {...todoData} />);

    /* ******* HOW DOES ZIS WORK ?? ***** */
    //  video 94 ca. 8:34
    // "access the jQuery selector" ... and "pull out the root element" ....

    // CORRECT: hmm, the sought-after node'll be the one (and only) with that unique id we like: 199, ya?
    // NAH:     or, do I gotta specify "it's the 199 one, friends," right here in the test-biz? hmmph.
    var $el = $(ReactDOM.findDOMNode(testTodo));

    TestUtils.Simulate.click($el[0]); // ROOT ELEMENT of the jQuery selector = the <div>
    /* FINALLY ! I guess the "$el" here already IS the <div>,
    so going 'finding' a "child" <div> was not woikin'
    ? */
/* OTHER EARLIER ATTEMPTS : */
    // TestUtils.Simulate.click($el.find('div'));
/* TypeError: Cannot read property '__reactInternalInstance$m2m80yk20hn3v3cmv1a960f6r' of undefined
        at getClosestInstanceFromNode
*/
    // TestUtils.Simulate.click($el.find('div')[0]);
/* TypeError: Cannot read property 'tagName' of undefined
*/
    // TestUtils.Simulate.click($el.find('input')[0]);
/*   TypeError: _this.props.onToggle is not a function
*/


    expect(spyFunc).toHaveBeenCalledWith(canIUseVarHere); // since that is the data, on it
    // Nope, not yet:
    // expect(testTodo.todoData.completed).toBe(false);
    /* TypeError: Cannot read property 'completed' of undefined
    */
  });

});

/* ********
We can IGNORE this.
A Warning, not an Error:

ERROR: 'Warning: Failed form propType: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`. Check the render method of `Todo`.
********
*/
