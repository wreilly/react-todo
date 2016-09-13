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
// Now this action takes a whole Todo, not just the text

// export var addTodo = (todoText) => {
export var addTodo = (todo) => { // whole todo
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
    // Store all the todos for our app
    // Now our data is on our Firebase database (good) ...
    var todoRef = firebaseRef.child('todos').push(todo);
    // ...But, not yet added to our app, to our store...
    /* So ...: This Dispatch (below) of the addTodo action (above) will send the new Todo to the Store, that is, this step puts the Todo onto / into the State for our React-Redux application.
    Right?
    (And, that update to the state causes our React component to be re-rendered, which adds the new todo to the browser.)
    */
    return todoRef.then( () => {
      dispatch(addTodo({
        ...todo,
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

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};
