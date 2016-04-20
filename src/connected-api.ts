import * as Bluebird from "bluebird";
import {UserAccount} from "./user-account";
import {Discussion} from "./discussion";
import {ContactAccount} from "./contact-account";
import {GroupAccount} from "./group-account";
import {Message} from "./message";

/***************************************************************
 * ConnectedApis are specific ways to connect to an account.
 * For example, sending a message to someone using IRC won't be
 * done the same way than to someone using facebook.
 * This imply that creating a new module (i.e to allow OmniChat
 * to communicate with other accounts) devs must create a new
 * ConnectedApi too.
 * Note that ConnectedApis only act in the side of the service
 * theyv have access to. This means that it will not modify any
 * object that are used as overlayer elsewhere. People calling
 * they services offered by Proxies must edit these objects by
 * their own, depending of the result of Proxies methods calls.
 ***************************************************************/
export interface ConnectedApi {
  protocol: string;       //  The protocol used by this api.
                          //  This depends of implementations.

  isCompatibleWith(protocol: string): boolean;
  //  Retourne vrai si le protocole protocol est compatible avec ce proxy.
  //  Protocol sera peut-etre encapsule dans une enum ou une struct
  //  par la suite.

  getContacts(account: UserAccount): Bluebird.Thenable<ContactAccount[]>;
  //  Accede a la liste des contacts du compte "account",
  //  et les retourne sous forme de tableau de ContactAccounts.

  getDiscussions(account: UserAccount, max?: number, filter?: (discuss: Discussion) => boolean): Bluebird.Thenable<Discussion[]>;
  //  Accede a la liste des discussions du compte "account"
  //  et retourne jusqu'a "max" Discussions dans un tableau.
  //  Si filter est precise, ne retourne dans le tableau que les discussions
  //  pour lesquelles la fonction "filter" retourne true.

  addMembersToGroupChat(members: ContactAccount[], groupChat: GroupAccount, callback?: (err: Error) => any): void;
  //  Ajoute les membres "members" au groupe de discussion "groupChat".
  //  Ceci ne se fait que du cote du service auquel le proxy courant
  //  a acces. "groupChat" ne sera donc en aucun cas modifie.
  //  Si au moins un des membres n'a pa pu etre ajoute, err sera non nul.

  removeMembersFromGroupChat(members: ContactAccount[], groupChat: GroupAccount, callback?: (err: Error) => any): void;
  //  Supprime les membres "members" du groupe de discussion "groupChat".
  //  Ceci ne se fait que du cote du service auquel le proxy courant
  //  a acces. "groupChat" ne sera donc en aucun cas modifie.
  //  Si au moins un des membres n'a pa pu etre supprime, err sera non nul.

  sendMessage(msg: Message, recipients: GroupAccount, callback?: (err: Error, succesM: Message) => any): void;
  //  Envoie le message "msg" aux destinataires "recipients".
  //  Il est a noter que le message sera envoye dans UNE SEULE
  //  conversation, sauf si le protocole ne supporte pas les groupes.
  //  Si la conversation n'existe pas, elle sera cree.
  //  Si le message ne peut pas etre envoye, err sera non nul.
}
