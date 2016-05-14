import {Thenable} from "bluebird";
import {Discussion} from "./discussion";
import {Message} from "./message";
import {Account, UserAccount} from "./account";
import {AccountReference, AccountGlobalId, DiscussionReference, DiscussionGlobalId} from "./id";
import {PromiseOrValue} from "./utils";

/***************************************************************
 * Api is the universal interface for communication.
 * It is obtained by creating a connection.
 * It does hide the implementation details: for example,
 * sending a message to someone using IRC won't be
 * done the same way than to someone using facebook.
 * This imply that creating a new module (i.e to allow palantir
 * to communicate with other accounts) devs must create a new
 * Api too.
 * Note that Apis only act in the side of the service
 * they have access to. This means that it will not modify any
 * object that are used as overlayer elsewhere. People calling
 * they services offered by Api must edit these
 * objects by their own, depending of the result of Api
 * methods calls.
 ***************************************************************/

export interface Api extends NodeJS.EventEmitter {
  /**
   * Invite the following members to the discussion.
   * If at least one member cannot be invited, it will throw an error
   * @param members
   * @param discussion
   */
  addMembersToDiscussion(members: Array<AccountReference | AccountGlobalId>, discussion: DiscussionReference | DiscussionGlobalId, options?: any): Thenable<this>;

  /**
   * Attempts to create a new discussion with the supplied contacts and the localAccount (you can pass an empty array)
   * @param contacts
   * @param options
   */
  createDiscussion(contacts: Array<AccountReference | AccountGlobalId>, options: CreateDiscussionOptions): Thenable<Discussion>;

  /**
   * Returns the available information about the supplied account
   */
  getAccount(account: AccountReference | AccountGlobalId, options?: any): Thenable<Account>;

  /**
   * Returns the list of the contacts of the current account
   */
  getContacts(options?: any): Thenable<Account[]>;

  /**
   * Returns the currently connected user associated with this instance of Api.
   */
  getCurrentUser(options?: any): Thenable<UserAccount>;

  /**
   * Returns the list of known discussions of the current account
   * @param options
   */
  getDiscussions(options?: GetDiscussionsOptions): Thenable<Discussion[]>;

  /**
   * Returns the messages from a given discussion
   * @param discussion
   */
  getMessagesFromDiscussion(discussion: DiscussionReference | DiscussionGlobalId, options?: GetMessagesFromDiscussionOptions): Thenable<Message[]>;

  /**
   * The result is that the user will not receive any message from this
   * discussion, unless he joins it again
   * to rejoin it.
   * @param discussion
   */
  leaveDiscussion(discussion: DiscussionReference | DiscussionGlobalId, options?: any): Thenable<Api>;

  /**
   * Removes the following members from the discussion.
   * If at least one member cannot be removed, it will throw an error.
   * @param members
   * @param discussion
   */
  removeMembersFromDiscussion(members: Array<AccountReference | AccountGlobalId>, discussion: DiscussionReference | DiscussionGlobalId, options?: any): Thenable<this>;

  /**
   * Send the message msg to the discussion.
   * @param newMessage
   * @param discussion
   */
  sendMessage(newMessage: NewMessage, discussion: DiscussionReference | DiscussionGlobalId, options?: any): Thenable<Message>;
}

export interface CreateDiscussionOptions {
  /**
   * Attempts to set the supplied name at creation
   */
  name?: string;

  /**
   * Attempts to set the supplied description at creation
   */
  description?: string;
}

export interface GetDiscussionsOptions {
  /**
   * The result array will have a length lesser or equal to max
   */
  max?: number;

  /**
   * Applies the supplied predicate on each discussion. If the filter returns false, the discussion is discarded.
   * @param discussion
   */
  filter?: (discussion: Discussion) => PromiseOrValue<boolean>;
}

export interface GetMessagesFromDiscussionOptions {
  /**
   * The result array will have a length lesser or equal to max
   */
  max?: number;

  /**
   * Applies the supplied predicate on each message. If the filter returns false, the message is discarded.
   * @param message
   */
  filter?: (message: Message) => PromiseOrValue<boolean>;
}

export interface NewMessage {
  body: string;
}

/***************************************************************
 * Standard events are constants representing the basic events
 * supported by the library.
 * You can use them when you want to handle an event, so you
 * won't be listening for several events names which in fact
 * all are the same one.
 ***************************************************************/

export namespace events {
  // TODO: every event-object should implement {type: string}

  export const EVENT: string = "event";
  export type EventHandler = (event?: any) => any;

  export const MESSAGE: string = "message";
  export interface MessageEvent {
    type: string; // "message";
    message: Message;
    discussionGlobalId: DiscussionGlobalId;
  }
  export type MessageHandler = (event?: MessageEvent) => any;

  export const MESSAGE_SENT: string = "message:sent";
  export type MessageSentHandler = (event?: Message) => any;

  export const MESSAGE_RECEIVED: string = "message:received";
  export type MessageReceivedHandler = (event?: Message) => any;

  export const CONTACT_REQUEST: string = "contact:request";
  export type ContactRequestHandler = (event?: Account) => any;

  export const DISCUSSION_RENAMED: string = "discussion:renamed";
  export type DiscussionRenamedHandler = (event?: Discussion) => any;
}

export default Api;
