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

  /**
   * An untyped field reserved for driver-specific data
   */
  driverData: any;
}

/***************************************************************
 * UserAccount represente one account used by an user of
 * Palantiri.
 * The method getOrCreateConnection will sometimes need to
 * instanciate a new Connection. Or Connections objects are
 * specific, and the library has no clue about which one is
 * available. Therefore, when creating a new module, devs must
 * also create a new UserAccount too.
 ***************************************************************/

export interface UserAccount extends Account {

}

export default Account;
