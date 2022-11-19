import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {WebsocketService} from "../../services/websocket.service";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  @ViewChild('notificationDialog')
  readonly notificationDialog!: SwalComponent;

  readonly title: string = "Limit exceeded!";
  warningText   : string = "warning text";

  constructor(private authService: AuthService, private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.websocketService.subscribe(this.authService.getId(), (res: string) => {
      this.warningText = res;
      this.notificationDialog.fire();
    });
  }

}
