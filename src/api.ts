import {Thenable} from "bluebird";
import {Discussion} from "./discussion";
import {Message} from "./message";
import {Account} from "./account";
import {UserAccount} from "./user-account";
import {DiscussionToken} from "./id";

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

/**
 * Events:
 *  - event(any)
 *  - message(MessageEvent)
 */
export interface Api extends NodeJS.EventEmitter {
  /**
   * Returns the list of the contacts of the current account
   */
  getContacts(options?: any): Thenable<Account[]>;

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

export default Api;
