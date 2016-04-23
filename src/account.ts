import {AccountToken} from "./token";
import {Discussion} from "./discussion";
import {Message} from "./message";
import {Connection} from "./connection";
import * as Bluebird from "bluebird";

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
 * instanciate a new Connection. But Connections objects are
 * specific, and the library has no clue about which one is
 * available. Therefore, when creating a new module, devs must
 * also create a new UserAccount too.
 ***************************************************************/

export interface UserAccount extends Account {
	/**
   * Connect the cureent user's account, or retrieve an existing
   * connection. The created connection will already be turned on,
   * but not the retrieved one.
   */
  getOrCreateConnection(): Bluebird.Thenable<Connection>;

	/**
   * Send the message "msg" in the discussion "discussion".
   * If the protocol used by "discussion" does not support group discussion,
   * the message will be send to each member individually.
   * If the discussion does not already exist on the accessible service,
   * it will be created.
   * @param msg
   * @param discussion
   */
  sendMessage(msg: Message, discussion: Discussion): Bluebird.Thenable<UserAccount>;

  // TODO(Charles): UserAccount c'est vraiment DIFFERENT des comptes d'un contact.
  //                Les deux methodes que j'ai rajoutees la c'est vraiment la base des bases,
  //                c'est comme ça que fonctionne TOUT le reste.
  //                IL NE FAUT PAS qu'a un moment donne l'utilisateur puisse essayer de se servir
  //                d'un compte d'un utilisateur a la place d'un compte d'un contact.
  //                LA SEULE EXCEPTION se trouve dans le champ Message.author.
  //                Les comptes des contacts SONT JUSTE UNE SURCOUCHE qui permet d'encapsuler la
  //                des informations et de travailler de maniere egale peut importe le protocole.
  //                Un compte de contact c'est une structure passive, alors qu'un compte d'utilisateur
  //                est totalement ACTIF. C'est pour ca qu'il va sans doute falloir ajouter d'autres
  //                interfaces de methodes.
}

export default Account;
