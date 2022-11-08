import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  error!: string | null;

  @Output() submit = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value).subscribe(res => console.log(res));
  }
}
