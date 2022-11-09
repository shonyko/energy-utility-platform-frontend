import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Address} from "../../models/address";

@Component({
  selector: 'app-address-form-dialog',
  templateUrl: './address-form-dialog.component.html',
  styleUrls: ['./address-form-dialog.component.scss']
})
export class AddressFormDialogComponent implements OnInit {

  formInstance: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddressFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formInstance = new FormGroup({
      id: new FormControl({
        value: '',
        disabled: data?.model ?? false
      }, Validators.required),
      name: new FormControl('', Validators.required),
    });

    if(data?.model) this.formInstance.setValue(data.model as Address);
  }

  ngOnInit(): void {

  }

  save(): void {
    this.formInstance.get('id')?.enable();
    this.dialogRef.close(Object.assign({}, this.formInstance.value));
  }

  checkValid(field: string) {
    const errors = this.formInstance.controls[field]?.errors;
    if (!errors) return false;
    return errors['required']
  }

}
