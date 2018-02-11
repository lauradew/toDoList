"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const flash = require('connect-flash');
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const categorize = require('./public/scripts/category');


// Seperated Routes for each Resource
const usersRoutes = require("./routes/items");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
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
// gets a JSON of items table
app.use("/api/items", usersRoutes(knex));




function awesomeClassifier(input) {
  // This intelligence is entirely artificial, fuck yeah.
  var options = [
    'watch',
    'eat',
    'read',
    'buy'
  ];
  var index = Math.floor(Math.random() * 4);
  return options[index];
}



// Home page
app.get("/", (req, res) => {
  res.render("index");

});
app.get("/homepage", (req, res) => {
  if (!req.session.id) {
    req.flash('error', 'No user logged in');
    res.redirect('/login');
  }
  res.render("homepage.ejs");
});


app.post('/homepage', (req, res) => {
  // const {text} = req;
  const text = req.body.category;
  const newText = categorize(text);
  knex('items')
    .insert({
      description: text,
      category: newText,
      user_id: req.session.id
    })
    .then((result) => {
      res.json({
        category: newText
      });
      res.redirect('/homepage');
    });

});

app.get("/overlay", (req, res) => {
  res.render("overlay");
});

//user registration
app.post("/register", (req, res) => {
  const { registeremail, registerpassword } = req.body;
  if (!registeremail || !registerpassword) {
    req.flash('error', 'Please Fill All Required Fields');
    res.redirect('/login');
  } else {
  knex('users')
  .where('email', registeremail)
  .then((users) => {
    if (users.length === 0) {
      knex('users')
      .insert({
        email: registeremail,
        password: bcrypt.hashSync(registerpassword, 10)
      })
      .then((users) => {
        knex('users')
        .max('id')
        .then((id) => {
          req.session.id = id[0].max
          res.redirect('/homepage');
        })
      })
    } else {
      req.flash('error', 'User exists');
      res.redirect('/login');
    }
  })
 }
});


//Login page
app.get("/login", (req, res) => {
  res.render('login.ejs', {
    errors: req.flash('error')
  });
});

//profile update page
app.get("/profile", (req, res) => {
  if (!req.session.id) {
    req.flash('error', 'No user logged in');
    res.redirect('/login');
  }
  knex('users')
  .where('id', req.session.id)
  .first('*')
  .then((user) => {
    res.render('useredit.ejs', {
      email: user.email,
      errors: req.flash('error')})
  });

});

app.post('/profile', (req, res) => {
  const {email, password, email_confirmation} = req.body;
  if (!email || !email_confirmation || !password) {
    req.flash('error', 'Please Fill All Required Fields');
    res.redirect('/profile');
  } else {
    knex('users')
    .where('email', email_confirmation)
    // .andWhere('email', '<>', email) //need to figure out how to check for emails already in the system
    .then((users) => {
      if (users.length === 1) {
        knex('users')
        .where({id: req.session.id})
        .update({
          email: email,
          password: bcrypt.hashSync(password, 10)})
        .then()
        res.redirect('/homepage')  
      } else {
          req.flash('error', 'No user by that email');
          res.redirect('/profile');
        }
      })
  } 
})

app.post("/login", (req, res) => {
  const { email } = req.body;
  const plainTextPasswordFromUser  = req.body.password;
  if (!email || !plainTextPasswordFromUser) {
    req.flash('error', 'Please Fill All Required Fields');
    res.redirect('/login');
  } else {
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
     req.flash('error', 'NOT A VALID LOGIN.');
     res.redirect('/login');
   });
  }
  });

//category update page
app.get("/edit", (req, res) => {
  if (!req.session.id) {
    req.flash('error', 'No user logged in');
    res.redirect('/login');
  }
  knex('items')
    .where('id', req.session.id)
    .first('*')
    .then((user) => {
      res.render('categoryedit.ejs', {
        email: user.email,
        errors: req.flash('error')
      })
    });

});


app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


