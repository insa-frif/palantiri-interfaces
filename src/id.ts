export type AccountId = string;
export type DiscussionId = string;
export type MessageId = string;

export interface AccountToken {
  id: AccountId;
}

export interface DiscussionToken {
  /**
   * This value identifies this discussion uniquely.
   * A driver should retrieve the same discussion if he gets the same id.
   */
  id: DiscussionId;
}

export interface MessageToken {
  id: MessageId;
}
