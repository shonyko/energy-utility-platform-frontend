import {Credentials} from "../credentials";
import {UserRole} from "../../enums/user-role";

export interface User {
  id: string,
  credentials: Credentials,
  name: string,
  role: UserRole
}
