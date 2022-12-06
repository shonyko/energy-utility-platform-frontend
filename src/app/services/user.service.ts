import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user/user";
import {UserRole} from "../enums/user-role";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public readonly BASE_URL = `${environment.API_URL}/api/users`

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.BASE_URL);
  }

  getByRole(role: UserRole) {
    return this.http.get(`${this.BASE_URL}/by-role/${role.toString()}`);
  }

  add(user: User) {
    return this.http.post(this.BASE_URL, user);
  }

  update(user: User) {
    return this.http.put(`${this.BASE_URL}/${user.id}`, user);
  }

  remove(id: string) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }

  getDevices(userId: string) {
    return this.http.get(`${this.BASE_URL}/${userId}/devices`)
  }

  addDevice(userId: string, deviceId: string) {
    return this.http.post(`${this.BASE_URL}/${userId}/devices/${deviceId}`, null);
  }

  removeDevice(userId: string, deviceId: string) {
    return this.http.delete(`${this.BASE_URL}/${userId}/devices/${deviceId}`);
  }
}
