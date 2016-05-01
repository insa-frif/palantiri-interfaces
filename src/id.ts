/**
 * Represents a driver-specific id.
 */
export type InternalId = string;

/**
 * A Reference is a pair between a driver name and a driver-specific id
 * This value identifies this discussion/account/message uniquely across all the users and drivers.
 * A driver should retrieve the same object if he gets the same id.
 */
export interface Reference {
  driverName: string;
  id: InternalId;
}

/**
 * A GlobalId is a serialized Reference.
 * It is obtained as:
 * token = JSON.stringify([identity.driverName, identity.id]);
 */
export type GlobalId = string;

export type AccountInternalId = InternalId;
export type AccountReference = Reference;
export type AccountGlobalId = GlobalId;

export type DiscussionInternalId = InternalId;
export type DiscussionReference = Reference;
export type DiscussionGlobalId = GlobalId;

export type MessageInternalId = InternalId;
export type MessageReference = Reference;
export type MessageGlobalId = GlobalId;

// TODO: this should be moved to the `palantiri` package: this package here should only contain interfaces
/**
 * Parses a globalId and returns a global Reference
 * @param globalId
 * @returns {Reference}
 */
export function parseGlobal(globalId: GlobalId): Reference {
  let parsed: [string, string] = JSON.parse(globalId);
  return parsed === null ? null : {driverName: parsed[0], id: parsed[1]};
}

/**
 * Stringifies a global Reference to its globalId
 * @param parsedId
 * @returns {GlobalId}
 */
export function stringifyReference(parsedId: Reference): GlobalId {
  return parsedId === null ? null : JSON.stringify([parsedId.driverName, parsedId.id]);
}

/**
 * Normalizes the argument to a Reference
 * @param arg
 * @param driverName
 * @returns {Reference}
 */
export function asReference (arg: Reference | GlobalId, driverName: string = null): Reference {
  if (arg === null) {
    throw new Error("null Reference");
  }

  let ref: Reference;
  if (typeof  arg === "string") {
    ref = parseGlobal(<GlobalId> arg);
  } else {
    ref = <Reference> arg;
  }

  if (driverName !== null && ref.driverName !== driverName) {
    throw new Error("Reference object does not have the required driverName");
  }

  return ref;
}

/**
 * Normalizes the argument to a GlobalId
 * @param arg
 * @returns {string}
 */
export function asGlobalId (arg: Reference | GlobalId): GlobalId {
  if (arg === null) {
    throw new Error("null global id");
  }
  // TODO: test drivername as in "asReference" ?
  if (typeof  arg === "string") {
    // TODO: arg.indexOf(`[${JSON.stringify(driverName)},`) === 0 ?
    return arg;
  } else {
    return stringifyReference(<Reference> arg);
  }
}
