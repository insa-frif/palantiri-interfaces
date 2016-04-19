import * as Bluebird from "bluebird";
import { UserAccount } from "./user-account";
import { Connection } from "./connection";
import { Contact } from "./contact";
import { Discussion } from "./discussion";
import { ContactAccount } from "./contact-account";
import { GroupAccount } from "./group-account";
import { Message } from "./message";
/***************************************************************
 * Proxies are specific ways to connect to an account.
 * For example, sending a message to someone using IRC won't be
 * done the same way than to someone using facebook.
 * This imply that creating a new module (i.e to allow OmniChat
 * to communicate with other accounts) devs must create a new
 * proxy too.
 * Note that Proxies only act in the side of the service they
 * have access to. This means that it will not modify any
 * object that are used as overlayer elsewhere. People calling
 * they services offered by Proxies must edit these objects by
 * their own, depending of the result of Proxies methods calls.
 ***************************************************************/
export interface Proxy {
    protocol: string;
    isCompatibleWith(protocol: string): boolean;
    createConnection(account: UserAccount): Bluebird.Thenable<Connection>;
    getContacts(account: UserAccount): Bluebird.Thenable<Contact[]>;
    getDiscussions(account: UserAccount, max?: number, filter?: (discuss: Discussion) => boolean): Bluebird.Thenable<Discussion[]>;
    addMembersToGroupChat(members: ContactAccount[], groupChat: GroupAccount, callback?: (err: Error) => any): void;
    removeMembersFromGroupChat(members: ContactAccount[], groupChat: GroupAccount, callback?: (err: Error) => any): void;
    sendMessage(msg: Message, recipients: GroupAccount, callback?: (err: Error, succesM: Message) => any): void;
}
