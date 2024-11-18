import { handleServerResponse } from "./constants";

export const authorize = (username, email, password) => {
  // Pretend we did a fetch request that gave us back a token
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  // Pretend we did a fetch request that gave us back a user
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        id: "fake-id",
        username: "Daus",
        email: "fake@example.com",

        password: "12345",
      },
    });
  });
};
