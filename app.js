require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(session({
//   secret: "Our little secret.",
//   resave: false,
//   saveUninitialized: false
// }));



app.get("/", function(req, res){
  res.render("firstPage");
});

// app.get("/home", function(req, res){
//   res.render("home");
// });

// app.get("/register", function(req, res){
//   res.render("register");
// });

// app.get("/login", function(req, res){
//   res.render("login");
// });

// app.get("/register", function(req, res){
//   res.render("register");
// });

app.get("/secrets", function(req, res){
  User.find({"secret": {$ne: null}}, function(err, foundUsers){
    if (err){
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", {usersWithSecrets: foundUsers});
      }
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});