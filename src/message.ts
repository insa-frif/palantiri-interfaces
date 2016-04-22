import {Account} from "./account";

/***************************************************************
 * MessageFlags constants are flags that are used to help us sending
 * messages with different protocols (with ConnectedApis).
 * Whatever the messages content, text will always be send,
 * even if the message does not contain any text. So every
 * protocols will always be able to send something.
 ***************************************************************/
export namespace flags {
  export const TEXT: number     = 0x0001;   //  The message contains text
  export const IMAGE: number    = 0x0002;   //  The message contains text
  export const VIDEO: number    = 0x0004;   //  The message contains text
  export const FILE: number     = 0x0008;   //  The message contains text
  export const URL: number      = 0x0010;   //  The message contains text
  export const EDITABLE: number = 0x0100;   //  The message contains text
  export const CAM: number      = 0x1000;   //  The message contains text
}

/***************************************************************
 * Message is the object exchanged during a Discussion.
 * Examples of classes which can inherit from Message are :
 * TextMessage, ImageMessage, VideoMessage...
 ***************************************************************/
export interface Message {
  /**
   * The name of the person who emitted the message
   */
  author: Account;

  /**
   * The textual representation of the content of the message
   */
  body: string;

  /**
   * A driver-specific content.
   * If the message is a simple text message, content is the same as body
   */
  content: any;

  /**
   * The flags of the message
   */
  flags: number;        // Les flags du message.

  /**
   * The date of the creation of the message
   */
  creationDate: Date;

  /**
   * The date of the last update of the message
   */
  lastUpdated: Date;
}

export default Message;
