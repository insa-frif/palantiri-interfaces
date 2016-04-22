import * as Bluebird from "bluebird";

/***************************************************************
 * Contact is the representation of someone you can chat with.
 * The only way to tchat with someone is to start a discussion
 * with him. Other participants could be added through the
 * interface Discussion.
 ***************************************************************/
export interface Account {
	fullname: string;     //  Le nom complet du contact.

	protocol: string;     //  Le protocole associe a ce compte.

	localID: number;      //  L'identifiant du contact.
                        //  Ceci depend directement de la base
                        //  et donc du protocol utilise.

	isCompatibleWith(protocol: string): boolean;
	//  Retourne vrai si et seulement si le champ protocol
	//  du contact courant en miniscule est le meme que
	//  celui passe en parametre.

  getFullname(): string;
  //  Retourne la valeur du champ fullname.

  setFullname(newPrincipalName: string): Bluebird.Thenable<Account>;
  //  Met a jour le champ "fullname" du contact courant.
  //  Ne modifie pas nicknames.
}
