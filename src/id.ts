/**
 * Represents a local id
 */
export type Id = string;

/**
 * A ParsedId is a pair between a driver name and a driver-specific id
 * This value identifies this discussion/account/message uniquely across all the users and drivers.
 * A driver should retrieve the same object if he gets the same id.
 */
export interface ParsedId {
  driverName: string;
  id: Id;
}

/**
 * A GlobalId is a serialized ParsedId.
 * It is obtained as:
 * token = JSON.stringify([identity.driverName, identity.id]);
 */
export type GlobalId = string;

export type AccountId = Id;
export type AccountReference = ParsedId;
export type AccountGlobalId = GlobalId;

export type DiscussionId = Id;
export type DiscussionReference = ParsedId;
export type DiscussionGlobalId = GlobalId;

export type MessageId = Id;
export type MessageReference = ParsedId;
export type MessageGlobalId = GlobalId;

/**
 * Parses a globalId and returns a global ParsedId
 * @param globalId
 * @returns {ParsedId}
 */
export function parse(globalId: GlobalId): ParsedId {
  let parsed: [string, string] = JSON.parse(globalId);
  return parsed === null ? null : {driverName: parsed[0], id: parsed[1]};
}

/**
 * Stringifies a global ParsedId to its globalId
 * @param parsedId
 * @returns {GlobalId}
 */
export function stringify(parsedId: ParsedId): GlobalId {
  return parsedId === null ? null : JSON.stringify([parsedId.driverName, parsedId.id]);
}

/**
 * Normalizes the argument to a ParsedId
 * @param arg
 * @returns {ParsedId}
 */
export function coerceAsIdentity(arg: ParsedId | GlobalId): ParsedId {
  return typeof arg === "string" ? parse(<GlobalId> arg) : <ParsedId> arg;
}

/**
 * Normalizes the argument to a GlobalId
 * @param arg
 * @returns {string|GlobalId}
 */
export function coerceAsToken(arg: ParsedId | GlobalId): GlobalId {
  return typeof arg === "string" ? arg : stringify(<ParsedId> arg);
}
