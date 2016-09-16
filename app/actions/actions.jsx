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
import firebase, {firebaseRef} from 'app/firebase/';



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
export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    // ES6. (ES5 =  todos: todos, )
    todos, // final comma should be okay
  };
};

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
