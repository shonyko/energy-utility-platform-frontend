import {UserRole} from "../enums/user-role";

export interface JwtPayload {
  iss: string,
  sub: string
  roles: UserRole[],
  exp: number,
  iat: number
}
