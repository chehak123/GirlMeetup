require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

let port = process.env.PORT || 3000
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const  User = require("./models/user");
const request = require('request');

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

  res.render("index");

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

app.get("/faq", (req, res) => {
  res.render("faq",{currentUser: req.user});
});



app.get("/blog_gallery", (req, res) => {
  res.render("blog_gallery",{currentUser: req.user});
});

app.get("/blog", (req, res) => {
  res.render("blog",{currentUser: req.user});
});

app.get("/success", (req, res) => {
  res.render("success",{currentUser: req.user});
});

app.get("/failure", (req, res) => {
  res.render("failure",{currentUser: req.user});
});

app.post("/newsletter", (req,res)=> {
  var Name = req.body.name;
  var Email = req.body.email;

  var data = {
    members: [
      {
        email_address: Email,
        status: "subscribed",
        merge_fields:{
          FNAME: Name
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url : "https://us7.api.mailchimp.com/3.0/lists/836f8723ea",
    method: "POST",
    headers: {
      "Authorization":"Personal 9a289c1e24545e876ec5bc9c62a09ae2-us7"
    },
    body:jsonData
  };

  request(options,(error,response,body)=>{
    if(error){
      res.redirect('/failure')
    } else {
      if(response.statusCode === 200){
        res.redirect('/success');
      } else {
        res.redirect('/failure');
      }      
    }
  })
});

app.listen(port, function() {
  console.log("Server started on port 3000.");
});

//9a289c1e24545e876ec5bc9c62a09ae2-us7 api key
//836f8723ea list