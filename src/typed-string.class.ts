import { toPrimitive } from './interfaces/to-primitive.interface';
import { StringPrototype } from './prototypes';
import { TypedArray } from './typed-array.class';
import { Split } from './types';

export class TypedString<T extends string | number | boolean> implements toPrimitive<`${T}`> {
  private readonly data: `${T}`;

  constructor(data: T) {
    this.data = String(data) as `${T}`;
  }

  split<Splitter extends string = '', Limit extends number = 0>(
    splitter: Splitter = '' as Splitter,
    limit: Limit = 0 as Limit,
  ): TypedArray<ReturnType<typeof StringPrototype.split<`${T}`, Splitter, Limit>>> {
    const initialValue = this.data.split(splitter, limit) as Split<`${T}`, Splitter, Limit>;
    return new TypedArray(initialValue);
  }

  toPrimitive(): `${T}` {
    return this.data;
  }
}
