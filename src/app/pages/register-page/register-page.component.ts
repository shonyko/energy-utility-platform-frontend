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
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl(UserRole.Client)
  });

  constructor(private authService: AuthService) {
  }

  async submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.authService.register({
      name: this.form.get('name')?.value,
      credentials: {
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value,
      },
      role: this.form.get('role')?.value
    }).subscribe();
  }

}
