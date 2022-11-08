import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRole} from "../../enums/user-role";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  @Input() error!: string | null;

  @Output() submit = new EventEmitter();

  Roles: any = [UserRole.Client, UserRole.Admin];

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl(UserRole.Client)
  });

  constructor(private authService: AuthService) {
  }

  submitForm() {
    if(this.form.invalid) {
      return;
    }
    // if (this.form.valid) {
    //   this.submit.emit(this.form.value);
    // }
    this.authService.register(this.form.get('username')?.value, this.form.get('password')?.value, this.form.get('role')?.value).subscribe(res => console.log(res));
  }

}
