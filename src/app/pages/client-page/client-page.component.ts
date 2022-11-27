import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {WebsocketService} from "../../services/websocket.service";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit, OnDestroy {

  @ViewChild('notificationDialog')
  readonly notificationDialog!: SwalComponent;

  readonly title: string = "Limit exceeded!";
  warningText: string = "warning text";

  activeTab: string = "";

  constructor(private authService: AuthService, private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.websocketService.subscribe(this.authService.getId(), (res: string) => {
      this.warningText = res;
      setTimeout(() => this.notificationDialog.fire(), 0);
    });
  }

  ngOnDestroy(): void {
    this.websocketService.unsubscribe(this.authService.getId());
  }

  onTabChange(tabName: string) {
    this.activeTab = tabName;
  }
}
