"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || "development";
const express       = require("express");
const bodyParser    = require("body-parser");
const sass          = require("node-sass-middleware");
const app           = express();

const knexConfig    = require("./knexfile");
const knex          = require("knex")(knexConfig[ENV]);
const morgan        = require('morgan');
const knexLogger    = require('knex-logger');
const cookieSession = require('cookie-session');
const bcrypt        = require('bcrypt');

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

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/overlay", (req, res) => {
  res.render("overlay");
});
//user registration
app.post("/register", (req, res) => {
  const { registeremail, registerpassword } = req.body;
  knex('users')
  .insert({ email: registeremail, password: registerpassword })
  .then(function (result) {
      console.log("done")
  })
  console.log(registeremail);
  req.session.registeremail = registeremail;
  res.redirect('/homepage');
});

//Login page
app.get("/login", (req, res) => {
  // if req.session.email {
  //   res.status(400).send("User already signed in");
  //   res.redirect('/homepage')
  // }
  res.render("login");
});

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
// knex('users').insert({email:})
//       }
//     } else {
//       res.status(403).send("Not a valid login");
//       res.redirect('/login');
//     }
//   }
// });

app.get("/homepage", (req, res) => {
  res.render("homepage.ejs");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
