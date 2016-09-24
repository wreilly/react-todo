import moment from 'moment';

// Import/Export note:
// Exported this way from 'app/firebase/index.js': ...
//   export var firebaseRef = firebase.database().ref();
//   export default firebase;
// .. the Import (in actions.jsx) looks like this:
// import firebase, {firebaseRef} from 'app/firebase/';
// Why?
// firebase gets that default export
// {firebaseRef} (I guess) processes a JSX expression (?) to find that var, available among the exported modules. (I guess?) okay.


/* *** OAUTH GITHUB LOGIN LOGOUT **** */
// import firebase, {firebaseRef} from 'app/firebase/';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/';



// ACTION GENERATORS

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText,
  };
};

// PERFESSER CODE: Works.
// Note: Because this follows the naming convention of 'text',
// then Yes you can use the ES6 shorthand of 'text' in the return.
// But see below the NON-conventional WR__ CODE example ...
/*
export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text,
  };
};
*/

// WR__ CODE:
// I chose to call it 'todoText' (why not). NON-conventional me.
// But then I cannot use the ES6 thing: todoText,
// No sir, I gotta do: text: todoText,

/* *** FIREBASE Refactoring *** */
// Now this action takes a whole Todo, not just the text.
// Why?
// At least in part because: the ID for the todo now
//   comes from Firebase. So we grab the whole todo,
//   not just its text, to add it to our store/state/app
//   We used to (pre-Firebase) effectively build the todo
//   right here in the app. All we needed was the text for it.
//   But now we build the todo ID over in Firebase. So we
//   now get the whole todo here in addTodo, to simply
//   append/attach/add the whole todo to our app/store/state.
// export var addTodo = (todoText) => { // << WAS: text only
export var addTodo = (todo) => { // NOW: whole todo
  return {
    type: 'ADD_TODO',
    // whole todo:
    todo: todo, // I'll just do it the ES5 way for the hell of it.
    // text: todoText, // Gots to do this ES5 way
    // todoText, // << NOPE ES6 shortcut - Was not working.
  };
};

// THUNK ACTION. Returns a function, not an object
// (dispatch, getState) <<< boilerplate params always passed in
/* *** FIREBASE Refactoring *** */
// FIREBASE!
export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
          // id: uuid(), // << Now Firebase generates IDs
          // text: action.text, // << No longer on the action
          // text: text, // ES5 ok.
          text, // ES6 ok too
          completed: false,
          createdAt: moment().unix(),
          // completedAt: undefined,
          completedAt: null, // Firebase you use null to essentially remove it.
        };
    // Here, a new Reference to Firebase.
    // Store all the todos for our app, in this Firebase 'todos' array
    // Now our data is on our Firebase database (good) ...
    var todoRef = firebaseRef.child('todos').push(todo);
    // ...But, the todo is not yet added to our app, to our store... / state...
    /* So ...: This Dispatch (right below) of the addTodo action (found above) will send the new Todo to the Store, that is, this step puts the Todo onto / into the State for our React-Redux application.
    Right?
    (And, that update to the state causes our React component to be re-rendered, which adds the new todo to the browser.)
    */
    return todoRef.then( () => {
      dispatch(addTodo({
        ...todo, // all the properties on the new todo, plus...
        id: todoRef.key, // coming from Firebase!
      }))
    }

    )

  };
};


// *** LOCALSTORAGE Redux Refactoring, going to LocalStorage
// Called in app.jsx
/* *** FIREBASE Refactoring LECTURE 136 *** */
// No more going to localStorage for todos.
// Here is the SYNCHRONOUS ACTION addTodos.
//  Called from
//   the ASYNCHRONOUS Action, startAddTodos, which
//   in turn is called from app.jsx.
export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    // ES6. (ES5 =  todos: todos, )
    todos, // final comma should be okay
  };
};

