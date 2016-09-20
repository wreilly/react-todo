import firebase from 'firebase';

import lilInspector from 'lilInspector';

// Initialize Firebase
// OLD, ORIGINAL, **NOW DELETED** FIREBASE PROJECT:
  // var config = {
  //   apiKey: "AIzaSyCKydFPqxgfDALKnBF8eFxzXsYa2eMSaj0",
  //   authDomain: "lightning-todo-app.firebaseapp.com",
  //   databaseURL: "https://lightning-todo-app.firebaseio.com",
  //   storageBucket: "lightning-todo-app.appspot.com",
  // };

/* YOU IDIOT. When the Frickin' Code Differs, it Differs
              for a frickin' reason. Go Find It Out, you chuff.
              I was editing the @#$%^& "PLAYGROUND" version of the file. Oy!
*/
/* VIDEO LECTURE CODE DIFFERS A LITTLE
LECTURE 139 7:30
fwiw,
TWO THINGS in Video Code, not in Course Github Code. Hmm.

1. TRY CATCH (pretty benign)
Has a try { } catch (e) { } :
 try {
  var config { ... };
  initializeApp(config);
} catch (e) {
   // (empty)
}

2. EXPORTS  (hmm, seems odd this would differ?)
export var firebaseRef = firebase.database().ref();
export default firebase;
*/

// NEW: TODO APP
// messagingSenderId is new on Firebase, not used in our app
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
  };



  firebase.initializeApp(config);

// Database object, references - e.g.
  // {
  //   appName: 'Todo App',
  //   isRunning: true,
  // }


  /* *** ON - Listen! ** 5:15 */
  // SEE 'OFF', down below Joey (my pal).
  // https://firebase.google.com/docs/reference/js/firebase.database.Reference#on
  // Anonymous Arrow function:
  // firebase.database().ref().on('value', (snapshot) => {
  //   console.log('ON BABY got value', snapshot.val());
  // });
  var logDataValue = (snapshot) => {
    console.log('ON KID, from logDataValue funct', snapshot.val());
  };
  firebase.database().ref().on('value', logDataValue);


// Get reference to database, set values:
// We'll make a convenience var here:
var firebaseRef = firebase.database().ref();

// firebase.database().ref().set({  // << Now we use the Ref
firebaseRef.set({
    appName: 'Todo App',
    isRunning: true,
    user: {
      name: 'William',
      age: 56, // yep!
    }
  }).then( () => {
        console.log('Set worked!');
      },
      (error) => {
        console.log('Set failed');
      }
    );



// ABOVE:
// Set returns a PROMISE. First param:  function if success, second param: function if error

// NOTE!   Use of set() "completely wipes", in this case, our whole database !! !!
// But that (of course) is because we happen to be writing from the ROOT of the whole database!!
// We can fine tune that, baby.

// firebase.database().ref().set({  // << Now we use the Ref
// firebaseRef.set({
//     appName: 'Todo App Revised', // result is: isRunning, user, are GONE
// });

// 3:38
firebaseRef.child('user').set({
  name: 'Joey', // does age get wiped? Sure does.
});


/* *** OFF *** */
// Same ref - it knows what to turn off.
// (I infer: only one listener per ref.) < Nope!

// Turn 'em ALL off:
// firebase.database().ref().off();
// Turn off the named function: (mo' bettah):
firebase.database().ref().off('value', logDataValue);
// Hmm:
// ERROR.
// firebase.js?678b:353Uncaught Error: Query.off failed: first argument must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".

// firebase.database().ref().off('value', logDataValue);

/* SHALLANGE: ! for SET.
name: of app
version:

set
change the name (it'll wipe the version - ok)
*/
// OK. We'll wind up killing/wiping all above. N.P.

firebase.database().ref().set({
  appThing: {
    thingName: 'Narcissa Memorial App',
    thingVersion: 0.1,
  },
  isRunning: true,
  user: {
    name: 'William',
    age: 56, // yep!
  },
  // ARRAYS!
  // WRONG WAY:
  // todos: [
  //   {
  //     id: '123bca',
  //     text: 'Make an array',
  //   },
  // ],
  // RIGHT WAY:
  // todos: {
  //   '123bca': {
  //     text: 'Make an array',
  //   },
  // },
});

/* **** ARRAY **** */
/*
r/w issues w Arrays
Firebase uses Objects instead
Firebase generates you a unique id per object, sub-object, sub-sub-object...
*/

// Curious: 'notes' does NOT have to exist in the code! Hmm.
// Firebase is agonna MAKE it.
var notesRef = firebaseRef.child('notes');

// SAME THING - THREE WAYS:
// 1) TWO LINES
// var newNoteRef = notesRef.push();
// newNoteRef.set({
//   text: 'Do more notes',
// });

