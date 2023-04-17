import { login } from "./login";
import { displayMap } from "./displayMap";

const mapEl = document.getElementById("map");
const loginForm = document.querySelector(".form");

if (mapEl) {
  const locations = JSON.parse(document.getElementById("map").dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}
