/* Lecture 91, Section 9-8 SPREAD Operator ES6
2016-08-27
https://facebook.github.io/react/docs/jsx-spread.html
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html
https://ponyfoo.com/articles/es6-spread-and-butter-in-depth

ARGUMENTS ARE IN AN ARRAY

*/

function add (a, b) {
  return a + b;
}

console.log(add(3, 1));

var toAdd = [9, 5];
console.log(add(toAdd[0], toAdd[1])); // works, but ...

// PUT ... SPREAD OPERATOR before the Array.
// "Spreads them out"

console.log(add(...toAdd)); // works ...
console.log(add( ... toAdd)); // works (WHITESPACE)...

// COMBINE
var groupA = ['Lisa', 'Tony'];
var groupB = ['Rogeroo'];

var final = [3];
console.log(final);  // [ 3 ]
console.log(final = [3, groupA]); // [ 3, [ 'Lisa', 'Tony' ] ]
console.log(final = [3, ...groupA]); // [ 3, 'Lisa', 'Tony' ]

console.log(final = [...groupB, 3, ...groupA]); // [ 'Rogeroo', 3, 'Lisa', 'Tony' ]


// OUR ARGUMENT IS AN ARRAY:
var person = ['Joe', 66];
var personTwo = ['Girlfriend', 77];
// Hi so-and-so, you're xx these days, hey?

function howdy (name, age) {
  console.log("Howdy here! Hi " + name + ", you're looking about " + age);
}

// USE SPREAD OPERATOR TO PASS IT IN, GET ALL ELEMENTS:
howdy(...person);
howdy( ... personTwo);

function howdyForEach (arrayElement, index, array) {
  console.log("howdyForEach here! Hi " + arrayElement[0] + ", you're looking about " + arrayElement[1]);
}

var personBunch = [person, personTwo];
// var personBunch = [...person, ...personTwo];
console.log(personBunch);
personBunch.forEach(howdyForEach); // Yep.

// Don't do this: prematurely spread 'em !!
// You want to KEEP the multi-part array of info about one thing (person)
// But then, as in howdy() above, you pass that one thing
// (an array, with two pieces of information about a person)
// in to a function and at that point you *do* use
// the Spread operator.
// Cheers
/*
var personBunch = [...person, ...personTwo]; // < NOPE.
console.log(personBunch);
personBunch.forEach(howdyForEach);
*/


// OUR ARGUMENT IS ONE ELEMENT, FROM AN ARRAY
var names = ['Mkke', 'Bnny'];
var final = ['Guglielmo'];
// Hola so-and-so-and-so  .forEach hey?

final = ['Guglielmo', ...names];
final.forEach(sayHiShorter);

// forEach takes all 3 arguments ...
function sayHi (arrayElement, index, array) {
  console.log("Hi " + arrayElement + ", you're hanging in there these days, hey?");
}

// but you can really just name the first one....
function sayHiShorter (arrayElement) {
  console.log("Hi " + arrayElement + ", you're hanging in there these days, hey?");
}

// or put an Anonymous Function in-line comme ca:
final.forEach(function (arrayElement) {
  console.log("ANON FUNC Hi " + arrayElement + ", you're hanging in there these days, hey?");

});
