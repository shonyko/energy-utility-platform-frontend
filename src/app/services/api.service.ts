import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Credentials} from "../models/credentials";
import {RegisterDto} from "../models/register-dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(credentials: Credentials) {
    return this.http.post('http://localhost:8080/login', credentials, {
      responseType: "text"
    });
  }

  register(registerDto: RegisterDto) {
    return this.http.post('http://localhost:8080/register', registerDto, {
      responseType: "text"
    });
  }
}
