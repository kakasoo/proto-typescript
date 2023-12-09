import { toPrimitive } from './interfaces/to-primitive.interface';
import { ArrayPrototype } from './prototypes';
import { TypedString } from './typed-string.class';
import { MethodsFrom } from './types';

export class TypedArray<T extends any[] | readonly any[]>
  implements Pick<MethodsFrom<Array<any>>, 'join' | 'at'>, toPrimitive<[...T]>
{
  constructor(private readonly data: T) {}

  /**
   * Returns the item located at the specified index.
   * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
   */
  at<Index extends number = 0>(index: Index): ReturnType<typeof ArrayPrototype.at<T, Index>> {
    return this.at(index);
  }

  /**
   * type-safe join.
   * @example new TypedArray([1, 2, 3] as const).join(',');
   *
   * @param separator A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
   * @todo support `TypedArray` type as Container
   * @todo support `TypedString` type as Separator
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
