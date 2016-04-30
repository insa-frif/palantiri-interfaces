/**
 * A GlobalIdentity is a pair between a driver and an id
 * This value identifies this discussion/account/message uniquely across all the users and services.
 * A driver should retrieve the same object if he gets the same id.
 */
export interface GlobalIdentity {
  driver: string;
  id: string;
}

/**
 * A GlobalToken is a serialized GlobalIdentity.
 * It is obtained as:
 * token = JSON.stringify([identity.driver, identity.id]);
 */
export type GlobalToken = string;

export type AccountIdentity = GlobalIdentity;
export type AccountToken = GlobalToken;

export type DiscussionIdentity = GlobalIdentity;
export type AccountToken = GlobalToken;

export type MessageIdentity = GlobalIdentity;
export type AccountToken = GlobalToken;

/**
 * Parses a global token and returns a global document
 * @param globalToken
 * @returns {GlobalIdentity}
 */
export function parse(globalToken: GlobalToken): GlobalIdentity {
  let parsed: [string, string] = JSON.parse(globalToken);
  return parsed === null ? null : {driver: parsed[0], id: parsed[1]};
}

/**
 * Stringifies a global document to its global token
 * @param token
 * @returns {GlobalToken}
 */
export function stringify(token: GlobalIdentity): GlobalToken {
  return token === null ? null : JSON.stringify([token.driver, token.id]);
}

/**
 * Normalizes the argument to a GlobalIdentity
 * @param arg
 * @returns {GlobalIdentity}
 */
export function coerceAsIdentity(arg: GlobalIdentity | GlobalToken): GlobalIdentity {
  return typeof arg === "string" ? parse(<GlobalToken> arg) : <GlobalIdentity> arg;
}

/**
 * Normalizes the argument to a GlobalToken
 * @param arg
 * @returns {string|GlobalToken}
 */
export function coerceAsToken(arg: GlobalIdentity | GlobalToken): GlobalToken {
  return typeof arg === "string" ? arg : stringify(<GlobalIdentity> arg);
}
