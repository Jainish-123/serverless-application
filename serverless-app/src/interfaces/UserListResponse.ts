import { User } from "./User";

export interface UserListResponse {
  Operation: string;
  Message: string;
  Users: User[];
}
