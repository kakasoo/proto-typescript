import { ToPrimitive } from '../interfaces';
import { ReadonlyOrNot } from '../types';
import { TypedObject } from './typed-object.class';

export class TypedBoolean<T extends boolean = false> extends TypedObject<T> implements ToPrimitive<T> {
  private readonly boolean: T;

  constructor(data: T = false as T) {
    super(data);
    this.boolean = data;
  }

  toPrimitive(): T {
    return this.boolean;
  }
}

export namespace TypedBoolean {
  /**
   * Inference of value type.
   */
  export type ValueType<Pointer extends TypedBoolean<any> | Boolean> = Pointer extends TypedBoolean<infer T>
    ? `${T}`
    : Pointer extends boolean
      ? Pointer
      : never;

  /**
   * Inference of value types.
   */
  export type ValueTypes<Pointers extends ReadonlyOrNot<(TypedBoolean<any> | boolean)[]>> = Pointers extends [
    infer F extends TypedBoolean<infer T> | boolean,
    ...infer Rest extends ReadonlyOrNot<(TypedBoolean<any> | boolean)[]>,
  ]
    ? [TypedBoolean.ValueType<F>, ...TypedBoolean.ValueTypes<Rest>]
    : [];
}
