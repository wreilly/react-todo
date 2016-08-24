var express = require('express');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

// http://expressjs.com/en/guide/behind-proxies.html
// If you do want to use req.protocol, you need this:
app.set('trust proxy', true);
// otherwise, just use req.headers['x-forwarded-proto']
// https://www.udemy.com/the-complete-react-web-app-developer-course/learn/v4/questions/1417184

app.use(function (req, res, next){


    if (req.headers['x-forwarded-proto'] === 'https') { // WORKED
      res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
