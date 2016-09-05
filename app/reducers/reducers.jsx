var uuid = require('node-uuid');
var moment = require('moment');

// ------------------------------
// Search text
export var searchTextReducer = (state = '', action) => {

  // TESTING DEEP-FREEZE:
  /* action.someNewPropertyAddedToPassedInParameterACTIONInsideReducer = "Updating Passed-In Parameter Is Not Allowed Inside Reducer Pure Function. Deep-Freeze Test Will Catch This And FAIL The Test. Cheers.";
  */
  /* Perfect:
  FAILED TESTS:
    Reducers
      searchTextReducer
        ✖ should set searchText
          Chrome 52.0.2743 (Mac OS X 10.9.5)
        TypeError: Can't add property someNewPropertyAddedToPassedInParameterACTIONInsideReducer, object is not extensible
            at Object.searchTextReducer (eval at 410 (app/tests/reducers/reducers.test.jsx:286:2), <anonymous>:14:69)
  */

  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};


// ------------------------------
// showCompletedReducer default: false; TOGGLE_SHOW_COMPLETED
// default
export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state; // All you need.
// I was missing something - namely that the false came in on state=
      var oppositeCompletedState = true; // just make this thing a boolean
      if (action.completed) { // if it's true make it false
        oppositeCompletedState = false;
      } else { // vice versa
        oppositeCompletedState = true;
      }
      return  oppositeCompletedState; // reverse the Boolean
    default:
      return state;
  }
};


// ------------------------------
// todos plural! array List of todos
export var todosReducer = ( state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuid(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined,
        }
      ];

    // case for TOGGLE_TODO
    // match item of action.id e.g. 1
    // modify - set completed ! oppositeC
    // set commpleted at timestamp or clear
    // HMM. STATE is that passed-in array, of todos
    case 'TOGGLE_TODO':

/* ********* WR__ CODE *********** */
/* */
      var todosHere = [
        ...state,
      ]
      return todosHere.map( (todoHere) => {
        if (todoHere.id === action.id) {
          var wasCompletedTF = todoHere.completed;
          // -- var flipWasCompletedTF = !wasCompletedTF;
          // -- todoHere.completed = !todoHere.completed; // <<< NO!
          // -- if (todoHere.completedAt) {
          // --   // Held some value (timestamp)
          // --   todoHere.completedAt = undefined; // clear it out // <<< NO!
          // -- } else {
          // --   todoHere.completedAt = moment().unix(); // <<< NO!
          // -- }
          return {
              ...todoHere,
              completed: !wasCompletedTF,
              completedAt: !wasCompletedTF ? moment().unix() : undefined ,
// -- NOPE:              completedAt: completed ? moment().unix() : undefined , // << ReferenceError: completed is not defined

// -- WORKS:
              // -- completed: flipWasCompletedTF,
              // -- completedAt: flipWasCompletedTF ? moment().unix() : undefined ,
          };
        } else { // This was missing. Cause of error in test array > 1 element!
          return todoHere;
      }

    });
/* */
/* ********* /WR__ CODE *********** */


/* ********* PERFESSER CODE *********** */
/*
      return state.map( (todo) => {
        if (todo.id === action.id) {
          var nextCompleted = !todo.completed;
          // map lets you modify; return array element, which here is an object:
          return {
            ...todo,
            completed: nextCompleted,
            completedAt: nextCompleted ? moment().unix() : undefined ,
          };
        } else { // This was missing. Cause of error in test array > 1 element!
          return todo;
        }
      });
*/
/* ********* /PERFESSER CODE *********** */

/* WR__ code, WR__ learning:

All right:
1) Yes, we wanted a MAP, not a stinking FOREACH. Good.
2) Yes, used an IF statement to find the one item to toggle. Good.
3) But, inside a MAP, you do NOT update/modify/set properties directly
onto the object/array element/property passed to it. (That's what I did.)
No!
You instead are to RETURN to the array the kind of thing you got
from it (e.g. here an object, holding Todo information).
The values in the object you return MAY be updated/modified. Bon.

      // find todo to toggle, based on id:
      var todosHere = [
        ...state // spread, get the passed-in array contents inside our array here
      ];
      // Use MAP, not FOREACH:
      todosHere.map( (todoHere) => {
        if (todoHere.id === action.id) {
          // for the one toggled:
            // completed to !completed
            // completedAt to timestamp, OR clear
          todoHere.completed = !todoHere.completed; // <<< NO!
          if (todoHere.completedAt) {
            // Held some value (timestamp)
            todoHere.completedAt = undefined; // clear it out // <<< NO!
          } else {
            todoHere.completedAt = moment().unix(); // <<< NO!
          }
          return todoHere; // <<< You THINK you're "returning", but doesn't work this way.
          // You don't "return" the variable you get.
          // You make something new, return that back in its stead.
        } else {
          // wasn't toggled; return it as-is:
          return todoHere; // <<< Sort of superfluous; MAP will just
          //  "return" it if you do nothing to it, here in the MAP function.
        }
      });
*/ // / "Learning"

      // NAH:
      /*
      todosHere.forEach( function (todoHere) {
        if (todoHere.id === action.id) {
          // that's the one

        } else {
          // just put back the unmodified ones

        }
      }
      */
      // No. The MAP already takes care of returning the array, etc.
      // return todosHere; // ? <<< No. Not needed.
    default:
      return state;
  }
};