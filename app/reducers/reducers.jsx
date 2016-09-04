
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


// showCompletedReducer default: false; TOGGLE_SHOW_COMPLETED
// default
export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state; // All you need.
// I was missing something - namely that the false cames in on state=
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
