import { TypedBoolean } from '../typed-boolean.class';
import { TypedNumber } from '../typed-number.class';
import { TypedString } from '../typed-string.class';
import { ArrayType } from './array.type';

export type Primitive = string | boolean | number | undefined | null | bigint | symbol;
export type TypedClass = TypedString<any> | TypedBoolean<any> | TypedNumber<any>; // | undefined | null | bigint | symbol;

export type ReadonlyOrNot<T extends any[]> = ArrayType.ElementOf<T>[] | readonly ArrayType.ElementOf<T>[];
