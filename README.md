[![npm](https://img.shields.io/npm/v/palantiri-interfaces.svg?maxAge=2592000)](https://www.npmjs.com/package/palantiri-interfaces)

# Palantiri-interfaces

## Description

The aim of this module is to propose some common interface in order to use any communication protocol.
As long as a driver implements these interfaces, the consumer module should not have to change its code.

## Usage

````bash
# Install the module
npm install --save palantiri-interfaces
# Use the definitions
typings install -S npm:palantiri-interfaces
````

````typescript
import {Connection, ConnectedApi} from "palantiri-interfaces";
import {UserAccount} from "palantiri";

class FooConnection implements Connection {
  // ...
}
class FooConnectedApi implements ConnectedApi {
  // ...
}
class FooUserAccount extends UserAccount {
  getOrCreateConnection(...) {
    // ...
  }
}
````

And that's it. Palantiri will then be able to work with your module.

## API

 - [Id](#id)
 - [Connection](#connection)

## Id

A palantiri resource (Message, Account, Discussion) can be identified by two strings: its `InternalId` and its `GlobalId`.
The `InternalId` is a driver-specific string that should be used by each driver to distinguish any driver-specific resource.

When you add the `driverName` to the `InternalId`, you obtain a string called the `GlobalId` which identifies the resource across every drivers.

````txt
+-----------------------------+
|          GlobalId           |
+-----------------------------+
|driverName|    InternalId    |
+-----------------------------+
````

The `GlobalId` is calculated as:
````javascript
let driverName = "fooDriver";
let internalId = "13374231415";
let globalId = JSON.stringify([driverId, internalId]);
````

The structure of a parsed `GlobalId` is called a `Reference`<sup>[1](#note-reference)</sup> and corresponds to the following interface:
````typescript
interface Reference {
  driverName: string;  // The name of the driver
  id: string;          // The internal id
}
````

Every resource extends this interface.

### Functions

These functions are temporarily defined in this package but they should move to `palantiri` once the API is stabilized.

#### `Id.parseGlobal(globalId: string): Reference`

Parses the supplied `globalId` string and returns a `Reference`.

#### `Id.stringifyReference(reference: string): string`

Transforms a `Reference` to the corresponding `GlobalId` string.
It is the opposite of `Id.parseGlobal`.

#### `Id.asReference (arg: Reference | GlobalId, driverName?: string): Reference`

Normalizes the argument to a `Reference`.
As opposed to `parseGlobal`, this will throw an `Error` if the result is `null`.

##### Arguments

 - `arg`: A `Reference` or a `GlobalId` string.
 - `drivername` _(default: `null`)_: Throws an error if the `.driverName` of the argument does not equals the supplied name. `null` allows any value.

#### `Id.asGlobalId (arg: Reference | GlobalId): GlobalId`

Normalizes the argument to a `GlobalId`.
As opposed to `stringifyReference`, this will throw an `Error` if the result is `null`.

##### Arguments

 - `arg`: A `Reference` or a `GlobalId` string.

### Connection

A connection represents the entry point of a driver. You can use it to acquire an API.
It is a link between one specific account and one specific service.
Each `connection` is independent (ie. if you want to prevent parallel connection of the same account to the service, you will need to handle it yourself). 

#### `new Connection(options)`

Creates a ne

##### Arguments

 - `options` _(optional)_ Some driver specific options for this connection: see your driver documentation. These often include properties such as `credentials` or `timeout`.

#### `.driver: string`

A string representing the name of the driver supplying this `Connection`.

#### `.connect(): Thenable<Api>`

Establishes a connection and returns the associated `Api`.
If the connection is already established, it just returns the associated `Api` object.

##### Possible Errors
 - **timeout**: A timeout Error is thrown when the connection cannot be established in a given amount of time.
 - **TODO**

#### `.disconnect(): Thenable<this>`

Closes the connection and prevent any auto-reconnect. The `Api` object no longer receives or emits any messages.
You have to use `connection.connect()` again to resume the connection.

##### Possible Errors
 - **TODO**

#### `.isConnected(): boolean`

#### Planned features

 - Possibility to get and store a connection state (tokens, cookies, etc.) and reuse this object to establish a connection without resending the credentials.

### Api

An `Api` object allows to interract with a communication service.

#### `.driver: string`

A string representing the name of the driver implementing this `Api`.

#### `.getCurrentUser(): Thenable<UserAccount>`

Returns the most information possible about the currently connected user.

#### Events

##### `message`

This event is emitted when the user receives a message.

````typescript
interface MessageEvent {
  discussion: Discussion; // The discussion where the message was received
  message: Message;       // The message itself
}
````


#### Planned

 - `.block(account)`
 - `.kick(discussion, account)`
 - `.ban(discussion, account)`
 - Allow an `InternalId` everywhere were a `Reference` or `GlobalId` is used.

### `Account`

This structure represent an account on a given service.

#### `.driverName: string`

The name of the driver.

#### `.id: string`

A driver-specific id.

#### `.name: string`

A human-readable name.

#### `.avatarUrl: string`

A string to any avatar, picture or photo associated to this account.

#### `.driverData: any`

Any driver-specific data (covered or not by the other properties) goes there. Check your driver's documentation to get more information. 

#### Planned

 - email
 - authorizations (actions of the current account on the account, ie. inviteToDisccusion)

### `UserAccount`

Currently, this is just an alias to `Account`.
There is a distinct structure to eventually provide more data about the currently connected user.

### `Discussion`

A `Discussion` represents a group of accounts able to to communicate together trough `Message`s.

#### `.authorizations: Authorizations`

A boolean dictionary of authorizations of the current user relatively to this `Discussion`

````typescript
interface Authorizations {
  write: boolean;   // Right to write
  talk: boolean;    // Right to use microphone
  video: boolean;   // Right to use camera
  invite: boolean;  // Right to invite other peoples
  kick: boolean;    // Right to kick someone
  ban: boolean;     // Right to kick + prevent someone from coming back
}
````

### `Message`

`Message` represent some content sent between participants of a discussion.

#### `.driverName: string`

#### `.id: string`

#### `.body: string`

A text representation of the content of the message. There are no guarantees about the format (plain text, HTML, markdown, etc.)

### Other

This module also exports some constants.

````typescript
Connection.events;
Api.events;
Message.flags;
````

### Usage

A driver only needs to expose its Connection constructor.
A user instantiates the Connection by providing some driver-specific configurations.
Once the connection instance is created it can be passed to other parts of the application and can be used independently of the specific driver.
To acquire an Api object, you have to use `connection.connect`.
The Api is the entry-point to use a Palantiri-driver, it emits high-level events and accepts commands.
The Api accepts and returns only simple container objects.

## Contributing

If you want to help, fork this repository and clone it. Then, use:
````bash
# Install npm dependencies and dev-dependencies
npm install
# Install definitions for Typescript
typings install
# Build the interfaces
gulp build.node
# Link it with other modules:
gulp project.dist.node
npm link
````

## Notes

<a name="note-reference">1</a>: How about calling it a `GlobalReference` ?
