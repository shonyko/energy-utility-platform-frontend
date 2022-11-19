import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {RxStomp} from "@stomp/rx-stomp";
import {RxStompState} from "@stomp/rx-stomp/esm6/rx-stomp-state";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: RxStomp;

  constructor() {
    this.stompClient = new RxStomp();
    this.stompClient.configure({
      webSocketFactory: () => new WebSocket(`ws://${environment.API_URI}/ws`)
    });
  }

  public subscribe(topic: string, cb: any): void {
    const listen = () => this.stompClient.watch(`/topic/${topic}`).subscribe(frame => cb(frame.body));

    if (this.stompClient.connected()) {
      listen();
    }

    this.stompClient.activate();
    const subscription = this.stompClient.connected$.subscribe((state: RxStompState) => {
      if (state != RxStompState.OPEN) return;
      listen();
      subscription.unsubscribe();
    })
  }
}
