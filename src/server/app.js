const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv').config({ path: './.env' });

// ############## Knex #####################
// const knex = require('knex');
console.log('environment will be', process.env.NODE_ENV)
console.log('current time is', new Date())

const environment = process.env.NODE_ENV;

// ############## Session #####################
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

console.log('environment is', environment)
// const config = require("./config.json");

// ############## Router  #####################
const index_Router = require('./routes/index');
// const authentication_Router = require('./routes/authentication');
// const renderDashboard_Router = require('./routes/renderDashboard');
// const EmployeeAPI_Router = require('./routes/EmployeeAPI');
// const AdminAPI_Router = require('./routes/AdminAPI');

var app = express();

// Note: to setup sessions, we can use knexjs to store them on psql on server
// const store = new KnexSessionStore({
//   knex: database,
//   tablename: 'sessions' // optional. Defaults to 'sessions'
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// error reporting
// const unhandledError = require("unhandled-error");
// const errorReporter = unhandledError((error, context) => {
//   console.log('unhandled-error and context is: ', error, context);
// });


// begin: stuff for frontend development (webpack)
// const isProd = process.env.NODE_ENV === "production"
// const isDev = process.env.NODE_ENV === "development"


if (environment != "production") {
// if (!isProd) {
// if (isDev) {


  const webpack = require("webpack")
  const config = require("../../webpack-config/webpack.dev.js")
  const compiler = webpack(config)
  const webpackDevMiddleware = require("webpack-dev-middleware")
  const webpackHotMiddleware = require("webpack-hot-middleware")

  app.use(
    webpackDevMiddleware(compiler, {
      hot: true,
      filename: "main-bundle.js",
      publicPath: "/reactBundles/",
      stats: {
        colors: true
      },
      historyApiFallback: true
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    })
  );

}
// end: stuff for frontend development (webpack)


const middleware = [
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  express.static(path.join(__dirname, 'public')),
  // session({
  //   secure: true,
  //   httpOnly: true,
  //   domain: 'pmeaney.com',
  //   secret: config.sessions.secret,
  //   resave: false,
  //   saveUninitialized: false,
  //   cookie: {
  //     // maxAge: 30 * 60 * 1000 // 30 mins
  //     maxAge: 24 * 60 * 60 * 1000 // 1 day
  //     // maxAge: 30 * 24 * 60 * 60 * 1000 // 1 month
  //   },
  //   store: store
  // }),
]

app.use(middleware)

app.use('/', index_Router);
// app.use('/auth', authentication_Router);
// app.use('/emp_api', EmployeeAPI_Router);
// app.use('/admin_api', AdminAPI_Router);
// app.use('/dashboard', renderDashboard_Router);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
});


// error handler
app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;

  // set locals, only providing error in development
  // ...actually, doesnt really matter since no one but me uses the production server
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = req.app.get('env') === 'development' ? err : err;

  // render the error page
  console.log('App.js-- error is', err)
  res.status(err.status || 500);
  // res.render('500_errorPage', { title: '500: Internal Server Error', error: err }) // <-- experimental - 2/18/19 (previously was this next line)
  res.render('error', { error: err }) // <-- experimental - 2/18/19 (previously was this next line)
  // res.render(err); 
  // }
});

console.log('Listening at: http://localhost:3000/')

module.exports = app;
