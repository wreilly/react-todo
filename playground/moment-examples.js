var moment = require('moment');

console.log(moment().format());
// wreillymc-l:ReactTodo william.reilly$ node playground/moment-examples.js
// 2016-08-30T17:14:06-04:00
// UTC -4 timezone  5:14 P.M. locally

// Unix epoch
// December 31, 1969 11:59pm -> -60
// January 1, 1970 12:00am -> 0
// January 1, 1970 12:01am -> 60

var now = moment();
console.log("Current timestamp: " + now.unix());
// Current timestamp: 1472591868

var myTimestamp = 1472591868;
var currentMoment = moment.unix(myTimestamp);

console.log("Current moment-fing: " + currentMoment.format('MMM D, YYYY @ h:mm A'));

// Current moment-fing: Aug
// Current moment-fing: Aug 30, 2016
// Current moment-fing: Aug 30, 2016 @ 17:17 PM
// Current moment-fing: Aug 30, 2016 @ 5:17 PM

// wreillymc-l:ReactTodo william.reilly$ node playground/moment-examples.js
// 2016-08-30T17:19:31-04:00
// Current timestamp: 1472591971
// Current moment-fing: 2016-08-30T17:17:48-04:00

// http://momentjs.com/docs/#/displaying/

// Le Challenge :!:
// January 3rd, 2017 @ 12:13 AM
console.log("Current moment-fing: " + currentMoment.format('MMM D, YYYY @ h:mm A'));
console.log("Current moment-fing: " + currentMoment.format('MMMM Do, YYYY @ H:mm A'));
// Current moment-fing: August 30th, 2016 @ 17:17 PM
