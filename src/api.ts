import {Thenable} from "bluebird";
import {Discussion} from "./discussion";
import {Message} from "./message";
import {Account} from "./account";
import {DiscussionToken} from "./token";

/***************************************************************
 * Api is the universal interface for communication. It is obtained
 * by creating a connection.
 * It does hide the implementation details: for example,
 * sending a message to someone using IRC won't be
 * done the same way than to someone using facebook.
 * This imply that creating a new module (i.e to allow palantir
 * to communicate with other accounts) devs must create a new
 * ConnectedApi too.
 * Note that ConnectedApis only act in the side of the service
 * theyv have access to. This means that it will not modify any
 * object that are used as overlayer elsewhere. People calling
 * they services offered by Proxies must edit these objects by
 * their own, depending of the result of Proxies methods calls.
 ***************************************************************/

export interface Api extends NodeJS.EventEmitter {
  /**
   * Returns the list of the contacts of the current account
   */
  getContacts(options?: any): Thenable<Account[]>;

  contactExists(account: Account): Thenable<boolean>;
  //  Retourne vrai si et seulement si le contact "account"
  //  peut etre accede a partir du compte courant.
  //  Necessite que account.localID soit defini.
  //  Necessite que la connectio soit etablie.

  /**
   * Returns the list of known discussions of the current account
   * @param options
   *  - max: number -> allows to limit the number of discussions
   *  - predicate: Function -> allows to filter the discussions
   */
  getDiscussions(options?: GetDiscussionsOptions): Thenable<Discussion[]>;

  /**
   * Invite the following members to the discussion.
   * If at least one member cannot be invited, it will throw an error
   * @param members
   * @param discussion
   * @param callback
   */
  addMembersToDiscussion(members: Account[], discussion: DiscussionToken, options?: any): Thenable<this>;

  /**
   * Removes the following members from the discussion.
   * If at least one member cannot be removed, it will throw an error.
   * @param members
   * @param discussion
   * @param callback
   */
  removeMembersFromDiscussion(members: Account[], discussion: DiscussionToken, options?: any): Thenable<this>;

  /**
   * The result is that the user will not receive any message from this
   * discussion, unless he joins it again
   * to rejoin it.
   * @param discussion
   * @param callback
   */
	leaveDiscussion(discussion: DiscussionToken, options?: any): Thenable<Api>;


  /**
   * Send the message msg to the discussion.
   * @param msg
   * @param discussion
   * @param callback
   */
  sendMessage(msg: Message, discussion: DiscussionToken, options?: any): Thenable<Api>;
}

export interface GetDiscussionsOptions {
  max?: number;
  predicate?: (discuss: Discussion) => boolean;
}

/***************************************************************
 * Standard events are constants representing the basic events
 * supported by the library.
 * You can use them when you want to handle an event, so you
 * won't be listening for several events names which in fact
 * all are the same one.
 ***************************************************************/

export namespace eventNames {
  const EVENT: string = "event";
  const MESSAGE: string = "message";
  const MESSAGE_SENT: string = "message:sent";
  const MESSAGE_RECEIVED: string = "message:received";
  const CONTACT_REQUEST: string = "contact:request";
  const DISCUSSION_RENAMED: string = "discussion:renamed";
}

export default Api;
