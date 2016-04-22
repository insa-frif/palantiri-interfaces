import {MessageId, DiscussionId, AccountId} from "./id";

export interface AccountToken {
  id: AccountId;
  driver: string;
}

export interface DiscussionToken {
  /**
   * This value identifies this discussion uniquely.
   * A driver should retrieve the same discussion if he gets the same id.
   */
  id: DiscussionId;
  driver: string;
}

export interface MessageToken {
  id: MessageId;
  driver: string;
}
