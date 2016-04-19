import * as Bluebird from "bluebird";
import { GroupAccount } from "./group-account";
import { User } from "./user";
import { Message } from "./message";
import { ContactAccount } from "./contact-account";
import { Dictionary } from "./utils";
/***************************************************************
 * Discussion is the only thing you can use to chat with someone.
 * It provides you methods to send a message, do something when
 * you receive a message and so on.
 ***************************************************************/
export interface Discussion {
    creationDate: Date;
    name: string;
    description: string;
    heterogeneous: boolean;
    isPrivate: boolean;
    participants: GroupAccount[];
    owner: User;
    settings: Dictionary<any>;
    getMessages(maxMessages: number, afterDate?: Date, filter?: (msg: Message) => boolean): Bluebird.Thenable<Message[]>;
    sendMessage(msg: Message, callback?: (err: Error, succes: Message) => any): void;
    addParticipants(p: GroupAccount): Bluebird.Thenable<Discussion>;
    removeParticipants(contactAccount: ContactAccount): Bluebird.Thenable<Discussion>;
    getParticipants(): Bluebird.Thenable<GroupAccount[]>;
    onMessage(callback: (msg: Message) => any): Bluebird.Thenable<Discussion>;
    getName(): Bluebird.Thenable<string>;
    getDescription(): Bluebird.Thenable<string>;
    getSettings(): Bluebird.Thenable<Dictionary<any>>;
}
