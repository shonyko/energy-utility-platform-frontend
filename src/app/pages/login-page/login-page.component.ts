import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService, private router: Router) {
  }

  async submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login({
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    }).subscribe({
      next: _ => {
        const role = this.authService.getRoles()[0];
        this.router.navigate([role.toLowerCase()]);
      },
      error: _ => {
        this.error = "Wrong username or password!";
      }
    })
  }
}
