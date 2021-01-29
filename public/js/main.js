//Modal Cotroller
let x = document.getElementById("login");
var y = document.getElementById("signup");
var z = document.getElementById("change");
var a = document.getElementById("loginchange");
var b = document.getElementById("_btn");
var open = document.getElementById("modal");

function signup() {
  y.style.visibility = "visible";
  x.style.left = "-400px";
  y.style.left = "50px";
  z.className = "toggle-btn active";
  a.className = "toggle-btn";
  z.style.width = "120px";
}
function login() {
  x.style.color = "grey";
  x.style.left = "50px";
  y.style.left = "450px";
  z.className = "toggle-btn";
  a.className = "toggle-btn active";
  z.style.width = "100px";
}

const modal = document.getElementById("modal");
// Get Modal Button
const btn = document.getElementById("modal_btn");
//Get Close Button
const closebtn = document.querySelector(".close-btn");
const toast = document.getElementById("toast_message");
const toast_color = document.getElementById("toast_color");
const toast_title = document.getElementById("toast_title");

//show modal on button click
btn.addEventListener("click", function () {
  modal.style.display = "block";
});

//close modal on button click
closebtn.addEventListener("click", function () {
  modal.style.display = "none";
});

if (location.hash === "#login_failed") {
  $(".toast").toast("show");
  toast.innerText = "Invalid Username or Password!";
}

if (location.hash === "#login") {
  modal.style.display = "block";
}

if (location.hash === "#login_new_user") {
  $(".toast").toast("show");
  toast_color.style.backgroundColor = "green";
  toast_title.innerHTML = "Message!";
  toast.innerText =
    "Congratulations! account created successfully, Please login to Continue!";
  modal.style.display = "block";
}
