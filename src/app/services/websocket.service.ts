import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {RxStomp} from "@stomp/rx-stomp";
import {RxStompState} from "@stomp/rx-stomp/esm6/rx-stomp-state";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: RxStomp;

  private map: Map<string, Subscription> = new Map();

  constructor() {
    this.stompClient = new RxStomp();
    this.stompClient.configure({
      // webSocketFactory: () => new WebSocket(`ws://${environment.WS_URL}/ws`)
      webSocketFactory: () => new WebSocket(`ws://${window.location.host}/backend/ws`)
    });
  }

  public subscribe(topic: string, cb: any): void {
    const listen = () => {
      const subscription = this.stompClient.watch(`/topic/${topic}`).subscribe(frame => cb(frame.body));
      this.map.set(topic, subscription);
    }

    if (this.stompClient.connected()) {
      return listen();
    }

    this.stompClient.activate();
    const subscription = this.stompClient.connected$.subscribe((state: RxStompState) => {
      if (state != RxStompState.OPEN) return;
      listen();
      subscription.unsubscribe();
    })
  }

  public unsubscribe(topic: string): void {
    const subscription = this.map.get(topic);
    subscription?.unsubscribe();
    this.map.delete(topic);
  }
}
