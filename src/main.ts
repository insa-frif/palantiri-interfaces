export {Connection} from "./connection";
export {Contact} from "./contact";
export {Discussion} from "./discussion";
export {DiscussionAuthorization} from "./discussion-authorization";
export {Message, MessageFlags} from "./message";
export {Api} from "./connected-api";
export {UserAccount} from "./user-account";

import * as utility from "./utils";

export namespace utils {
  export type Dictionary<T> = utility.Dictionary<T>;
  export type NumericDictionary<T> = utility.NumericDictionary<T>;
  export type Document = utility.Document;
}
