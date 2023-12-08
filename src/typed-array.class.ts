import { toPrimitive } from './interfaces/to-primitive.interface';
import { ArrayPrototype } from './prototypes';
import { TypedString } from './typed-string.class';

export class TypedArray<T extends any[] | readonly any[]> implements toPrimitive<[...T]> {
  constructor(private readonly data: T) {}

  /**
   * @example new TypedArray([1, 2, 3] as const).join(',');
   * @param separator
   * @returns
   */
  join<Separator extends string>(
    separator: Separator = '' as Separator,
  ): TypedString<ReturnType<typeof ArrayPrototype.join<T, Separator>>> {
    const initalValue = ArrayPrototype.join(this.data, separator);
    return new TypedString(initalValue);
  }

  toPrimitive(): [...T] {
    return [...this.data];
  }
}
