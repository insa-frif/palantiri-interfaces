export { App } from "./app";
export { Connection } from "./connection";
export { Contact } from "./contact";
export { ContactAccount } from "./contact-account";
export { Discussion } from "./discussion";
export { DiscussionAuthorization } from "./discussion-authorization";
export { GroupAccount } from "./group-account";
export { Message } from "./message";
export { Proxy } from "./proxy";
export { User } from "./user";
export { UserAccount } from "./user-account";
import * as utils from "./utils";
export declare namespace utils {
    type Dictionary<T> = utils.Dictionary<T>;
    type NumericDictionary<T> = utils.NumericDictionary<T>;
    type Document = utils.Document;
}
