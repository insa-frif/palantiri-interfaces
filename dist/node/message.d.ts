import * as Bluebird from "bluebird";
import { ContactAccount } from "./contact-account";
import { UserAccount } from "./user-account";
/***************************************************************
 * MSG_FLAG constants are flags that are used to help us sending
 * messages with different protocols (with Proxies).
 * Whatever the messages content, text will always be send,
 * even if the message does not contain any text. So every
 * protocols will always be able to send something.
 ***************************************************************/
export declare const MSG_FLAG_TXT: number;
export declare const MSG_FLAG_IMG: number;
export declare const MSG_FLAG_VID: number;
export declare const MSG_FLAG_FIL: number;
export declare const MSG_FLAG_URL: number;
export declare const MSG_FLAG_EDI: number;
/***************************************************************
 * Message is the object exchanged during a Discussion.
 * Examples of classes which can inherit from Message are :
 * TextMessage, ImageMessage, VideoMessage...
 ***************************************************************/
export interface Message {
    author: ContactAccount | UserAccount;
    body: string;
    content: any;
    flags: number;
    creationDate: Date;
    lastUpdated: Date;
    getText(): Bluebird.Thenable<string>;
    getCreationDate(): Bluebird.Thenable<Date>;
    getLastUpdateDate(): Bluebird.Thenable<Date>;
    getAuthor(): Bluebird.Thenable<ContactAccount | UserAccount>;
    getContent(): Bluebird.Thenable<any>;
    getFlags(): Bluebird.Thenable<number>;
    isEditable(): boolean;
}