/* *** FIREBASE Refactoring LECTURE 136 *** */
// ASYNCHRONOUS ACTION
// Invoked in app.jsx, dispatched to go
//  get the todos out of Firebase, to start the app.
export var startAddTodos = () => {
// ACTION *FUNCTION* THAT GETS CALLED By Redux
//    WITH DISPATCH and GETSTATE:
// LECTURE 136  6:15
  return (dispatch, getState) => {
    var todosFromFirebaseObj = {}; // comes back as Object
    // https://firebase.google.com/docs/database/web/retrieve-data

    // ONCE returns a Promise we call with data snapshot
    // RETURN CHAINS the promise, so can be used in test
    return firebase.database().ref().child('todos').once('value').then( (snapshot) => {

console.log("WR__ 666 snapshot.val(): ", snapshot.val()); //

        // Instructor addition: defensive coding!
        // What if NO todos? Then set it to
        //   empty object {} (don't leave it to go 'undefined'):
        todosFromFirebaseObj = snapshot.val() || {};
// }); // /END of Firebase Retrieval and "THEN" promise....

console.log("WR__ 777 todosFromFirebaseObj: ", todosFromFirebaseObj); // {}


      // Given an Object, returns an ARRAY (of, the Keys!)
      var firebaseTodosKeys = Object.keys(todosFromFirebaseObj);

console.log("WR__ 888 firebaseTodosKeys (array): ", firebaseTodosKeys);

      var todosForAppArray = []; // 'parsedTodos'
      // forEach callback per item:
      firebaseTodosKeys.forEach( (thatKey) => {
        todosForAppArray.push({
          id: thatKey,
          // text, completed, completedAt, createdAt
          ...todosFromFirebaseObj[thatKey]
        });
      });

console.log("WR__ 999 todosForAppArray[0].id (array): ", todosForAppArray[0].id);

      // update the Redux store, will re-render in components
      dispatch(addTodos(todosForAppArray));

    }); // /END of Firebase Retrieval and "THEN" promise....

  };
};


// Quirk: Firebase returns object. App expects array.
//////////////////////////////
// Firebase returns:
// {
//   'kajflaflafkaf' : {
//     text: 'walk dog',
//   },
//   '12345' : {
//     text: 'walk cat',
//   },
// }

// ReactTodo App expects:
// [
//   {
//     id: 'kajflaflakaf',
//     text: 'walk dog',
//   },
//   {
//     id: '12345',
//     text: 'walk cat',
//   },
// ]
// HOW TO FIX: Object.keys
// https://davidwalsh.name/object-keys
/*
var person = {
  firstName: 'David',
  lastName: 'Walsh',
  // ...
};

"trait" is a key, children.

Object.keys(person).forEach(function(trait) {
  console.log('Person ', trait,': ', person[trait]);
});

Person firstName: David
Person lastName: Walsh
*/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

/* Hmm, so use of Object.keys takes Object, returns Array, yah?
INPUT:
{
  'kajflaflafkaf' : {
    text: 'walk dog',
  },
  '12345' : {
    text: 'walk cat',
  },
}
OUTPUT:  <<< WRONG
[
  'kajflaflafkaf' : {
    text: 'walk dog',
  },
  '12345' : {
    text: 'walk cat',
  },
]

OUTPUT:  <<< RIGHT. It's *just* the keys. hokay.
[ 'kajflaflafkaf', '12345' ]

ERGO:

CONSOLE:
var person = {
  firstName: 'David',
  lastName: 'Walsh',
  // ...
};
undefined
person
Object {firstName: "David", lastName: "Walsh"}
var parray = Object.keys(person)
undefined
parray
["firstName", "lastName"]
person[parray[0]]   <<< Quite Groovy.
"David"

*/
//////////////////////////////





// toggleShowCompleted - no params
// TOGGLE_SHOW_COMPLETED

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
    // Q. Hmm, any boolean here ??
    // A. Nope!
  };
};

// toggleTodo(id) - one param
// TOGGLE_TODO
/* *** FIREBASE Refactor *** */
// We revise "toggle" to really be "update":
// export var toggleTodo = (id) => {
//   return {
//     type: 'TOGGLE_TODO',
//     id,
//   };
// };
// This was toggleTodo, now revised to updateTodo:
// SYNCHRONOUS ACTION.   (Called by the ASYNCHRONOUS Action: startToggleTodo)
export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates,
  };
};


