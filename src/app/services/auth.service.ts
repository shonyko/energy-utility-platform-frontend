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
  private payload!: JwtPayload;

  constructor(private apiService: ApiService) {
    const token = localStorage.getItem(this.TOKEN_NAME) ?? "";
    this._isLoggedIn = !!token;
    this._isLoggedIn$.next(this._isLoggedIn);
    if (!this._isLoggedIn) return;
    this.payload = this.getPayload(token);
    console.log(this.payload)
  }

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }

  private _isLoggedIn: boolean;

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  get token() {
    return localStorage.getItem(this.TOKEN_NAME) ?? '';
  }

  login(credentials: Credentials) {
    return this.apiService.login(credentials).pipe(tap(token => {
      this._isLoggedIn$.next(true);
      this._isLoggedIn = true;
      localStorage.setItem('token', token);
      this.payload = this.getPayload(token);
    }));
  }

  register(registerDto: RegisterDto) {
    return this.apiService.register(registerDto).pipe(tap(token => {
      this._isLoggedIn$.next(true);
      this._isLoggedIn = true;
      localStorage.setItem('token', token);
      this.payload = this.getPayload(token);
    }));;
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
