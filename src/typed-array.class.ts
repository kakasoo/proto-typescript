import { toPrimitive } from './interfaces/to-primitive.interface';
import { ArrayPrototype } from './prototypes';

export class TypedArray<T extends any[] | readonly any[]> implements toPrimitive<[...T]> {
  constructor(private readonly data: T) {}

  /**
   * @example new TypedArray([1, 2, 3] as const).join(',');
   * @param separator
   * @returns
   */
  join<Separator extends string>(separator: Separator): ReturnType<typeof ArrayPrototype.join<T, Separator>> {
    return ArrayPrototype.join(this.data, separator);
  }

  toPrimitive(): [...T] {
    return [...this.data];
  }
}
