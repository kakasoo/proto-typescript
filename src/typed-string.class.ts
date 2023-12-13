import { toPrimitive } from './interfaces/to-primitive.interface';
import { StringPrototype } from './prototypes';
import { TypedArray } from './typed-array.class';
import { TypedNumber } from './typed-number.class';
import { Length, MethodsFrom, Split } from './types';
import { AIsLessThanOrEqualB } from './types/number.type';

export class TypedString<T extends string | number | boolean = ''>
  implements Pick<MethodsFrom<String>, 'split' | 'at'>, toPrimitive<T | `${T}`>
{
  private readonly data: `${T}`;

  constructor(data: T = '' as T) {
    this.data = String(data) as `${T}`;
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
