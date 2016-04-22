import {Thenable} from "bluebird";
import {Api} from "./api";

/***************************************************************
 * Connection represents a connection to a certain type of
 * service. It can establish and maintain a link between
 * you and the UserAccount you want be connected to, but it can
 * also turn it off when you're done. It also allows you to add
 * and remove some events listeners to precise what you want
 * your connection to do.
 * Since it is specific to a certain type of Account, when devs
 * create a new module, they must develop an new Connection too.
 ***************************************************************/

/**
 * Events:
 *  - connected(Connection)
 *  - disconnect(Connection)
 */
export interface Connection extends NodeJS.EventEmitter {
  /**
   * To specify, returns an objects about the context of the connection (ie. which protocol is used)
   */
  getInfo(): any;

  // isCompatibleWith(protocol: string): boolean;
  // //  Retourne vrai si le protocole "protocol" est
  // //  compatible avec cette Api.

  /**
   * Returns a boolean if the connection is already established, false otherwise
   */
  isConnected(): boolean;

  /**
   * Returns the Api if it is available.
   * If the Api is not available, it throws an error.
   */
  getApi?(): Api;

  /**
   * Connects to the service and once the connection is ready to be used, returns an Api object.
   * If the connection is already established, it simply resolves the Api
   */
  connect(): Thenable<Api>

  /**
   * Disconnects you from the service and prevent any eventual auto-reconnection.
   * Any obtained Api might no longer be usable and throw errors.
   * It won't receive any new event.
   * If the connection is already disconnected, it does nothing.
   * Returns the connection itself
   */
  disconnect(): Thenable<this>;
}

export interface ConnectionConstructor<O, C extends Connection> {
  /**
   * Configure this connection, this is the only point where the interfaces change according to the protocol
   * @param options
   */
  new(options?: O): C;
}

export namespace events {
  const CONNECTED: string = "connected";
  const DISCONNECTED: string = "disconnected";
}

export default Connection;
