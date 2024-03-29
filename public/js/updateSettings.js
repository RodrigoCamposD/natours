import axios from "axios";
import { showAlert } from "./alerts";

const updateSettings = async (data, type) => {
  try {
    const url = type === "password"
      ? "http://127.0.0.1:3000/api/v1/users/updatePassword"
      : "http://127.0.0.1:3000/api/v1/users/updateMe";
    const res = await axios({
      method: "PATCH",
      url,
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", `Settings ${type.toUpperCase()} updated!`);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
  }
};

export { updateSettings };
