import apiClient from "../../../lib/api.client";

const persistToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export async function register({ username, email, password }) {
  const response = await apiClient.post("/auth/register", {
    username,
    email,
    password,
  });

  persistToken(response.data?.token);
  return response.data;
}

export async function login({ email, password }) {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });

  persistToken(response.data?.token);
  return response.data;
}

export async function logout() {
  const response = await apiClient.get("/auth/logout");

  localStorage.removeItem("token");
  return response.data;
}

export async function getMe() {
  const response = await apiClient.get("/auth/get-me");

  return response.data;
}
