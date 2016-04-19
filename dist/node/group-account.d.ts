import { ContactAccount } from "./contact-account";
/***************************************************************
 * GroupAccount represents an aggregation of several
 * ContactAccounts. This allows us to send a message to an
 * existant discussion group instead of sending it to each
 * member separatly, losing the idea of "group" in the
 * contact's side.
 * Note that the field "protocol" of each ContactAccount in
 * members must be the same that the field "protocol" of
 * this object, to avoid errors later.
 ***************************************************************/
export interface GroupAccount {
    protocol: string;
    members: ContactAccount[];
    localDiscussionID: number;
    addMembers(members: ContactAccount[], callback?: (err: Error, members: ContactAccount[]) => any): void;
}