/* *** FIREBASE *** */
// ASYNCHRONOUS ACTION.   (Calls the SYNCHRONOUS Action: updateTodo)
// 2 params: ID of which Todo, and,
//   are we going from T to F, or F to T ?
export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    // ES5 Plain ol'
    // var todoRef = firebaseRef.child('todos/' + id);
    // ES6 Template Strings:
    // Insert JavaScript after $, inside {}
    var todoRef = firebaseRef.child(`todos/${id}`);
    var updates = {
      completed: completed,
      completedAt: completed ? moment().unix() : null
    };

    // then promise waits for the data to be changed on Firebase ...
    // return the promise; allows us to chain on to 'then' inside of our tests - useful.
    // Like we did up in startAddTodo.
    // UPDATE DATA ON FIREBASE:
    return todoRef.update(updates).then( () => {
      // success handler
      // we'll dispatch our synchronous (?) action here
      // (START) THE UPDATE of DATA ON APP STORE (?)
      dispatch(updateTodo(id, updates));
    });
  };
};


/* *** OAUTH GITHUB LOGIN LOGOUT **** */
// SYNCHRONOUS
  export var login = (uid) => {
    return {
      type: 'LOGIN',
      // ES5:
      uid: uid,
      // ES6:
      // uid,
    };
  };

/* I guess something I don't understand: how does this Firebase action invocation of fb.auth() below cause the result.user to be made available to the listener/observe set up over in app.jsx ?
fb.auth().onAuthStateChanged
I guess it just does. (behind-the-scenes magic)
*/
// wtf ? Trying to see if I get to see that Object. Not really.
var wr__MessyGlobalOAuthResultHolder = {};

/* *** OAUTH GITHUB LOGIN LOGOUT **** */

/* For logging in, this ASYNCHRONOUS "startLogin" action IS paired with a SYNCHRONOUS 'login' action.
BUT, that 'login' one is invoked (dispatched) NOT from right within the "start" one (like in the other "start" actions seen herein (e.g. startAddTodo itself directly calls addTodo)). INSTEAD, the 'login' is dispatched from over in APP.JSX, inside of its listener/observer fb.auth().onAuthStateChanged(). Cheers.
*/
  export var startLogin = () => {
    return (dispatch, getState) => {
      // firebase.auth() returns many functions; we use as below:
      // 'return' keeps the chain going
      // For example of 'result', see
      /*
I just copied and pasted this big honkin' Object out of the Console (partially expanded, not entirely):

/Users/william.reilly/dev/JavaScript/React/Udemy-REACT-Complete-Developer-Course/11Firebase/...
...react-11-17-CONSOLELOG-Example-OAuthSuccessObject.js
      */
      return firebase.auth().signInWithPopup(githubProvider).then( (result)  => {
          // 1. Success path

          // This var did get assigned. ok.
          wr__MessyGlobalOAuthResultHolder = result;

          /* As per note above, the SYNCHRONOUS action 'login' is not called here; it's dispatched from over in the listener/observer in APP.JSX.
          */

          console.log('Auth worked!', result);
        }, (error) => {
          // 2. Error path
          console.log('Solly! Unable to auth', error);
        });
    };
  };

  export var logout = () => {
    return {
      type: 'LOGOUT',
    };
  };

  export var startLogout = () => {
    return (dispatch, getState) => {
      return firebase.auth().signOut().then( () => {
        // This did show (console.log) the Object's value. ok.
        /* r__MessyGlobalOAuthResultHolder Object {user: W, credential: Mf}

        But then it was not available after page rendering complete, in the console:
        > wr__MessyGlobalOAuthResultHolder.user.uid
VM7509:1 Uncaught ReferenceError: wr__MessyGlobalOAuthResultHolder is not defined(…)
        Ah well.
        */
        console.log("wr__MessyGlobalOAuthResultHolder", wr__MessyGlobalOAuthResultHolder);
        console.log("Logged out!");
      });
    };
  };

/* *** /OAUTH GITHUB LOGIN LOGOUT **** */
