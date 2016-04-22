import * as Bluebird from "bluebird";
import {Account} from "./account";

/***************************************************************
 * MessageFlags constants are flags that are used to help us sending
 * messages with different protocols (with ConnectedApis).
 * Whatever the messages content, text will always be send,
 * even if the message does not contain any text. So every
 * protocols will always be able to send something.
 ***************************************************************/
export const MessageFlags = {
  TEXT:       0x0001,   //  The message contains text
  IMAGE:      0x0002,   //  The message contains picture(s)
  VIDEO:      0x0004,   //  The message contains video(s)
  FILE:       0x0008,   //  The message contains other file(s)
  URL:        0x0010,   //  The message contains an URL
  EDITABLE:   0x0100,   //  The message is editable
	CAM:        0x1000    //  The message is a cam-chat
};

/***************************************************************
 * Message is the object exchanged during a Discussion.
 * Examples of classes which can inherit from Message are :
 * TextMessage, ImageMessage, VideoMessage...
 ***************************************************************/
export interface Message {
  author: Account;  // L'auteur du message.
                                  // Ce ne peut pas etre un objet de type
                                  // Contact. L'association entre ContactAccount
                                  // et Contact se fera plus tard, car peut
                                  // dependre de l'utilisateur.

  body: string;         // Une representation sous forme de string
                        // du message.

  content: any;         // Le contenu du message.
                        // Si le message contient uniquement du texte,
                        // body et content contiennent la meme string.

  flags: number;        // Les flags du message.

  creationDate: Date;   // La date de creation du message,
                        // si elle est disponible.

  lastUpdated: Date;    // La date de derniere modification
                        // du message, si disponible.

  getText(): Bluebird.Thenable<string>;
  //  Retourne une representation du message sous forme de String.
  //  Tout message (texte, image, autre fichier) doit avoir cette
  //  représentation pour toujours avoir quelque chose à afficher
  //  (erreur de chargement, etc).

  getCreationDate(): Bluebird.Thenable<Date>;
  //  Retourne la date de creation du message.

  getLastUpdateDate(): Bluebird.Thenable<Date>;
  //  Retourne la date de derniere modification du message.
  //  Cela ne vaut bien sur que si les messages sont editables,
  //  ce qui conduira peut-etre a supprimer cette methode
  //  de l'interface globale.

  getAuthor(): Bluebird.Thenable<Account>;
  //  Retourne l'auteur du message.

  getContent(): Bluebird.Thenable<any>;
  //  Renvoi un contenu plus pertinent.
  //  Chaque type de message devra implementer elle-meme cette methode.

  getFlags(): Bluebird.Thenable<number>;
  //  Retourne les flags du message.

  isEditable(): boolean;
  //  Retourne vrai si et seulement si le message courant est editable,
  //  i.e. le flag MSG_FLAG_EDI est present.
}
