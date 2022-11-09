import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Address} from "../models/address";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public readonly BASE_URL = `${environment.API_URL}/api/addresses`

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.BASE_URL);
  }

  add(address: Address) {
    return this.http.post(this.BASE_URL, address);
  }

  update(address: Address) {
    return this.http.put(`${this.BASE_URL}/${address.id}`, address);
  }

  remove(id: string) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}
