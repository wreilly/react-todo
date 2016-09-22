// Note: .js, not .jsx



// *******************************************
import firebase from 'firebase';

// try / catch ensures this is tried once, dealt with
//     appropriately (as opposed to tried many times...)
try {
  // Initialize Firebase
  // OLD, ORIGINAL, **NOW DELETED** FIREBASE PROJECT:
  // var config = {
  //   apiKey: "AIzaSyCKydFPqxgfDALKnBF8eFxzXsYa2eMSaj0",
  //   authDomain: "lightning-todo-app.firebaseapp.com",
  //   databaseURL: "https://lightning-todo-app.firebaseio.com",
  //   storageBucket: "lightning-todo-app.appspot.com",
  // };

// NEW: TODO APP - name of database on Firebase
//      TODO APP TEST - other db on Fb
// messagingSenderId is new on Firebase, not used in our app
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
  };
  firebase.initializeApp(config);

} catch (err) {
  // IGNORE, EH?
  // HOW ABOUT WE HELP OURSELVES OUT, A LITTLE
  // AND F'IN CONSOLE.LOG THE FACT THERE WAS A
  // FREEKIN' ERR-OR HE-RE.
  // JEEZABUS.
  /*
  console.log("WR__ 12345 wtf /app/firebase/index.js initializeApp(config to DELETED lightning-todo-app) has a little ERROR to tell us about! ", err);
  */
  // FUT THE WUK. The above NEVER COMES OUT. oof.
}


/* *** OAUTH GITHUB **** */
export var githubProvider = new firebase.auth.GithubAuthProvider();


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
