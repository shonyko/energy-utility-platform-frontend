import {Injectable} from '@angular/core';
import {Device} from "../models/device/device";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  public readonly BASE_URL = `${environment.API_URL}/api/devices`

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.BASE_URL);
  }

  add(device: Device) {
    return this.http.post(this.BASE_URL, device);
  }

  update(device: Device) {
    return this.http.put(`${this.BASE_URL}/${device.id}`, device);
  }

  remove(id: string) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}
