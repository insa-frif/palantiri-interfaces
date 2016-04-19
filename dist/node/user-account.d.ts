import * as Bluebird from "bluebird";
import { Proxy } from "./proxy";
import { Connection } from "./connection";
import { User } from "./user";
import { Discussion } from "./discussion";
import { Contact } from "./contact";
import { ContactAccount } from "./contact-account";
import { GroupAccount } from "./group-account";
import { Message } from "./message";
import { Dictionary } from "./utils";
/***************************************************************
 * UserAccount represente one account used by an user of
 * Omni-Chat. This user can use several accounts at the same
 * time : that's the reason why Omni-Chat was created.
 * UserAccount is totally DIFFERENT from ContactAccount. An user
 * can plenty acceed to all his accounts, and do (almost)
 * everything he can do by using directly his accounts, without
 * using Omni-Chat.
 ***************************************************************/
export interface UserAccount {
    username: string;
    driver: Proxy;
    connection: Connection;
    data: Dictionary<any>;
    owner: User;
    getContacts(): Bluebird.Thenable<Contact[]>;
    hasContactAccount(account: ContactAccount): Bluebird.Thenable<boolean>;
    getDiscussions(max?: number, filter?: (discuss: Discussion) => boolean): Bluebird.Thenable<Discussion[]>;
    getOwner(): Bluebird.Thenable<User>;
    getOrCreateConnection(): Bluebird.Thenable<Connection>;
    sendMessageTo(recipients: GroupAccount, msg: Message, callback?: (err: Error, succes: Message) => any): void;
}
