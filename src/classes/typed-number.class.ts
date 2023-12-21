import { toPrimitive } from '../interfaces/to-primitive.interface';
import { ReadonlyOrNot } from '../types/primitive.type';
import { TypedObject } from './typed-object.class';

export class TypedNumber<T extends number> extends TypedObject<T> implements toPrimitive<T> {
  private readonly number: T;

  constructor(data = 0 as T) {
    super(data);
    this.number = data;
  }

  toPrimitive(): T {
    return this.number;
  }
}

export namespace TypedNumber {
  export type Format = 'number' | 'int' | `decimal(${number},${number})` | 'float' | `range(${number},${number})`;
  /**
   * Inference of value type.
   */
  export type ValueType<Pointer extends TypedNumber<any> | number> = Pointer extends TypedNumber<infer T>
    ? T
    : Pointer extends number
      ? Pointer
      : never;

  /**
   * Inference of value types.
   */
  export type ValueTypes<Pointers extends ReadonlyOrNot<(TypedNumber<any> | number)[]>> = Pointers extends [
    infer F extends TypedNumber<infer T> | number,
    ...infer Rest extends ReadonlyOrNot<(TypedNumber<any> | number)[]>,
  ]
    ? [TypedNumber.ValueType<F>, ...TypedNumber.ValueTypes<Rest>]
    : [];
}
