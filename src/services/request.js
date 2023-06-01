import axios from "axios";
import { DEFAULT_BASE_URL } from "../Api.constants";

export const handleLogin = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const url = `${DEFAULT_BASE_URL}users/login`;
      console.log("url: ", url);
      axios
        .post(
          url,
          { email: email, password: password },
          {
            headers,
          }
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.log("Login Error: ", err);
        });
    } catch (err) {
      reject(err);
      console.log("handleLogin catch Error: ", err);
    }
  });
