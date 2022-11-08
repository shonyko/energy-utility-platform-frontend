import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRole} from "../enums/user-role";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post('http://localhost:8080/login', { username, password });
  }

  register(username: string, password: string, role: UserRole) {
    return this.http.post('http://localhost:8080/register', {username, password, role});
  }
}
