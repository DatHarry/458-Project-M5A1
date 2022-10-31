dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

var express = require('express'),
    app = express(),
    //port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    User = require('./api/models/userModel'),
    jsonwebtoken = require('jsonwebtoken'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Tododb', { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res, next){
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode){
      if (err) req.user = undefined
      req.user = decode
      next()
    })
  } else{
    req.user = undefined
    next()
  }
})

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' no found'})
});

//app.listen(port);
//console.log('todo list RESTful API server started on: ' + port);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
