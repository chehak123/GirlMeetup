require("dotenv").config();
const express = require("express"),
  port = process.env.PORT || 3000,
  app = express(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user");

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

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//=======================
//      R O U T E S
//=======================

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", isLoggedIn, (req, res) => {
  res.render("home");
  //   { name: req.name }
});

//Auth Routes
app.get("/login", (req, res) => {
  res.render("/" + "#login_new_user");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
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

//Listen On Server
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started At Port 3000");
  }
});
