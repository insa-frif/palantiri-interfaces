import {Thenable} from "bluebird";

export interface Dictionary<T> {
  [key: string]: T;
}

export interface NumericDictionary<T> {
  [key: number]: T;
}

export type Document = Dictionary<any>;

export type PromiseOrValue<T> = Thenable<T> | T;
