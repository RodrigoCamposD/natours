import { login, logout } from "./login";
import { displayMap } from "./displayMap";
import { updateSettings } from "./updateSettings";

const mapEl = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".nav__el--logout");
const formUpdateUser = document.querySelector(".form-user-data");
const formUpdatePassword = document.querySelector(".form-user-password");

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

if (logoutBtn) logoutBtn.addEventListener("click", logout);

if (formUpdateUser) {
  formUpdateUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    updateSettings(form, "data");
  });
}

if (formUpdatePassword) {
  formUpdatePassword.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".btn--save--password").textContent = "Updating...";
    const password = document.getElementById("password-current").value;
    const newPassword = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSettings({ newPassword, password, passwordConfirm }, "password");
    document.querySelector(".btn--save--password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}
