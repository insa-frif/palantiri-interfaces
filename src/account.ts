import {AccountToken} from "./token";
import * as utils from "./utils";

/***************************************************************
 * Contact is the representation of someone you can chat with.
 * The only way to tchat with someone is to start a discussion
 * with him. Other participants could be added through the
 * interface Discussion.
 ***************************************************************/
export interface Account extends AccountToken {
  /**
   * A human-readable name
   */
  name: string;

  data: utils.Document;
}

/***************************************************************
 * UserAccount represente one account used by an user of
 * Omni-Chat. This user can use several accounts at the same
 * time : that's the reason why Omni-Chat was created.
 * UserAccount is totally DIFFERENT from ContactAccount. An user
 * can plenty acceed to all his accounts, and do (almost)
 * everything he can do by using directly his accounts, without
 * using Omni-Chat.
 * The method getOrCreateConnection will sometimes need to
 * instanciate a new Connection. Or Connections objects are
 * specific, and the library has no clue about which one is
 * available. Therefore, when creating a new module, devs must
 * also create a new UserAccount too.
 ***************************************************************/

export interface UserAccount extends Account {
  
}

export default Account;
