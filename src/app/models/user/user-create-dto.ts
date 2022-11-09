import {Credentials} from "../credentials";
import {UserRole} from "../../enums/user-role";

export interface UserCreateDto {
  id: string,
  name: string,
  credentials: Credentials,
  role: UserRole
}
