import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
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

  add(Device: Device) {
    // this.devices.push(Device);
  }

  edit(Device: Device) {
    // let findElem = this.devices.find(p => p.id == Device.id);
    // findElem.firstName = Device.firstName;
    // findElem.age = Device.age;
    // findElem.job = Device.job;
    // this.devices$.next(this.devices);
  }

  remove(id: number) {

    // this.devices = this.devices.filter(p => {
    //   return p.id != id
    // });
    //
    // this.devices$.next(this.devices);
  }
}
