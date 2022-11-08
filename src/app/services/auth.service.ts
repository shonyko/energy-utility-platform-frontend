import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {UserRole} from "../enums/user-role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService : ApiService) { }

  login(username: string, password: string) {
    return this.apiService.login(username, password);
  }

  register(username: string, password: string, role: UserRole) {
    return this.apiService.register(username, password, role);
  }
}
