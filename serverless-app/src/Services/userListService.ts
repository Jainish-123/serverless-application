import axios from "axios";
import { UserListResponse } from "../interfaces/UserListResponse";

const API_URL =
  "https://4d463hsd93.execute-api.us-east-1.amazonaws.com/dev/api/users";

export const userList = async (): Promise<any> => {
  const response = axios.get<UserListResponse>(`${API_URL}/user-list`);

  return response;
};
