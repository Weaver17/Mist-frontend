// import { handleServerRes } from "./constants";

// export const authorize = (username, email, password) => {
//   // Pretend we did a fetch request that gave us back a token
//   return new Promise((resolve, reject) => {
//     resolve({ token: "a fake token" });
//   });
// };

// export const checkToken = (token) => {
//   // Pretend we did a fetch request that gave us back a user
//   return new Promise((resolve, reject) => {
//     resolve({
//       data: {
//         _id: "fake-id1",
//         username: "Daus",
//         email: "fake@example.com",
//         password: "12345",
//       },
//     });
//   });
// };

// Mock "database" for users
const API_URL = "http://localhost:3004/users";

import users from "../../mockDb.json";

export const register = ({ username, email, password }) => {
  return new Promise((resolve, reject) => {
    // Check if email already exists
    fetch(`${API_URL}?email=${email}`)
      .then((res) => res.json())
      .then((users) => {
        if (users.length > 0) {
          reject(new Error("User already exists."));
        } else {
          // Create a new user
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

export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "JWT_TOKEN" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    if (token === "a fake token") {
      resolve({ email: users }); // Mocked user data from token
    } else {
      reject(new Error("Invalid token."));
    }
  });
};
