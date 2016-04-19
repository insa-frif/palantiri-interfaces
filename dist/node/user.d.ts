import * as Bluebird from "bluebird";
import { UserAccount } from "./user-account";
import { GroupAccount } from "./group-account";
import { Contact } from "./contact";
import { Discussion } from "./discussion";
/***************************************************************
 * User is the representation of someone connected with OmniChat.
 * An user works quite like a Contact : you just have more
 * rights as an user (for example acceed to your own contacts).
 ***************************************************************/
export interface User {
    accounts: UserAccount[];
    username: string;
    getOrCreateDiscussion(accounts: GroupAccount[]): Bluebird.Thenable<Discussion>;
    leaveDiscussion(discussion: Discussion, callback?: (err: Error, succes: Discussion) => any): void;
    getAccounts(protocols?: string[]): Bluebird.Thenable<UserAccount[]>;
    getContacts(): Bluebird.Thenable<Contact[]>;
    addAccount(account: UserAccount, callback?: (err: Error, succes: UserAccount[]) => any): void;
    removeAccount(account: UserAccount, callback?: (err: Error, succes: UserAccount[]) => any): void;
    addContact(contact: Contact, callback?: (err: Error, succes: Contact[]) => any): void;
    removeContact(contact: Contact, callback?: (err: Error, succes: Contact[]) => any): void;
    onDiscussionRequest(callback: (disc: Discussion) => any): void;
    onContactRequest(callback: (contact: Contact) => any): void;
}
