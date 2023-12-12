import { toPrimitive } from './interfaces/to-primitive.interface';
import { ArrayPrototype } from './prototypes';
import { TypedNumber } from './typed-number.class';
import { TypedString } from './typed-string.class';
import { ArraySome, At, ElementOf, MethodsFrom } from './types';
import { ReadonlyOrNot } from './types/primitive.type';

export class TypedArray<T extends ReadonlyOrNot<any[]>>
  implements
    Pick<MethodsFrom<Array<ElementOf<T>>>, 'join' | 'at' | 'push' | 'some'>,
    toPrimitive<[...T]>,
    Iterable<ElementOf<T>>
{
  constructor(data: T);
  constructor(...data: T);
  constructor(private readonly data: T) {}

  [Symbol.iterator](): Iterator<ElementOf<T>, any> {
    let i = 0;
    return {
      next: () => {
        return i === this.data.length
          ? { done: true as const, value: undefined }
          : { value: this.data.at(i++), done: false as const };
      },
    };
  }

  /**
   * @inheritdoc
   *
   * I'm reviewing whether internal functions that are different from the existing som should be provided by default for type inference.
   * @todo add function named `IsSameElement` for type inference.
   */
  some<Target>(
    predicate: <INNER_TARGET = Target, Index extends number = number>(
      value: At<T, Index>,
      index: Index,
      array: T,
    ) => ArraySome<INNER_TARGET, T>,
  ): ReturnType<typeof ArrayPrototype.some> {
    return ArrayPrototype.some(this.data, predicate);
  }

  /**
   * Appends new elements to the end of an array
   *
   * @example
   * ```ts
   * new TypedArray([1, 2, 3] as const).push(4 as const); // [1, 2, 3, 4]
   * ```
   *
   * @param items
   * @returns Unlike JavaScript's Array.prototype.join, it returns a new TypeArray instance rather than the length of the inserted data.
   */
  push<Items extends ReadonlyOrNot<ElementOf<T>[]>>(
    ...items: Items
  ): TypedArray<ReturnType<typeof ArrayPrototype.push<T, Items>>> {
    return new TypedArray([...this.data, ...items]);
  }

  /**
   * @inheritDoc
   */
  at<Index extends number = 0>(
    index: Index | TypedNumber<Index> = new TypedNumber(),
  ): ReturnType<typeof ArrayPrototype.at<T, Index>> {
    const primitiveIndex = typeof index === 'number' ? index : index.toPrimitive();
    return this.at(primitiveIndex);
  }

  /**
   * type-safe join.
   * @example
   * ```ts
   * new TypedArray([1, 2, 3] as const).join(','); // '1,2,3'
   * ```
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