// 2) CHAIN CALLS
// var newNoteRef = notesRef.push().set({
//   text: 'Do more notes',
// });

// 3) SHORTCUT!
var newNoteRef = notesRef.push({
  text: 'Do more notes',
});

// todos DO NOT EXIST !  ("yet") << ?
var todosRef = firebase.database().ref().child('todos');

// snapshot here is just the newly added todo
todosRef.on('child_added', (snapshot) => {
  console.log('child_added fired: ', snapshot.key, snapshot.val());
});

/*  Logs all 3 events. Here's one:
child_added fired:  -KRZCXMhKdtr8jD1MsGQ
Object {text: "this is my 00 shot"}
  text: "this is my 00 shot"
*/

todosRef.on('child_changed', (snapshot) => {
  console.log('child_CHANGED yaknow', snapshot.key, snapshot.val());
});

todosRef.on('child_removed', (snapshot) => {
  console.log('child_REMOVED yaknow', snapshot.key, snapshot.val());
});

var firstTodoRef = todosRef.push();
firstTodoRef.set({
  text: 'this is my 00 shot TWO LINES',
});

console.log('firstTodoRef.key: ', firstTodoRef.key);

todosRef.push().set({
  text: 'this is my 01 shot CHAINED',
});

// Nope! Uncaught TypeError: Cannot read property 'key' of undefined
// console.log('todosRef[1].key', todosRef[1].key);

todosRef.push({
  text: 'this is my 02 shot SHORTCUT!',
});

// Hell, I did update and remove in the Firebase console! coolio.
// todosRef.update({
//
// });
//
// todosRef.remove({
//
// });

// We've seen .key on snapshot
// Here also apparently available
//   for that Firebase-generated
//   array-emulating object key. ok.
console.log('That todo id was: ', newNoteRef.key);

// lilInspector(newNoteRef, 'newNoteRef kids');


  // *** !!!! lilInspector !!!! ****
  // lilInspector.js?1e05:11 objectVariableNameThisTime : newNoteRef kids
  // lilInspector.js?1e05:18 KEY   : lilKey            : w
  // lilInspector.js?1e05:19 VALUE : lilObject[lilKey] : https://lightning-todo-app.firebaseio.com
  // lilInspector.js?1e05:18 KEY   : lilKey            : path
  // lilInspector.js?1e05:19 VALUE : lilObject[lilKey] : /notes/-KRYyDUqlTSwNRghm7pL
  // lilInspector.js?1e05:18 KEY   : lilKey            : n
  // lilInspector.js?1e05:19 VALUE : lilObject[lilKey] : {}
  // lilInspector.js?1e05:18 KEY   : lilKey            : Oc
  // lilInspector.js?1e05:19 VALUE : lilObject[lilKey] : false
  // lilInspector.js?1e05:18 KEY   : lilKey            : then
  // lilInspector.js?1e05:19 VALUE : lilObject[lilKey] : function () { [native code] }
  // lilInspector.js?1e05:18 KEY   : lilKey            : catch
  // lilInspector.js?1e05:19 VALUE : lilObject[lilKey] : function () { [native code] }
  // lilInspector.js?1e05:24 **** !!!! /END lilInspector !!!! **


  // lilInspector(newNoteRef.path, 'newNoteRef.path kids');
/*
*** !!!! lilInspector !!!! ****
lilInspector.js?1e05:11 objectVariableNameThisTime : newNoteRef.path kids
lilInspector.js?1e05:18 KEY   : lilKey            : o
lilInspector.js?1e05:19 VALUE : lilObject[lilKey] : notes,-KRZ1Kjzz4QKDhDO3FY9
lilInspector.js?1e05:18 KEY   : lilKey            : Z
lilInspector.js?1e05:19 VALUE : lilObject[lilKey] : 0
lilInspector.js?1e05:24 **** !!!! /END lilInspector !!!! ***
*/


// But .val is NOT avail here. Hmm.
// console.log('That todo text was: ', newNoteRef.val());
console.log('That todo text was: ', newNoteRef.key.text); // undefined!
/*
That todo id was:  -KRYx5bL5t6wdhdbfSKu
That todo text was:  undefined
*/


// FIREBASE DATA OUTPUT:
// https://console.firebase.google.com/project/lightning-todo-app/database/data
//
//   notes
//    -KRYtqmgyKof5lgVFOEH
//    text:
//   "Do more notes"
//
//
//   notes
//    -KRYvxn8kvLkFcaz9aZn   <<<< NEW EACH RUN! DYNAMIC AS ALL GIT O U T ! !
//    text:
//   "Do more notes"



/* *** FETCH DATA LECTURE 130 *** */

