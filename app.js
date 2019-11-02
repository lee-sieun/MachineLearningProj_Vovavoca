const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs');
var logger = require('morgan');

// Passport Config
app.use(logger('dev'));
// Connect to MongoDB
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect('mongodb://localhost:27017/vovavoca', {

  authSource: "admin",
  useNewUrlParser:true,
  useUnifiedTopology:true
} ).then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use('/dataset',express.static('dataset'));
app.use(express.static('views'))
app.use(express.static('css'))
app.use(express.static('js'))
app.use(express.static('scss'))
app.use(express.static('vendor'))
// EJS

app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

// Express body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
  secret: '1@%24^%$3^*&98&^%$', // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
  resave: false,                //세션 아이디를 접속할때마다 새롭게 발급하지 않음
  saveUninitialized: false,      //세션 아이디를 실제 사용하기전에는 발급하지 않음
  cookie:{
    maxAge: 1000 * 60 * 60 * 24   //24시간 만기
  }
}));

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});


// Routes
app.use('/', require('./routes/index.js'));

const PORT = process.env.PORT || 5010;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
module.exports = app;
