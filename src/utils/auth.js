// Mock "database" for users

// import users from "../../mockDb.json";

import { baseUrl, request } from "./constants";

export const register = ({ username, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  }).then((data) => {
    localStorage.setItem("jwt", data.token);

    return data;
  });
};

export const login = (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((data) => {
    localStorage.setItem("jwt", data.token);

    return data;
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "JWT_TOKEN") {
      resolve({ message: "wowzers" });
    } else {
      reject(new Error("Invalid token."));
    }
  });
};
