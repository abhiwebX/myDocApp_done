import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9kkGh8iepJA52PMDLmpwVtcrEyh98rek",
  authDomain: "myapp2-bcd98.firebaseapp.com",
  databaseURL: "https://myapp2-bcd98-default-rtdb.firebaseio.com",
  projectId: "myapp2-bcd98",
  storageBucket: "myapp2-bcd98.appspot.com",
  messagingSenderId: "936569646334",
  appId: "1:936569646334:web:3907570ba67433369949af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var database = getDatabase();

document.getElementById("btnis").addEventListener("click", function (e) {
  e.preventDefault();
  let username = document.getElementById("Signupname").value;
  localStorage.setItem("foriginekey", username);
  let email = document.getElementById("Signupemail").value;
  let password = document.getElementById("signuppassword").value;

  set(ref(database, "UserAuth/" + username), {
    username: username,
    email: email,
    password: password,
  });

  swal("Good job!", "You Successfully Sign up!", "success");

  document.getElementById("Signupname").value = "";
  document.getElementById("Signupemail").value = "";
  document.getElementById("signuppassword").value = "";
});

/// approving user request and entery
document.getElementById("Authapped").addEventListener("click", function (e) {
  e.preventDefault();
  let logemail = document.getElementById("authemail").value;
  let logpass = document.getElementById("authpass").value;
  localStorage.setItem("primaryKey", logemail);
  const dbref = ref(database);
  get(child(dbref, "UserAuth/")).then((snapshot) => {
    let darray = [];
    snapshot.forEach((childSnapshot) => {
      darray.push(childSnapshot.val());
    });
    darray.map((e) => {
      if (logemail == e.email && logpass == e.password) {
        window.location.href = "./pages/home.html";
      }
    });
    document.getElementById("authemail").value = "";
    document.getElementById("authpass").value = "";
  });
});
