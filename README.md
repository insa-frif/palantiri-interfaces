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
import {Connection, Message} from "palantiri-interfaces";

class FooConnection implements Connection {
  // ...
}
````

## API

### Content

This module defines the two interfaces with methods:

````typescript
Connection;
Api;
````

The other interfaces describe passive objects representing the data.

````typescript
Account;
UserAccount;
Discussion;
Message;
````

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

## Development

If you want to help, fork this repository and clone it. Then, use:
````bash
# Install npm dependencies and dev-dependencies
npm install
# Install definitions for Typescript
typings install
# Build the interfaces
gulp build.node
````
