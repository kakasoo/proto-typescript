import { toPrimitive } from './interfaces/to-primitive.interface';
import { ArrayPrototype } from './prototypes';
import { TypedNumber } from './typed-number.class';
import { TypedObject } from './typed-object.class';
import { TypedString } from './typed-string.class';
import { ArraySome, ArrayAt, ElementOf, Equal, MethodsFrom } from './types';
import { ReadonlyOrNot } from './types/primitive.type';

export class TypedArray<T extends ReadonlyOrNot<any[]>>
  implements
    Pick<MethodsFrom<Array<any>>, 'join' | 'at' | 'push' | 'some' | 'unshift'>,
    toPrimitive<[...T]>,
    Iterable<ElementOf<T>>
{
  constructor(array: T);
  constructor(...array: T);
  constructor(private readonly array: T) {}

  [Symbol.iterator](): Iterator<ElementOf<T>, any> {
    let i = 0;
    return {
      next: () => {
        return i === this.array.length
          ? { done: true as const, value: undefined }
          : { value: this.array.at(i++), done: false as const };
      },
    };
  }

  /**
   * @inheritdoc
   * @example
   * ```ts
   * new TypedArray([1, 2, 3] as const).unshift(4 as const); // [4, 1, 2, 3]
   * ```
   *
   * @param items
   * @returns Unlike JavaScript's Array.prototype.unshift, it returns a new TypeArray instance rather than the length of the inserted data.
   */
  unshift<Items extends ReadonlyOrNot<any[]>>(
    ...items: Items
  ): TypedArray<ReturnType<typeof ArrayPrototype.unshift<T, Items>>> {
    return new TypedArray([...items, ...this.array]);
  }

  /**
   * @inheritdoc
   *
   * I'm reviewing whether internal functions that are different from the existing som should be provided by default for type inference.
   * @todo add function named `IsSameElement` for type inference.
   */
  some<Target>(
    predicate: <INNER_TARGET = Target, Index extends number = number>(
      value: ArrayAt<T, Index>,
      index: Index,
      array: T,
    ) => ArraySome<INNER_TARGET, T>,
  ): ReturnType<typeof ArrayPrototype.some> {
    return ArrayPrototype.some(this.array, predicate);
  }

  /**
   * @inheritdoc
   * @example
   * ```ts
   * new TypedArray([1, 2, 3] as const).push(4 as const); // [1, 2, 3, 4]
   * ```
   *
   * @param items
   * @returns Unlike JavaScript's Array.prototype.push, it returns a new TypeArray instance rather than the length of the inserted data.
   *
   * @todo
   * Supporting TypedString and TypedNumber for items that are element type of items.
   * I'm wondering if this is the right type reasoning or if it should still be in the form of the Wrapper class.
   */
  push<Items extends ReadonlyOrNot<any[]>>(
    ...items: Items
  ): TypedArray<ReturnType<typeof ArrayPrototype.push<T, Items>>> {
    return new TypedArray([...this.array, ...items]);
  }

  /**
   * @inheritDoc
   */
  at<Index extends number = 0>(
    index: Index | TypedNumber<Index> = new TypedNumber(),
  ): ReturnType<typeof ArrayPrototype.at<T, Index>> {
    const primitiveIndex = typeof index === 'number' ? index : index.toPrimitive();
    return this.array.at(primitiveIndex);
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
    const initialValue = ArrayPrototype.join(this.array, primitiveSeparator);
    return new TypedString(initialValue);
  }

  toPrimitive(): [...T] {
    return [...this.array];
  }
}
