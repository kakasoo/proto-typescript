import { toPrimitive } from './interfaces/to-primitive.interface';
import { StringPrototype } from './prototypes';
import { TypedArray } from './typed-array.class';
import { TypedNumber } from './typed-number.class';
import { Split } from './types';

export class TypedString<T extends string | number | boolean> implements toPrimitive<`${T}`> {
  private readonly data: `${T}`;

  constructor(data: T = '' as T) {
    this.data = String(data) as `${T}`;
  }

  /**
   * type-safe split.
   * @param splitter An object that can split a string.
   * @param limit A value used to limit the number of elements returned in the array.
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

  toPrimitive(): `${T}` {
    return this.data;
  }
}
