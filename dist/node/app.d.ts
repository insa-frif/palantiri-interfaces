import * as Bluebird from "bluebird";
import { Proxy } from "./proxy";
import { User } from "./user";
/***************************************************************
 * App is the entry point for the library.
 * Maintains the list of available proxies and connected users.
 ***************************************************************/
export interface App {
    drivers: Proxy[];
    users: User[];
    getProxyFor(protocol: string): Bluebird.Thenable<Proxy>;
    addDriver(driver: Proxy, callback?: (err: Error, drivers: Proxy[]) => any): App;
    removeDriversFor(protocol: string, callback?: (err: Error, drivers: Proxy[]) => any): App;
    addUser(user: User, callback?: (err: Error, users: User[]) => any): App;
    removeUser(user: User, callback?: (err: Error, users: User[]) => any): App;
}
