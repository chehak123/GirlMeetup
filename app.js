require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
let port = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const  User = require("./models/user");


//Connecting database
mongoose.connect(
  "mongodb+srv://dbUser:dbUser@cluster0.uijgw.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(
  require("express-session")({
    secret: "!@#$%^&*()", 
    resave: false,
    saveUninitialized: false,
  })
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
passport.use(new LocalStrategy(User.authenticate()));

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function(req, res){
  res.render("index", {currentUser: req.user});
});

app.listen(port, function() {
  console.log("Server started on port 3000.");
});


//Auth Routes 
app.get("/login", (req, res) => {
  res.render("/" + "#login_new_user");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/" + "#login_failed",
  }),
  function (req, res) {}
);

app.get("/register", (req, res) => {
  res.render("/" + "#register_new_user");
});

app.post("/register", (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      name: req.body.name,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        console.log(req.baseUrl);
        res.redirect("/" + "#login_new_user");
      });
    }
  );
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/" + "#login");
}