// ONCE listens for an event. We pass it the 'value' of where the ref() is currently set. (Whole datbase in this case.)
/* https://firebase.google.com/docs/database/web/retrieve-data
a snapshot of your data without listening for changes, such as when initializing a UI element that you don't expect to change.  ...
data that only needs to be loaded once and isn't expected to change frequently or require active listening.
*/
// firebase.database().ref().once('value').then(
firebase.database().ref().child('appThing').once('value').then(
  (snapshot) => {
    // SNAPSHOT
    // snapshot.key is the (mere) string of the referenced element: here  - 'appThing'
    console.log('Got entire database ONCE VALUE SNAPSHOT - oh and key too', snapshot.key, snapshot.val());

  },
  (err) => {
    console.log('Unable to fetch value', err);
  }
)
/*
Browser console:
Got entire database ONCE VALUE SNAPSHOT O
bject {appThing: Object, isRunning: true, user: Object}
appThing
:
Object
thingName
:
"Narcissa Memorial App"
thingVersion
:
0.1
true
user
:
Object
age
:
56
name
:
"William"
*/


firebaseRef.update({
  isRunning: false,
});

/* *** CHALLENGE for FETCH / ON *** */

firebase.database().ref().child('user').on('value', (snapshot) => {
  console.log("ON change in app ... ", snapshot.val());
});

firebase.database().ref().update({
  'user/name': 'Rogeroo',
});

firebaseRef.child('appThing').on('value', (snapshot) => {
    console.log('Success appThing biz, and der key ',  snapshot.key, snapshot.val());
    /*
    Yields (Better: real object):
    Success appThing biz, and der key  appThing
    Object {thingName: "You Don't Hear Me (do you?)", thingVersion: 0.1}
      thingName: "You Don't Hear Me (do you?)"
      thingVersion: 0.1__proto__: Object
    */

    // console.log('Success appThing biz' + ' | der key | ' + snapshot.key + ' : der val: ' + snapshot.val());
    /*
    yields: useless text [object Object]
     Success appThing biz | der key | appThing : der val: [object Object]
    */

  });

firebase.database().ref().update({
  'appThing/thingName': 'You Don\'t Hear Me (do you?)',
})


/* *** CHALLENGE for UPDATE *** */

// MULTIPATH
// firebase.database().ref().update({
//   'appThing/thingName': 'MULTIPATH Challenge name update whoa',
//   'user/name': 'MULTIPATH  Usedtabe William now Ronald',
// }).then(
//   () => {
//     console.log("sure is Ronald!");
//   },
//   (err) => {
//     console.log("Hope you don't see me.");
//   }
// );

// Yes, the below wipes out the version, sigh
// D'oh! Forgot about the CHILD.
// firebase.database().ref().child('appThing').update({
//       thingName: 'Non Multi-Path new app name',
// });


// firebase.database().ref().child('user').update({
//     name: 'Non-multipath USERNAME NEW',
// })

/* *** REMOVE !! ***** */
// REMOVE ENTIRE DATABASE CONTENT:
// firebase.database().ref().remove();

// whole "appThing" object:
// firebaseRef.child('appThing').remove();
// Just the thingName on appThing:
// firebaseRef.child('appThing').child('thingName').remove();
// Same as line above: using Multi-Path:
// firebaseRef.child('appThing/thingName').remove();


//  ** NULL it AWAY! ;o)
// firebaseRef.child('appThing').update({
//   thingVersion: 2.99,
//   thingName: null, // <<<< update to null, REMOVES it.
// });

// Challenge

// firebase.database().ref().update({
//   isRunning: null, // bye-bye
// });

// firebase.database().ref().child('user').child('age').remove();
// Same as above. And mo' better.
// firebase.database().ref().child('user/age').remove();

// WRONG!   remove() does NOT take an object inside as param. You just invoke remove(), once you've navigated to the appropriate element/node to be removed. Cheers.
// firebase.database().ref().remove({
//   'user/age',
// })

/* *** UPDATE *** */
// only first level of properties
// What about nested ??
// MULTI-PATH updates

// firebaseRef.update({
//   isRunning: false,
//   'appThing/thingName': 'Todo App Name Update',
// });

// SAME as the multi-path above
// firebaseRef.child('appThing').update({
//   thingName: 'Child to update rename it',
// }).then(
//   () => {
//   // success
//   console.log("Yep all set");
//   },
//   (err) => {
//     // error, kids
//     console.log("NOPE all set");
//   },
// );




/* ***** SET STUFF *** */
// firebaseRef.child('user').set({
//   name: 'Joey Turtle', // does age get wiped? Sure does.
// });

// firebase.database().ref().child('user').set({
//   name: 'Joey Turtle-Tortoise', // does age get wiped? Sure does.
//   age: 2,
// });

// firebase.database().ref().child('appThing').set({
//   thingName: 'Plautus Gets One Too App',
// }).then(
//   () => {
//       console.log('child Tortoises all the way down!');
//   },
//   (err) => {
//       console.log('Somebody child got away', err);
//   },
// );
