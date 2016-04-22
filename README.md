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

This module defines the two interfaces with methods:

````typescript
Connection;
Api;
````

The other interfaces describe passive objects representing the data.

````typescript
Account;
Discussion;
Message;
````

This module also exports some constants.

````typescript
Connection.eventNames;
Api.eventNames;
Message.flags;
````


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
