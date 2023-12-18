import { toPrimitive } from './interfaces/to-primitive.interface';
import { ArrayPrototype, StringPrototype } from './prototypes';
import { TypedArray } from './typed-array.class';
import { TypedNumber } from './typed-number.class';
import { TypedObject } from './typed-object.class';
import { ArrayType, FunctionType, NumberType } from './types';
import { ReadonlyOrNot } from './types/primitive.type';

/**
 * @todo support iterator.
 */
export class TypedString<T extends string | number | boolean = ''>
  extends TypedObject<T>
  implements Pick<FunctionType.MethodsFrom<String>, 'split' | 'at' | 'concat'>, toPrimitive<T | `${T}`>
{
  private readonly string: `${T}`;

  constructor(data: T = '' as T) {
    super(data);
    this.string = String(data) as `${T}`;
  }

  /**
   * @inheritdoc
   */
  concat<Strings extends ReadonlyOrNot<(string | TypedString<string>)[]>>(
    ...strings: Strings
  ): TypedString<ReturnType<typeof StringPrototype.concat<`${T}`, TypedString.ValueTypes<Strings>>>> {
    const primitiveStrs = strings.map((el) => (this.isTypedClass(el) ? el.toPrimitive() : el));
    const initialValue = ArrayPrototype.join([this.string, ...primitiveStrs] as const, '') as ArrayType.Join<
      [`${T}`, ...TypedString.ValueTypes<Strings>],
      ''
    >;
    return new TypedString(initialValue);
  }

  /**
   * If a value greater than the length of the current data is given as an index, it is inferred as underdefined that no wrapper exists.
   * @inheritdoc
   */
  at<
    Index extends number,
    RETURN_TYPE extends NumberType.Compare<Index, '<=', ArrayType.Length<`${T}`>> extends true
      ? TypedString<ReturnType<typeof StringPrototype.at<`${T}`, Index>>>
      : undefined,
  >(index: Index | TypedNumber<Index> = new TypedNumber()): RETURN_TYPE {
    const primitiveIndex = this.isTypedClass(index) ? index.toPrimitive() : index;
    const initialValue = StringPrototype.at(this.string, primitiveIndex);
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
    const primitiveContainer = this.isTypedClass(splitter) ? splitter.toPrimitive() : splitter;
    const primitiveLimit = this.isTypedClass(limit) ? limit.toPrimitive() : limit;
    const initialValue = StringPrototype.split(this.string, primitiveContainer, primitiveLimit);
    return new TypedArray(initialValue);
  }

  toPrimitive(): T;
  toPrimitive(): `${T}`;
  toPrimitive(): T | `${T}` {
    return this.string;
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
  export type ValueTypes<Pointers extends ReadonlyOrNot<(TypedString<any> | string)[]>> = Pointers extends [
    infer F extends TypedString<infer T> | string,
    ...infer Rest extends ReadonlyOrNot<(TypedString<any> | string)[]>,
  ]
    ? [TypedString.ValueType<F>, ...TypedString.ValueTypes<Rest>]
    : [];
}
