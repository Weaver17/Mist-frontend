import { handleServerResponse } from "./constants";

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
const mockDatabase = JSON.parse(localStorage.getItem("mockUsers")) || [];

export const register = ({ username, email, password }) => {
  return new Promise((resolve, reject) => {
    console.log("Database before update:", mockDatabase);
    // Check if email already exists
    const userExists = mockDatabase.some((user) => user.email === email);
    if (userExists) {
      reject(new Error("User already exists."));
    } else {
      // Add new user to mock database
      const newUser = {
        id: Math.random() * (10 - 1) + 1,
        username, // Save username as a string
        email,
        password,
      };
      mockDatabase.push(newUser);
      console.log("Adding new user:", newUser);
      localStorage.setItem("mockUsers", JSON.stringify(mockDatabase));
      resolve({ message: "User registered successfully!" });
    }
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    // Check if user exists
    const user = mockDatabase.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      // Return a fake token
      resolve({ token: "a fake token", user });
    } else {
      reject(new Error("Invalid email or password."));
    }
  });
};

export const authorize = (email, password) => {
  // Generate a fake token (as provided)
  return new Promise((resolve) => {
    resolve({ token: "JWT_TOKEN" });
  });
};

export const checkToken = (token, email, password) => {
  return new Promise((resolve, reject) => {
    // Simulate a token validation
    if (token === "a fake token") {
      resolve({
        user: mockDatabase.find(
          (user) => user.email === email && user.password === password
        ),
      });
    } else {
      reject(new Error("Invalid token."));
    }
  });
};
