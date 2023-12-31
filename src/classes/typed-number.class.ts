import { ToPrimitive } from '../interfaces/to-primitive.interface';
import { StringType } from '../types';
import { ReadonlyOrNot } from '../types/primitive.type';
import { TypedDecimal } from './numbers/typed-decimal.class';
import { TypedInt } from './numbers/typed-int.class';
import { TypedObject } from './typed-object.class';

export class TypedNumber<T extends number> extends TypedObject<T> implements ToPrimitive<T> {
  private readonly number: T;

  constructor(data = 0 as T) {
    super(data);
    this.number = data;
  }

  /**
   * A function that makes it possible to narrow down the range of TypeNumber types more narrowly.
   *
   * @param format 'int' | 'decimal' | 'decimal(n,n)' | 'float'
   * @example
   * ```ts
   * TypedNumber.refine('int')(3); // only int.
   *
   * TypedNumber.refine('decimal', 1, 2)(3.14); // only decimal(1,2).
   * TypedNumber.refine('decimal')(3.14); // decimal, if is same as float.
   * TypedNumber.refine('decimal(1,2)')(3.14);
   * ```
   *
   * @todo if format is `decimal(n,n)`, integer and fractional parameter have to be empty.
   */
  static refine<Integer extends number>(format: 'int'): <N extends number>(data: StringType.IsInt<N>) => TypedInt<N>;
  static refine<Integer extends number>(
    format: 'float',
  ): <N extends number>(data: StringType.IsDecimal<N, number, number>) => TypedDecimal<N, number, number>;
  static refine<Integer extends number, Fractional extends number>(
    format: 'decimal' | `decimal(${Integer},${Fractional})`,
    integer?: Integer,
    fractional?: Fractional,
  ): <N extends number>(data: StringType.IsDecimal<N, Integer, Fractional>) => TypedDecimal<N, Integer, Fractional>;
  static refine<Integer extends number, Fractional extends number>(
    format: 'int' | 'float' | 'decimal' | `decimal(${Integer},${Fractional})`,
    integer?: Integer,
    fractional?: Fractional,
  ) {
    if (format === 'int') {
      const Int = <N extends number>(data: StringType.IsInt<N>): TypedInt<N> => {
        return new TypedInt<N>(data);
      };
      return Int;
    } else if (format === 'float') {
      const Float = <N extends number>(
        data: StringType.IsDecimal<N, number, number>,
      ): TypedDecimal<N, number, number> => {
        return new TypedDecimal<N, number, number>(data);
      };

      return Float;
    } else {
      const Decimal = <N extends number>(
        data: StringType.IsDecimal<N, Integer, Fractional>,
      ): TypedDecimal<N, Integer, Fractional> => {
        return new TypedDecimal<N, Integer, Fractional>(data);
      };
      return Decimal;
    }
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
