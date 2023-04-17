const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.remove();
};

const showAlert = (type, msg) => {
  hideAlert();
  const makup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", makup);
  window.setTimeout(hideAlert, 5000);
};

export { showAlert, hideAlert };
