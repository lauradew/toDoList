"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();
const flash         = require('connect-flash');
const knexConfig    = require("./knexfile");
const knex          = require("knex")(knexConfig[ENV]);
const morgan        = require('morgan');
const knexLogger    = require('knex-logger');
const cookieSession = require('cookie-session');
const bcrypt        = require('bcrypt');
const categorize    = require('./public/scripts/category');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'compressed'
}));
app.use(express.static("public"));

//set up cookies for users
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY || 'dvelopment']
}));


//flash error messages
app.use(flash());

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/homepage", (req, res) => {
  res.render("homepage.ejs");
});


app.post('/homepage', (req, res) => {
 const {text} = req.body;
 const newText = categorize(text);
 knex('items')
 .insert({description: text, category: newText, user_id: req.session.id})
 .then((result) => {
   console.log(result)
 })
});

app.get("/overlay", (req, res) => {
  res.render("overlay");
});

//user registration
app.post("/register", (req, res) => {
  const { registeremail, registerpassword } = req.body;
  knex('users')
  .insert({ email: registeremail, password: bcrypt.hashSync(registerpassword, 10) })
  .then(function (result) {
      console.log("done")
  })
  console.log(registeremail);
  req.session.id = id;
  res.redirect('/homepage');
});

//Login page
app.get("/login", (req, res) => {
  res.render('login.ejs')
});

app.post("/login", (req, res) => {
  const { email } = req.body;
  const plainTextPasswordFromUser  = req.body.password;
 knex('users')
 .select('id', 'password')
 .where('email', email)
 .limit(1)
 .then((users) => {
     if (users.length) {
       console.log(users[0].id);
       return Promise.all([
         users[0].id,
         bcrypt.compare(plainTextPasswordFromUser, users[0].password)
       ]);
       } else {
          return Promise.reject(new Error('email no'))
       }
     })
  .then(([userID, passwordMatches]) => {
    if (passwordMatches) {
    req.session.id = userID;
    res.redirect('/homepage');
    } else {
      return Promise.reject(new Error('password no'));
    }
  })
   .catch((err) => {
     console.error(err);
     req.flash('error', 'There was a problem logging you in :(');
     res.redirect('/login');
   });
  });

//  .andWhere((bcrypt.compareSync(password, 'password')) === true)

  //     }
  //   } else {
  //     res.status(403).send("Not a valid login");
  //     res.redirect('/login');
  //   }
  // }


app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
