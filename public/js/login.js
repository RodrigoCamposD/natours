import axios from "axios";
import { showAlert } from "./alerts";

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        window.location.assign("/");
      }, 1500);
    }
  } catch (error) {
    console.log(error);
    showAlert("error", error.response.data.message);
  }
};

export { login };
