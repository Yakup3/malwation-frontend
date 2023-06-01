import axios from "axios";
import { DEFAULT_BASE_URL } from "../Api.constants";
import { LOCAL_STORAGE } from "../shared.constants";

const getToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  return token;
};

export const handleLogin = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const url = `${DEFAULT_BASE_URL}users/login`;

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

export const fetchEventById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getToken();

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      };

      const url = `${DEFAULT_BASE_URL}events/${id}`;

      axios
        .get(url, {
          headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.log("fetch Event By ID error: ", err);
        });
    } catch (err) {
      reject(err);
      console.log("fetchEventById catch Error: ", err);
    }
  });

export const fetchEvents = () =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getToken();

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      };

      const url = `${DEFAULT_BASE_URL}events/`;

      axios
        .get(url, {
          headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.log("fetch Events error: ", err);
        });
    } catch (err) {
      reject(err);
      console.log("fetchEvents catch Error: ", err);
    }
  });

export const updateEventById = (id, event) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getToken();

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      };

      const url = `${DEFAULT_BASE_URL}events/update/${id}`;

      axios
        .put(url, event, {
          headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.log("update Event error: ", err);
        });
    } catch (err) {
      reject(err);
      console.log("updateEvent catch Error: ", err);
    }
  });

export const deleteEventById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getToken();

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      };

      const url = `${DEFAULT_BASE_URL}events/${id}`;

      axios
        .delete(url, {
          headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.log("delete Event error: ", err);
        });
    } catch (err) {
      reject(err);
      console.log("deleteEvent catch Error: ", err);
    }
  });

export const createEvent = (event) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getToken();

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      };

      const url = `${DEFAULT_BASE_URL}events/create`;

      axios
        .post(url, event, {
          headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.log("add Event error: ", err);
        });
    } catch (err) {
      reject(err);
      console.log("addEvent catch Error: ", err);
    }
  });
