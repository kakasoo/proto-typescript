import { toPrimitive } from './interfaces/to-primitive.interface';
import { ArrayPrototype } from './prototypes';
import { TypedString } from './typed-string.class';
import { ElementOf, MethodsFrom, NTuple } from './types';

export class TypedArray<T extends any[] | readonly any[]>
  implements Pick<MethodsFrom<Array<any>>, 'join' | 'at'>, toPrimitive<[...T]>
{
  constructor(data: T);
  constructor(...data: T);
  constructor(private readonly data: T) {}

  /**
   * @inheritDoc
   */
  at<Index extends number = 0>(index: Index): ReturnType<typeof ArrayPrototype.at<T, Index>> {
    return this.at(index);
  }

  /**
   * type-safe join.
   * @example new TypedArray([1, 2, 3] as const).join(',');
   *
   * @inheritdoc
   * @todo support `TypedString` type as Separator
   */
  join<Separator extends string = ','>(
    separator: Separator | TypedString<Separator> = ',' as Separator,
  ): TypedString<ReturnType<typeof ArrayPrototype.join<T, Separator>>> {
    const primitiveSeparator = typeof separator === 'string' ? separator : separator.toPrimitive();
    const initialValue = ArrayPrototype.join(this.data, primitiveSeparator);
    return new TypedString(initialValue);
  }

  toPrimitive(): [...T] {
    return [...this.data];
  }
}
