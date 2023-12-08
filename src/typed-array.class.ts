import { toPrimitive } from './interfaces/to-primitive.interface';
import { ArrayPrototype } from './prototypes';
import { TypedString } from './typed-string.class';

export class TypedArray<T extends any[] | readonly any[]> implements toPrimitive<[...T]> {
  constructor(private readonly data: T) {}

  /**
   * type-safe join.
   * @example new TypedArray([1, 2, 3] as const).join(',');
   *
   * @param separator A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
   * @returns
   */
  join<Separator extends string>(
    separator: Separator = '' as Separator,
  ): TypedString<ReturnType<typeof ArrayPrototype.join<T, Separator>>> {
    const initialValue = ArrayPrototype.join(this.data, separator);
    return new TypedString(initialValue);
  }

  toPrimitive(): [...T] {
    return [...this.data];
  }
}
