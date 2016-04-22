import {Thenable} from "bluebird";
import {Discussion} from "./discussion";
import {Message} from "./message";
import {Contact} from "./contact";
import {UserAccount} from "./user-account";

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

export interface GetDiscussionsOptions {
  max?: number;
  predicate?: (discuss: Discussion) => boolean;
}

export interface Api {
  /**
   * Returns the list of the contacts of the current account
   */
  getContacts(options?: any): Thenable<Contact[]>;

  /**
   * Returns the list of known discussions of the current account
   * @param userAccount
   * @param options
   *  - max: number -> allows to limit the number of discussions
   *  - predicate: Function -> allows to filter the discussions
   */
  getDiscussions(userAccount: UserAccount, options?: GetDiscussionsOptions): Thenable<Discussion[]>;

  /**
   * Invite the following members to the discussion.
   * If at least one member cannot be invited, it will throw an error
   * @param members
   * @param discussion
   * @param callback
   */
  addMembersToDiscussion(members: Contact[], discussion: Discussion, options?: any): Thenable<this>;

  /**
   * Removes the following members from the discussion.
   * If at least one member cannot be removed, it will throw an error.
   * @param members
   * @param discussion
   * @param callback
   */
  removeMembersFromDiscussion(members: Contact[], discussion: Discussion, options?: any): Thenable<this>;

  /**
   * The result is that the user will not receive any message from this
   * discussion, unless he joins it again
   * to rejoin it.
   * @param discussion
   * @param callback
   */
	leaveDiscussion(discussion: Discussion, options?: any): Thenable<Api>;


  /**
   * Send the message msg to the discussion.
   * @param msg
   * @param discussion
   * @param callback
   */
  sendMessage(msg: Message, discussion: Discussion, options?: any): Thenable<Api>;
}
