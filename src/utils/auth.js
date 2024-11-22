// Mock "database" for users
const API_URL = "http://localhost:3004/users";

import users from "../../mockDb.json";

export const register = ({ username, email, password }) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}?email=${email}`)
      .then((res) => res.json())
      .then((users) => {
        if (users.length > 0) {
          reject(new Error("User already exists."));
        } else {
          const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password,
          };

          return fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });
        }
      })
      .then(() => {
        resolve({ message: "User registered successfully!" });
      })
      .catch((error) => {
        reject(new Error(`Registration failed: ${error.message}`));
      });
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}?email=${email}&password=${password}`)
      .then((res) => res.json())
      .then((users) => {
        if (users.length === 0) {
          reject(new Error("Invalid email or password."));
        } else {
          resolve({ token: "a fake token", user: users[0] });
        }
      })
      .catch((error) => {
        reject(new Error(`Login failed: ${error.message}`));
      });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "a fake token") {
      resolve({ email: users });
    } else {
      reject(new Error("Invalid token."));
    }
  });
};