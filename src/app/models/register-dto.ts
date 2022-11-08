import {Credentials} from "./credentials";
import {UserRole} from "../enums/user-role";

export interface RegisterDto {
  name: string,
  credentials: Credentials,
  role: UserRole
}
