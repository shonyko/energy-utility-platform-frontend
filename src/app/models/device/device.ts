import {Address} from "../address";
import {User} from "../user/user";

export interface Device {
  id: string,
  description: string,
  address: Address,
  maxHourlyConsumption: number,
  user: User
}
