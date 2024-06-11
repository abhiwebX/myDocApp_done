import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHShD20aBvahA-ZrrkkVdWcdTnYzvzCWk",
  authDomain: "mydocapp-6f500.firebaseapp.com",
  databaseURL: "https://mydocapp-6f500-default-rtdb.firebaseio.com",
  projectId: "mydocapp-6f500",
  storageBucket: "mydocapp-6f500.appspot.com",
  messagingSenderId: "1002186681260",
  appId: "1:1002186681260:web:e67f549b459681a5ee2809"
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
