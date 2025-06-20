// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAspahfUUGnBzh0mh6U53evGQzWQP956xQ",
  authDomain: "ffassetmanager.firebaseapp.com",
  projectId: "ffassetmanager",
  storageBucket: "ffassetmanager.appspot.com",
  messagingSenderId: "803858971008",
  appId: "1:803858971008:web:72d69ddce6cbc85010a965"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = function () {
  const usernameInput = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");

  // Map username to Firebase email
  const email = usernameInput.toLowerCase() === "asset admin" ? "it@finalfunnel.com" : usernameInput;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "add-asset.html"; // Redirect to main page after login
    })
    .catch((error) => {
      console.error("Login failed:", error);
      errorDiv.textContent = "Login failed: " + error.message;
      errorDiv.classList.remove("hidden");
    });
};

// 🔐 Protect all pages (except login.html)
onAuthStateChanged(auth, (user) => {
  const isLoginPage = window.location.pathname.endsWith("login.html");
  if (!user && !isLoginPage) {
    window.location.href = "login.html";
  }
});

// 🚪 Global logout function (to be called on logout button click)
window.logout = function () {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
};
