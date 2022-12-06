import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  ChatMessage,
  Message,
  MessageReadNotification,
  MessageType,
  Subscription,
  TypingNotification
} from '../../grpc/generated/ChatService_pb'
import {ChatServiceClient, ResponseStream} from "../../grpc/generated/ChatService_pb_service";
import {User} from "../../models/user/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {UserRole} from "../../enums/user-role";
import {environment} from "../../../environments/environment";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";

// import * as grpc from 'grpc';
// import { load } from '@grpc/proto-loader';

interface ChatMessageProps {
  content: string,
  mine: boolean
}

interface ChatMetadata {
  messages: ChatMessageProps[];
  seenCnt: number;
  isTyping: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  readonly SAD_FACE_URL: string = `/assets/unhappy-face.jpg`;
  readonly MAGNIFYING_GLASS_URL: string = `/assets/magnifying-glass.png`;

  grpcClient!: ChatServiceClient;
  grpcSubscription!: Subscription;
  grpcStream!: ResponseStream<Message>;
  grpcChatMessage!: ChatMessage;
  grpcTypingNotification!: TypingNotification;
  grpcMessageReadNotification!: MessageReadNotification;

  typingNotificationTimeout: any;
  stopTypingNotificationTimeout: any;

  message: string = "";

  isLoading: boolean = true;

  users: User[] = [];
  usersMap: Map<string, ChatMetadata> = new Map<string, ChatMetadata>();

  selectedUser: User | null = null;


  @ViewChild('notificationDialog')
  readonly notificationDialog!: SwalComponent;
  dialogText: string = "";
  dialogTitle: string = "Message read"

  constructor(private userService: UserService, private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    const role = this.authService.getRoles()[0];
    const roleToQuery = role == UserRole.Admin ? UserRole.Client : UserRole.Admin;
    this.userService.getByRole(roleToQuery).subscribe((data) => {
      this.users = data as User[];
      this.users.forEach(user => {
        this.usersMap.set(user.id, {
          messages: [],
          seenCnt: 0,
          isTyping: false
        });
      });
      this.isLoading = false;
    });

    const id = this.authService.getId();

    this.grpcSubscription = new Subscription();
    this.grpcSubscription.setId(id);

    this.grpcChatMessage = new ChatMessage();
    this.grpcChatMessage.setFrom(id);

    this.grpcTypingNotification = new TypingNotification();
    this.grpcTypingNotification.setFrom(id);

    this.grpcMessageReadNotification = new MessageReadNotification();
    this.grpcMessageReadNotification.setFrom(id);

    this.grpcClient = new ChatServiceClient(environment.GRPC_URL);
    this.grpcStream = this.grpcClient.subscribeToChat(this.grpcSubscription);
    this.grpcStream.on("data", msg => {
      console.log(msg);

      if(msg.getMessagetype() == MessageType.CHAT_MESSAGE) {
        const chatMessage = msg.getChatmessage();

        const id = chatMessage?.getFrom() ?? "";
        const metadata = this.usersMap.get(id);
        if(!metadata) return;

        const content = chatMessage?.getMessage() ?? "";
        metadata.messages.push({
          content: content,
          mine: false
        });
        return;
      }

      if(msg.getMessagetype() == MessageType.TYPING_NOTIFICATION) {
        const notification = msg.getTypingnotification();

        const id = notification?.getFrom() ?? "";
        const metadata = this.usersMap.get(id);
        if(!metadata) return;

        metadata.isTyping = notification?.getIstyping() ?? false;
        return;
      }

      if(msg.getMessagetype() == MessageType.MESSAGE_READ_NOTIFICATION) {
        const notification = msg.getMessagereadnotification();

        const id = notification?.getFrom() ?? "";
        this.dialogText = `${id} read your messages!`;

        setTimeout(() => this.notificationDialog.fire(), 0);
        return;
      }
    });
    this.grpcStream.on("end", _ => {
      console.log("grpc disconnected");
    });
  }

  ngOnDestroy(): void {
    this.grpcClient.unsubscribeFromChat(this.grpcSubscription, (error, _) => {
      if(error) {
        console.warn("Encountered an error while unsubscribing from chat!");
        console.error(error);
      }
    });
  }

  get hasUsers() {
    return this.users.length != 0;
  }

  get hasSelectedUser() {
    return this.selectedUser != null;
  }

  get title() {
    if(this.authService.getRoles()[0] == UserRole.Admin) return "Clients";
    return "Admins";
  }

  getMessages() {
    const id = this.selectedUser?.id ?? "";

    const metadata = this.usersMap.get(id);
    if(!metadata) return [];

    return metadata.messages;
  }

  selectUser(user: User | null) {
    this.selectedUser = user;
    if(user == null) return;

    const id = this.selectedUser?.id ?? "";
    const metadata = this.usersMap.get(id);
    if(!metadata) return;

    if (metadata.messages.length != metadata.seenCnt) {
      this.sendReadMessageNotification();
      metadata.seenCnt = metadata.messages.length;
    }
  }

  handleKeyUp(e: Event) {
    this.message = (e.target as any).value;
    this.sendTypingNotification((e as any).key);
  }

  sendMessage() {
    console.log("send msg");

    const id = this.selectedUser?.id ?? "";

    const msg = this.grpcChatMessage;
    msg.setMessage(this.message);
    msg.setTo(id);

    this.grpcClient.sendMessage(msg, (err, _) => {
        if(err) {
          console.log("Error sending message!")
          console.error(err)
          return;
        }
    });

    const metadata = this.usersMap.get(id);
    if(!metadata) return;

    metadata.messages.push({
      content: this.message,
      mine: true
    });

    metadata.seenCnt++;

    this.message = "";
  }

  sendTypingNotification(key: string) {
    if(key == "Enter") return;
    console.log("typing...");

    const id = this.selectedUser?.id ?? "";

    clearTimeout(this.stopTypingNotificationTimeout);
    this.stopTypingNotificationTimeout = setTimeout(() => {
      console.log("merge")
      const notification = this.grpcTypingNotification;
      notification.setIstyping(false);
      notification.setTo(id);

      this.grpcClient.sendTypingNotification(notification, (err, _) => {
        if(err) {
          console.log("Error sending message!")
          console.error(err)
          return;
        }
      });

      this.typingNotificationTimeout = null;
    }, 1000);

    if(this.typingNotificationTimeout != null) return;
    this.typingNotificationTimeout = true;

    const notification = this.grpcTypingNotification;
    notification.setIstyping(true);
    notification.setTo(id);

    this.grpcClient.sendTypingNotification(notification, (err, _) => {
      if(err) {
        console.log("Error sending message!")
        console.error(err)
        return;
      }
    });
  }

  sendReadMessageNotification() {
    console.log("read message");

    const id = this.selectedUser?.id ?? "";

    const notification = this.grpcMessageReadNotification;
    notification.setTo(id);

    this.grpcClient.sendMessageReadNotification(notification, (err, _) => {
      if(err) {
        console.log("Error sending message!")
        console.error(err)
        return;
      }
    });
  }
}
