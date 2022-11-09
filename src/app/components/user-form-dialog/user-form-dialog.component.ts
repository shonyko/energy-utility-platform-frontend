import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Device} from "../../models/device/device";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user/user";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnInit {

  formInstance: FormGroup;

  deviceList!: Device[];
  selected!: Device[];
  initial!: Device[];

  model: User;

  roles = ["ADMIN", "CLIENT"]

  loading = true;

  constructor(public dialogRef: MatDialogRef<UserFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private deviceService: DeviceService, private userService: UserService) {
    this.formInstance = new FormGroup({
      id: new FormControl({
        value: ' ',
        disabled: true
      }, Validators.required),
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      devices: new FormControl('')
    });

    this.model = data?.model;
    if (data?.model) this.formInstance.setValue({
      id: this.model.id,
      name: this.model.name,
      role: this.model.role,
      username: this.model.credentials.username,
      password: this.model.credentials.password,
      devices: []
    });
  }

  ngOnInit(): void {
    this.deviceService.getAll().subscribe(data => {
      this.deviceList = data as Device[];
      console.log(this.deviceList)
      this.selected = this.deviceList.filter(dev => this.checkSelected(dev));
      this.initial = this.selected;
      this.formInstance.get("devices")?.setValue(this.selected.map(x => x.id));
      this.loading = false;
    });
  }

  save(): void {
    this.formInstance.get("id")?.enable();
    const formVal = this.formInstance.value;

    const toDelete = this.initial.filter((dev: Device) => formVal.devices.find((id: any) => dev.id == id) == null).map(x => x.id);
    const toAdd = formVal.devices.filter((id: any) => this.initial.find(x => x.id == id) == null);

    const user = {
      id: formVal.id,
      name: formVal.name,
      role: formVal.role,
      credentials: {
        username: formVal.username,
        password: formVal.password
      },
      toAdd,
      toDelete
    };
    this.dialogRef.close(user);
  }

  checkValid(field: string) {
    const errors = this.formInstance.controls[field]?.errors;
    if (!errors) return false;
    return errors['required']
  }

  checkDisabled(device: Device) {
    if(this.model == null) {
      return device.user != null;
    } else {
      if(device.user == null) return false;
      return device.user.id != this.model.id;
    }
  }

  checkSelected(device: Device) {
    if(device.user == null) return false;
    if(this.model == null) return false;
    return device.user.id == this.model.id;
  }
}
