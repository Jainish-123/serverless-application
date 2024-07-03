import axios from "axios";

const API_URL =
  "https://4d463hsd93.execute-api.us-east-1.amazonaws.com/dev/api/users";

export const signup = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  return await axios.post(`${API_URL}/signup`, {
    email,
    password,
    firstname,
    lastname,
  });
};

export const login = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};
