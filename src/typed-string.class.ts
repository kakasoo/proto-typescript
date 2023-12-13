import { toPrimitive } from './interfaces/to-primitive.interface';
import { StringPrototype } from './prototypes';
import { TypedArray } from './typed-array.class';
import { TypedNumber } from './typed-number.class';
import { Join, Length, MethodsFrom, Split } from './types';
import { AIsLessThanOrEqualB } from './types/number.type';
import { ReadonlyOrNot } from './types/primitive.type';

export class TypedString<T extends string | number | boolean = ''>
  implements Pick<MethodsFrom<String>, 'split' | 'at' | 'concat'>, toPrimitive<T | `${T}`>
{
  private readonly data: `${T}`;

  constructor(data: T = '' as T) {
    this.data = String(data) as `${T}`;
  }

  /**
   * @inheritdoc
   */
  concat<Strings extends ReadonlyOrNot<(string | TypedString<string>)[]>>(
    ...strings: Strings
  ): TypedString<ReturnType<typeof StringPrototype.concat<`${T}`, TypedString.ValueTypes<Strings>>>> {
    const primitiveStrs = strings.map((el) => (typeof el === 'string' ? el : el.toPrimitive()));
    const initialValue = [this.data, primitiveStrs].join('') as Join<[`${T}`, ...TypedString.ValueTypes<Strings>], ''>;
    return new TypedString(initialValue);
  }

  /**
   * If a value greater than the length of the current data is given as an index, it is inferred as underdefined that no wrapper exists.
   * @inheritdoc
   */
  at<
    Index extends number,
    RETURN_TYPE extends AIsLessThanOrEqualB<Index, Length<`${T}`>> extends true
      ? TypedString<ReturnType<typeof StringPrototype.at<`${T}`, Index>>>
      : undefined,
  >(index: Index | TypedNumber<Index> = new TypedNumber()): RETURN_TYPE {
    const primitiveIndex = typeof index === 'number' ? index : index.toPrimitive();
    const initialValue = this.data.at(primitiveIndex);
    if (initialValue) {
      return new TypedString(initialValue) as RETURN_TYPE;
    }
    return undefined as RETURN_TYPE;
  }

  /**
   * type-safe split.
   * @inheritdoc
   */
  split<Splitter extends string = '', Limit extends number = 0>(
    splitter: Splitter | TypedString<Splitter> = new TypedString<Splitter>(),
    limit: Limit | TypedNumber<Limit> = new TypedNumber<Limit>(),
  ): TypedArray<ReturnType<typeof StringPrototype.split<`${T}`, Splitter, Limit>>> {
    const primitiveContainer = typeof splitter === 'string' ? splitter : splitter.toPrimitive();
    const primitiveLimit = typeof limit === 'number' ? limit : limit.toPrimitive();
    const initialValue = this.data.split(primitiveContainer, primitiveLimit) as Split<`${T}`, Splitter, Limit>;
    return new TypedArray(initialValue);
  }

  toPrimitive(): T;
  toPrimitive(): `${T}`;
  toPrimitive(): T | `${T}` {
    return this.data;
  }
}

export namespace TypedString {
  /**
   * Inference of value type.
   */
  export type ValueType<Pointer extends TypedString<any> | string> = Pointer extends TypedString<infer T>
    ? `${T}`
    : Pointer extends string
      ? Pointer
      : never;

  /**
   * Inference of value types.
   */
  export type ValueTypes<Pointer extends ReadonlyOrNot<(TypedString<any> | string)[]>> = Pointer extends [
    infer F extends TypedString<infer T> | string,
    ...infer Rest extends ReadonlyOrNot<(TypedString<any> | string)[]>,
  ]
    ? [TypedString.ValueType<F>, ...TypedString.ValueTypes<Rest>]
    : [];
}
