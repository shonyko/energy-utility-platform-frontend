import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Credentials} from "../models/credentials";
import {RegisterDto} from "../models/register-dto";
import {environment} from "../../environments/environment";

const BASE_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(credentials: Credentials) {
    return this.http.post(`${BASE_URL}/login`, credentials, {
      responseType: "text"
    });
  }

  register(registerDto: RegisterDto) {
    return this.http.post(`${BASE_URL}/register`, registerDto, {
      responseType: "text"
    });
  }
}
