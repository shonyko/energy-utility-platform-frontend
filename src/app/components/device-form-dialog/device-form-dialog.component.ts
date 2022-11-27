import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Device} from "../../models/device/device";
import {Address} from "../../models/address";
import {AddressService} from "../../services/address.service";

@Component({
  selector: 'app-device-form-dialog',
  templateUrl: './device-form-dialog.component.html',
  styleUrls: ['./device-form-dialog.component.scss']
})
export class DeviceFormDialogComponent implements OnInit {

  formInstance: FormGroup;

  addressList!: Address[];
  selectedAddr?: Address;

  model: Device;

  loading = true;

  constructor(public dialogRef: MatDialogRef<DeviceFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private addressService: AddressService) {
    this.formInstance = new FormGroup({
      id: new FormControl({
        value: ' ',
        disabled: true
      }, Validators.required),
      description: new FormControl('', Validators.required),
      maxHourlyConsumption: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });

    this.model = data?.model;
    if (data?.model) this.formInstance.setValue({
      id: data.model.id,
      description: data.model.description,
      maxHourlyConsumption: data.model.maxHourlyConsumption,
      address: data.model.address.id
    });
  }

  ngOnInit(): void {
    this.addressService.getAll().subscribe(data => {
      this.addressList = data as Address[];
      this.selectedAddr = this.addressList.find(x => x.id == this.model?.address.id)
      this.loading = false;
    });
  }

  save(): void {
    this.formInstance.get("id")?.enable();
    const formVal = this.formInstance.value;
    const device = {
      id: formVal.id,
      description: formVal.description,
      addressId: formVal.address,
      maxHourlyConsumption: formVal.maxHourlyConsumption,
      user: null
    };
    this.dialogRef.close(device);
  }

  checkValid(field: string) {
    const errors = this.formInstance.controls[field]?.errors;
    if (!errors) return false;
    return errors['required']
  }

}
