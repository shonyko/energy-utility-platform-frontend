import { Component } from '@angular/core';
import {environment} from "../environments/environment";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'energy-utility-platform-frontend';

  constructor(private authService: AuthService) {
    console.log(environment)
    // console.log(authService.getPayload(this.authService.token));
  }
}
