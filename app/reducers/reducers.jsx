var uuid = require('node-uuid');
var moment = require('moment');

/* *** WR__ IDEA *** */
// ------------------------------
//  stateReducer - Logout!
// "Slice" of state is? - Da Whole Damned Fing
// Need to alter both todos and auth, on logout
// Wonder is there some downside to this approach.
// We shall see ...

/*
Hah! Busted. See note over in configureStore.jsx
*/
// NO. NO DAMNED 'stateReducer'. Busted. Oy!
// export var stateReducer = ( state = {}, action ) => {
//   switch (expression) {
//     case 'LOGOUT':
//       // WR__ CODE! (see above comments)
//       // return {
//       //   ...state,
//       //   auth: {}, // remove that user uid
//       // };
//       // INSTRUCTOR CODE
//       //  Hmm, different approach from mine...
//       return {
//         ...state,
//         todos: [],  // just empty array
//         auth: {}, // just empty object
//       };
//     default:
//       console.log("WR__ 000011 reducers.jsx AUTHReducer. DEFAULT switch case (no Action called). Are we here at VERY START of APP? state {} is empty Object, user is null? I suppose. YES! All true. H'rrah.", state);
//       return state;
//   }
// };



// ------------------------------
// AUTH - Login, Logout
// "Slice" of state is?
// a. - result Object from firebase.auth() ?
// b. - user sub-Object off of result ??
// c. - user.uid String ???

// No idea: Should the slice of state here get a default? e.g. {} ?? Boh!
// export var authReducer = (state, action) => { // does work ...
// 6:47 Yes! state = {}

/* http://redux.js.org/docs/basics/Reducers.html
function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  } ...

One neat trick is to use the ES6 default arguments syntax to write this in a more compact way:
function todoApp(state = initialState, action) {
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters
*/

export var authReducer = (state = {}, action) => { // does work ...
  switch (action.type) {
    case 'LOGIN':
    // What am I returning, exactly? a.? b.? c.? (above)
      // WR__ CODE!
      // return {
      //   ...state,
      //   auth: {
      //     uid: action.uid,
      //   },
      // };
      // INSTRUCTOR CODE prior to 8:07
      //  Hmm, different approach from mine...

/*
O.K., I guess I (finally) understand this. (I think.)
In configureStore.jsx, the 'redux.combineReducers' consumes an object, and one key:value pair is that 'auth:' gets what is returned by this 'authReducer'.
So, as such, we already have the left-hand 'auth:' we need, now here in the reducer we just want to generate what needs to be returned back to go inside of that.
We want:
auth: {
  uid: 1234
}
We've got:
auth: {

}
So we only need to send:
  uid: 1234

Whereas I, in my WR__ Code above, thought we needed to here prepare and send the whole thing:
auth: {
  uid: 1234
}
Nope! Didn't need to!

In fact, I actually thought we needed to be handling the whole damned state/store, and so I got my spread operator on:
{
  ...state,
  auth: {
    uid: 1234
  }
}
Nope!! Really didn't need to!!
ok.
*/




      return {
        uid: action.uid,
      };


    /* *** WR__ IDEA *** */
    /*
    Hmm - What If ...
    What if, to solve for havin LOGOUT action not only wipe the auth off of state (as below, here in authReducer, where the slice of state is auth: {})
     auth: { uid: ### } }
    BUT, *also* the todos off of state. Hmm.
    {
      todos: [ {}, {}]
    }
    To do that, I think we need to MOVE 'LOGOUT' away from the authReducer over to the todosReducer, where the slice of state is todos: [{}.{}]
    Hmm, maybe even that won't do it.
    Hmm, do I need to creata NEW REDUCER, one that gets for its slice of state the whole kanoodle?
    Such that it can wipe both auth: and todos: ?
    Hmm.
    */
    /*
    One more thought: Hmm, so, if the action 'LOGOUT' *had* been steered to go to authReducer, and I simply *move* it down to todosReducer, or, even to another new Reducer (?), I guess that whole Redux combineReducers thing will take care to now steer 'LOGOUT' to that new, different reducer. ok.
    */

    /* *** WR__ IDEA *** */
// ** ORIGINAL 'LOGOUT' UNDER AUTHREDUCER: AUTH: ONLY
    case 'LOGOUT':
      // WR__ CODE! (see above comments)
      // return {
      //   ...state,
      //   auth: {}, // remove that user uid
      // };
      // INSTRUCTOR CODE
      //  Hmm, different approach from mine...
      return {
        // just empty object
      };
    default:
      console.log("WR__ 0000 reducers.jsx AUTHReducer. DEFAULT switch case (no Action called). Are we here at VERY START of APP? state {} is empty Object, user is null? I suppose. YES! All true. H'rrah.", state); // {} I think - yep!
      return state;


// ** NEW 'LOGOUT' ALSO UNDER AUTHREDUCER: AUTH: AND TODOS: BOTH ( ?? )
/* *** WR__ IDEA *** */
// ------------------------------
//  stateReducer - Logout!
// "Slice" of state is? - Da Whole Damned Fing
// Need to alter both todos and auth, on logout
// Wonder is there some downside to this approach.
// We shall see ...

/*
Hah! Busted. See note over in configureStore.jsx
*/
// NO. NO DAMNED 'stateReducer'. Busted. Oy!
// export var stateReducer = ( state = {}, action ) => {
//   switch (expression) {
//     case 'LOGOUT':
//       // WR__ CODE! (see above comments)
//       // return {
//       //   ...state,
//       //   auth: {}, // remove that user uid
//       // };
//       // INSTRUCTOR CODE
//       //  Hmm, different approach from mine...
//       return {
//         ...state,
//         todos: [],  // just empty array
//         auth: {}, // just empty object
//       };
//     default:
//       console.log("WR__ 000011 reducers.jsx AUTHReducer. DEFAULT switch case (no Action called). Are we here at VERY START of APP? state {} is empty Object, user is null? I suppose. YES! All true. H'rrah.", state);
//       return state;
//   }
// };

  } // /switch case(s)
}; // /authReducer

