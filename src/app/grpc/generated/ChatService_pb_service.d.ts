// package: ro.alexk.energyutilityplatformbackend.grpc
// file: ChatService.proto

import * as ChatService_pb from "./ChatService_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ChatServicesubscribeToChat = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof ChatService_pb.Subscription;
  readonly responseType: typeof ChatService_pb.Message;
};

type ChatServiceunsubscribeFromChat = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ChatService_pb.Subscription;
  readonly responseType: typeof ChatService_pb.nothing;
};

type ChatServicesendMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ChatService_pb.Message;
  readonly responseType: typeof ChatService_pb.nothing;
};

type ChatServicesendTypingNotification = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ChatService_pb.TypingNotification;
  readonly responseType: typeof ChatService_pb.nothing;
};

type ChatServicesendMessageReadNotification = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ChatService_pb.MessageReadNotification;
  readonly responseType: typeof ChatService_pb.nothing;
};

export class ChatService {
  static readonly serviceName: string;
  static readonly subscribeToChat: ChatServicesubscribeToChat;
  static readonly unsubscribeFromChat: ChatServiceunsubscribeFromChat;
  static readonly sendMessage: ChatServicesendMessage;
  static readonly sendTypingNotification: ChatServicesendTypingNotification;
  static readonly sendMessageReadNotification: ChatServicesendMessageReadNotification;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ChatServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  subscribeToChat(requestMessage: ChatService_pb.Subscription, metadata?: grpc.Metadata): ResponseStream<ChatService_pb.Message>;
  unsubscribeFromChat(
    requestMessage: ChatService_pb.Subscription,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ChatService_pb.nothing|null) => void
  ): UnaryResponse;
  unsubscribeFromChat(
    requestMessage: ChatService_pb.Subscription,
    callback: (error: ServiceError|null, responseMessage: ChatService_pb.nothing|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: ChatService_pb.Message,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ChatService_pb.nothing|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: ChatService_pb.Message,
    callback: (error: ServiceError|null, responseMessage: ChatService_pb.nothing|null) => void
  ): UnaryResponse;
  sendTypingNotification(
    requestMessage: ChatService_pb.TypingNotification,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ChatService_pb.nothing|null) => void
  ): UnaryResponse;
  sendTypingNotification(
    requestMessage: ChatService_pb.TypingNotification,
    callback: (error: ServiceError|null, responseMessage: ChatService_pb.nothing|null) => void
  ): UnaryResponse;
  sendMessageReadNotification(
    requestMessage: ChatService_pb.MessageReadNotification,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ChatService_pb.nothing|null) => void
  ): UnaryResponse;
  sendMessageReadNotification(
    requestMessage: ChatService_pb.MessageReadNotification,
    callback: (error: ServiceError|null, responseMessage: ChatService_pb.nothing|null) => void
  ): UnaryResponse;
}

