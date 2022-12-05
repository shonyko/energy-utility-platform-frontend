// package: ro.alexk.energyutilityplatformbackend.grpc
// file: ChatService.proto

import * as jspb from "google-protobuf";

export class Message extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): void;

  getTo(): string;
  setTo(value: string): void;

  getTimestamp(): string;
  setTimestamp(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    from: string,
    to: string,
    timestamp: string,
    message: string,
  }
}

export class TypingNotification extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): void;

  getTo(): string;
  setTo(value: string): void;

  getIstyping(): boolean;
  setIstyping(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TypingNotification.AsObject;
  static toObject(includeInstance: boolean, msg: TypingNotification): TypingNotification.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TypingNotification, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TypingNotification;
  static deserializeBinaryFromReader(message: TypingNotification, reader: jspb.BinaryReader): TypingNotification;
}

export namespace TypingNotification {
  export type AsObject = {
    from: string,
    to: string,
    istyping: boolean,
  }
}

export class MessageReadNotification extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): void;

  getTo(): string;
  setTo(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageReadNotification.AsObject;
  static toObject(includeInstance: boolean, msg: MessageReadNotification): MessageReadNotification.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageReadNotification, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageReadNotification;
  static deserializeBinaryFromReader(message: MessageReadNotification, reader: jspb.BinaryReader): MessageReadNotification;
}

export namespace MessageReadNotification {
  export type AsObject = {
    from: string,
    to: string,
  }
}

export class Subscription extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getRole(): string;
  setRole(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Subscription.AsObject;
  static toObject(includeInstance: boolean, msg: Subscription): Subscription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Subscription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Subscription;
  static deserializeBinaryFromReader(message: Subscription, reader: jspb.BinaryReader): Subscription;
}

export namespace Subscription {
  export type AsObject = {
    id: string,
    role: string,
  }
}

export class nothing extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): nothing.AsObject;
  static toObject(includeInstance: boolean, msg: nothing): nothing.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: nothing, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): nothing;
  static deserializeBinaryFromReader(message: nothing, reader: jspb.BinaryReader): nothing;
}

export namespace nothing {
  export type AsObject = {
  }
}

