import { toPrimitive } from '../interfaces/to-primitive.interface';
import { NumberType } from '../types';
import { ReadonlyOrNot } from '../types/primitive.type';
import { TypedObject } from './typed-object.class';

export class TypedNumber<
    T extends number = 0,
    Format extends
      | `${number}`
      | NumberType.Decimal<number, number>
      | NumberType.Float
      | NumberType.Range<number, number> = `${number}`,
  >
  extends TypedObject<T>
  implements toPrimitive<T>
{
  constructor(private readonly number: T = 0 as T) {
    super(number);
  }

  toPrimitive(): T {
    return this.number;
  }
}

export namespace TypedNumber {
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
