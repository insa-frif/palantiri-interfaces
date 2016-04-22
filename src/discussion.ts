import {Account} from "./account";
import * as utils from "./utils";
import {DiscussionToken} from "./token";

/***************************************************************
 * DiscussionAuthorization represent all the right you can have
 * in a discussion.
 ***************************************************************/
export interface Authorizations {
  write: boolean;   // Right to write
  talk: boolean;    // Right to use microphone
  video: boolean;   // Right to use camera
  invite: boolean;  // Right to invite other peoples
  kick: boolean;    // Right to kick someone
  ban: boolean;     // Right to kick + prevent someone from coming back
}

/***************************************************************
 * Discussion is the only thing you can use to chat with someone.
 * It provides you methods to send a message, add and remove
 * participants, and so on.
 ***************************************************************/
export interface Discussion extends DiscussionToken {
  /**
   * Date de creation de la conversation
   */
  creationDate: Date;

  /**
   * A human-readable name
   */
  name: string;

  /**
   * A short text description
   */
  description: string;

  /**
   * Whether or not this discussion requires an invitation to join it
   */
  isPrivate: boolean;

  /**
   * The list of participants - without the current user
   */
  participants: Account[];

  /**
   * The eventual owner of the discussion
   */
	owner: Account;

  /**
   * The authorizations of the current account with the discussion
   */
	authorizations: Authorizations;

  /**
   * Some driver-specific data
   */
  settings: utils.Document;

  // isCompatibleWith(protocol: string): boolean;
  // //  Retourne vrai si le protocole "protocol" est
  // //  compatible avec la Discussion courante.
  //
  // getMessages(maxMessages: number, afterDate?: Date, filter?: (msg: Message) => boolean): Bluebird.Thenable<Message[]>;
  // //  Retourne une liste des maxMessages derniers messages echanges pendant la discussion,
  // //  au plus : s'il y en a moins, alors retourne le nombre de messages disponibles.
  // //  Si afterDate est precise, ne retourne que les messages posterieurs a afterDate.
  // //  Si filter est precise, ne retourne que les messages dont l'application de la fonction
  // //  filter ne retourne true.
  //
  // addParticipants(p: Contact[]): Bluebird.Thenable<Discussion>;
  // //  Ajoute les membres de "p" a la Discussion courante.
  // //  Dans la mesure des possibilites offertes par le protocole
  // //  associe, les nouveaux participants ainsi que les anciens
  // //  seront notifies.
  //
  // removeParticipants(contacts: Contact[]): Bluebird.Thenable<Discussion>;
  // //  Enleve chaque Contact de "contacts" des membres de
  // //  la Discussion courante.
  // //  Si un des Contacts de "contacts" n'etait pas present
  // //  dans la Discussion courante, il sera ignore.
  // //  Dans la mesure des possibilites offertes par le protocole
  // //  associe, les participants exclus ainsi que ceux restant
  // //  seront notifies.
  //
  // getParticipants(): Bluebird.Thenable<Contact[]>;
  // //  Retourne une liste des participants de la discussion courante.
  //
  // getName(): string;
  // //  Retourne le nom de la discussion.
  //
  // getDescription(): string;
  // //  Retourne une description de la discussion.
  //
  // getSettings(): Dictionary<any>;
  // //  Retourne tout les paramètres de la discussion, même spécifiques (map).
  // //  Bien evidemment, nous ne pourrons pas tout traiter.
  // //  Nous essayerons cependant de faire du mieux possible sans pour autant
  // //  y passer des heures entieres.
}
