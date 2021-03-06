import * as account from "./account";
export type Account = account.Account;
export type UserAccount = account.UserAccount;

import * as api from "./api";
export type Api = api.Api;
export namespace Api {
  export type CreateDiscussionOptions = api.CreateDiscussionOptions;
  export type GetDiscussionsOptions = api.GetDiscussionsOptions;
  export type GetMessagesFromDiscussionOptions = api.GetMessagesFromDiscussionOptions;
  export type NewMessage = api.NewMessage;
  export namespace events {
    export const EVENT = api.events.EVENT;
    export type EventHandler = api.events.EventHandler;
    export const MESSAGE = api.events.MESSAGE;
    export type MessageEvent = api.events.MessageEvent;
    export type MessageHandler = api.events.MessageHandler;
    export const MESSAGE_SENT = api.events.MESSAGE_SENT;
    export type MessageSentHandler = api.events.MessageSentHandler;
    export const MESSAGE_RECEIVED = api.events.MESSAGE_RECEIVED;
    export type MessageReceivedHandler = api.events.MessageReceivedHandler;
    export const CONTACT_REQUEST = api.events.CONTACT_REQUEST;
    export type ContactRequestHandler = api.events.ContactRequestHandler;
    export const DISCUSSION_RENAMED = api.events.DISCUSSION_RENAMED;
    export type DiscussionRenamedHandler = api.events.DiscussionRenamedHandler;
  }
}

import * as connection from "./connection";
export type Connection = connection.Connection;
export namespace Connection {
  export type Constructor<O, C extends connection.Connection> = connection.Constructor<O, C>;
  export namespace events {
    export const CONNECTED = connection.events.CONNECTED;
    export type ConnectedHandler = connection.events.ConnectedHandler;
    export const DISCONNECTED = connection.events.DISCONNECTED;
    export type DisconnectedHandler = connection.events.DisconnectedHandler;
  }
}

import * as discussion from "./discussion";
export type Discussion = discussion.Discussion;
export namespace Discussion {
  export type Authorizations = discussion.Authorizations;
}

import * as id from "./id";
export type InternalId = id.InternalId;
export type Reference = id.Reference;
export type GlobalReference = id.Reference; // alias of Reference
export type GlobalId = id.GlobalId;
export type AccountInternalId = id.AccountInternalId;
export type AccountReference = id.AccountReference;
export type AccountGlobalId = id.AccountGlobalId;
export type DiscussionInternalId = id.DiscussionInternalId;
export type DiscussionReference = id.DiscussionReference;
export type DiscussionGlobalId = id.DiscussionGlobalId;
export type MessageInternalId = id.MessageInternalId;
export type MessageReference = id.MessageReference;
export type MessageGlobalId = id.MessageGlobalId;
export namespace Id {
  export let parseGlobal = id.parseGlobal;
  export let stringifyReference = id.stringifyReference;
  export let asReference = id.asReference;
  export let asGlobalId = id.asGlobalId;
}

import * as message from "./message";
export type Message = message.Message;
export namespace Message {
  export namespace flags {
    export const TEXT = message.flags.TEXT;
    export const IMAGE = message.flags.IMAGE;
    export const VIDEO = message.flags.VIDEO;
    export const FILE = message.flags.FILE;
    export const URL = message.flags.URL;
    export const EDITABLE = message.flags.EDITABLE;
    export const CAM = message.flags.CAM;
  }
}

import * as utils from "./utils";
export namespace utils {
  export type Dictionary<T> = utils.Dictionary<T>;
  export type NumericDictionary<T> = utils.NumericDictionary<T>;
  export type Document = utils.Document;
}
