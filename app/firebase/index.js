// Note: .js, not .jsx

// *******************************************
import firebase from 'firebase';

// try / catch ensures this is tried once, dealt without
//     appropriately (as opposed to tried many times...)
try {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCKydFPqxgfDALKnBF8eFxzXsYa2eMSaj0",
    authDomain: "lightning-todo-app.firebaseapp.com",
    databaseURL: "https://lightning-todo-app.firebaseio.com",
    storageBucket: "lightning-todo-app.appspot.com",
  };

  firebase.initializeApp(config);

} catch (err) {

}


// Get (and export) reference to database
export var firebaseRef = firebase.database().ref();

// From here, export the imported firebase module itself.
// This way, other code in our app need not import it
export default firebase;

// Import/Export note:
// Exported this way, the Import (in actions.jsx) looks like this:
// import firebase, {firebaseRef} from 'app/firebase/';
// Why?
// firebase gets that default export
// {firebaseRef} (I guess) processes a JSX expression (?) to find that var, available among the exported modules. (I guess?) okay.

// *******************************************
