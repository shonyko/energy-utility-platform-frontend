import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {WebsocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  constructor(private authService: AuthService, private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.websocketService.subscribe(this.authService.getId(), (res: any) => {
      console.log(res);
    });
  }

}