// ------------------------------
// Search text
export var searchTextReducer = (state = '', action) => {

  console.log("WR__ 666666 searchTextReducer, action.type is: ", action.type);


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

  console.log("WR__ 777777 showCompletedReducer, action.type is: ", action.type);


  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state; // All you need.

/* webpack -p
Uglify.js:
Dropping unreachable code [./app/reducers/reducers.jsx:45,6]
Declarations in unreachable code! [./app/reducers/reducers.jsx:45,6]
Hah!
I'd left in this code *below* my 'return' just above.
True enough: "unreachable code"
*/


// I was missing something - namely that the false came in on state=
    //   var oppositeCompletedState = true; // just make this thing a boolean
    //   if (action.completed) { // if it's true make it false
    //     oppositeCompletedState = false;
    //   } else { // vice versa
    //     oppositeCompletedState = true;
    //   }
    //   return  oppositeCompletedState; // reverse the Boolean

// Interesting. I'd commented out this default: case.
// Got this error msg:
/*
VM71884:1 Uncaught Error: Reducer "showCompleted" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.
*/
    default:
      return state;
  }
};


// ------------------------------
// todos plural! array List of todos is the "slice" of state here:
export var todosReducer = ( state = [], action) => {

/* *** LocalStore refactoring. ** */
// I don't (yet) have my action here for ADD_TODOS.
// Does the test running of that action come here, to reducer?
// I guess it must; let's see. << NO! IT DON'T!
//           ONLY THE REDUCERS.TEST.JSX COMES TO THIS REDUCERS.JSX!
// And, if it does, and this code does nothing with it nor to it,
// I guess it simply continues on with its "return", yes? Hmm.
console.log("WR__ 88888 todosReducer, action.type is: ", action.type);


//* *** FIREBASE Refactoring *** */
// This logic going to be moved for Firebase:
  switch (action.type) {
    case 'LOGOUT':
      return []; // Q. Is that it? empty array where todos had been ????
                // Is there any concept of then, calling (?) 'LOGOUT' on authReducer?
                // Or does that sort of come for free?
                //   One dispatch of 'LOGOUT' gets BOTH
                //   the one in authReducer and the one here in todosReducer ?
                //
                // A. Yes! That's it.

    case 'ADD_TODO':
      return [
        ...state,
        /* Now, the reducer:
        1) no longer creates the todo object, and so:
        2) doesn't need to do anything about the passed-in action - just grabs the whole todo, prepared as it is, elsewhere (actions.jsx)
        */
        action.todo,
        // This earlier code has now been moved to actions.jsx:
        // {
        //   id: uuid(),
        //   text: action.text,
        //   completed: false,
        //   createdAt: moment().unix(),
        //   completedAt: undefined,
        // }
      ];

    // case for TOGGLE_TODO
    // match item of action.id e.g. 1
    // modify - set completed ! oppositeC
    // set commpleted at timestamp or clear
    // HMM. STATE is that passed-in array, of todos

    // case 'TOGGLE_TODO':
/* *** FIREBASE Refactoring *** */
    case 'UPDATE_TODO':
// Lecture 134  6:14
      var todosHere = [
        ...state,
      ];
      return todosHere.map( (todoHere) => {
        if (todoHere.id === action.id) {
          /* FIREBASE Refactoring */
          // We no longer need this logic here
          //   We've already dealt with this, previously,
          //   in the startToggleTodo asynchronous action

          // var wasCompletedTF = todoHere.completed;
          // return {
          //     ...todoHere,
          //     completed: !wasCompletedTF,
          //     completedAt: !wasCompletedTF ? moment().unix() : undefined ,

            return {
              // SPREAD operator
              /* Interesting: When you use two in succession like this, you get the second one to override any properties from the first one.
              So ...todo has all the old ones, and whatever might be on ...actions.updates will correctly update those particular properties, leaving the others unchanged. cool.
              */
              ...todoHere,
              ...action.updates,
            }
        } else {
          return todoHere;
        }

      });

/* *** /FIREBASE Refactoring *** */

/* ********* WR__ CODE *********** */
/* */
//       var todosHere = [
//         ...state,
//       ] // Hmm, guess my code gets away with no final semi-colon here
//       return todosHere.map( (todoHere) => {
//         if (todoHere.id === action.id) {
//           var wasCompletedTF = todoHere.completed;
//           // -- var flipWasCompletedTF = !wasCompletedTF;
//           // -- todoHere.completed = !todoHere.completed; // <<< NO!
//           // -- if (todoHere.completedAt) {
//           // --   // Held some value (timestamp)
//           // --   todoHere.completedAt = undefined; // clear it out // <<< NO!
//           // -- } else {
//           // --   todoHere.completedAt = moment().unix(); // <<< NO!
//           // -- }
//           return {
//               ...todoHere,
//               completed: !wasCompletedTF,
//               completedAt: !wasCompletedTF ? moment().unix() : undefined ,
// // -- NOPE:              completedAt: completed ? moment().unix() : undefined , // << ReferenceError: completed is not defined
//
// // -- WORKS:
//               // -- completed: flipWasCompletedTF,
//               // -- completedAt: flipWasCompletedTF ? moment().unix() : undefined ,
//           };
//         } else { // This was missing. Cause of error in test array > 1 element!
//           return todoHere;
//         }
//
//       });
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


/* *** LocalStorage refactoring *** */
      // LECTURE 125 09:30
      // We return an array, that:
      // 1) gets all the (Existing?) todo items on state ?
      // 2) gets /adds all (?) the todo items on the action
      // Hmm, what does that mean?
      // Is # 2 what's in localStorage?
      // While # 1 is, what, any other ? todo items in state / store ?
      // Not crystal clear to me how or where the # 1 types come from ...
      // N.B. This gets called from app.jsx, to get "initialTodos"
    case 'ADD_TODOS' :
        return [
          ...state,
          ...action.todos,
        ];
    default:
      return state;
  } // /switch
}; // /todosReducer
