import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {UserRole} from "../enums/user-role";
import {Credentials} from "../models/credentials";
import {RegisterDto} from "../models/register-dto";
import {BehaviorSubject, tap} from "rxjs";
import {JwtPayload} from "../models/jwt-payload";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_NAME: string = 'token';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }

  private payload: JwtPayload;

  get token() {
    return localStorage.getItem(this.TOKEN_NAME) ?? '';
  }

  constructor(private apiService: ApiService) {
    const token = localStorage.getItem(this.TOKEN_NAME) ?? "";
    this._isLoggedIn$.next(!!token);
    this.payload = this.getPayload(token);
    console.log(this.payload)
  }

  login(credentials: Credentials) {
    return this.apiService.login(credentials).pipe(tap(token => {
      this._isLoggedIn$.next(true);
      localStorage.setItem('token', token);
      this.payload = this.getPayload(token);
    }));
  }

  register(registerDto: RegisterDto) {
    return this.apiService.register(registerDto);
  }

  getPayload(token: string): JwtPayload {
    const data = token.split('.')[1] as string;
    const res = JSON.parse(atob(data).toString());
    res.roles = res.roles.map((role: any) => role.replace("ROLE_", ""))
    return res;
  }

  getId(): string {
    return this.payload.sub ?? "";
  }

  getRoles(): UserRole[] {
    return this.payload.roles ?? [];
  }
}
