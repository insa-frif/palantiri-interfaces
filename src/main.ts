export {Connection} from "./connection";
export {Contact} from "./contact";
export {ContactAccount} from "./contact-account";
export {Discussion} from "./discussion";
export {DiscussionAuthorization} from "./discussion-authorization";
export {GroupAccount} from "./group-account";
export {Message, MessageFlags} from "./message";
export {ConnectedApi} from "./connected-api";
export {UserAccount} from "./user-account";

import * as utility from "./utils";

export namespace utils {
  export type Dictionary<T> = utility.Dictionary<T>;
  export type NumericDictionary<T> = utility.NumericDictionary<T>;
  export type Document = utility.Document;
}
