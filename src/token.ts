/**
 * A Token is a pair between a driver and an id
 * This value identifies this discussion/account/message uniquely.
 * A driver should retrieve the same object if he gets the same id.
 */
export interface Token {
  id: string;
  driver: string;
}

export type AccountToken = Token;

export type DiscussionToken = Token;

export type MessageToken = Token;
