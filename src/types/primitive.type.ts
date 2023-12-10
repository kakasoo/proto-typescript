import { ElementOf } from './array.type';

export type Primitive = string | boolean | number | undefined | null | bigint | symbol;

export type ReadonlyOrNot<T extends any[]> = ElementOf<T>[] | readonly ElementOf<T>[];
