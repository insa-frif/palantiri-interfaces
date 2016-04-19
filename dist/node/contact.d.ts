import { ContactAccount } from "./contact-account";
import * as Bluebird from "bluebird";
/***************************************************************
 * Contact is the representation of someone you can chat with.
 * A contact may be the same for differents accounts. That's why
 * it contains a list of accounts : those were the contact is
 * identified as the same as in the others.
 * The only way to tchat with someone is to start a discussion
 * with him. Other participants could be added through the
 * interface Discussion.
 ***************************************************************/
export interface Contact {
    accounts: ContactAccount[];
    fullname: string;
    nicknames: string[];
    getAccounts(): Bluebird.Thenable<ContactAccount[]>;
    getNicknames(): string[];
    getPrincipalName(): string;
    setPrincipalName(newPrincipalName: string): void;
    mergeContacts(contact: Contact, callback?: (err: Error, succes: Contact) => any): Contact;
    unmergeContacts(contact: Contact, callback?: (err: Error, succes: Contact) => any): Contact;
    addAccount(account: ContactAccount, callback?: (err: Error, succes: ContactAccount[]) => any): void;
    removeAccount(account: ContactAccount, callback?: (err: Error, succes: ContactAccount[]) => any): void;
}
