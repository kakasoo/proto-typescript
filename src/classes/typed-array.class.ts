import { ToPrimitive } from '../interfaces/to-primitive.interface';
import { ArrayPrototype } from '../prototypes';
import { FunctionType, ArrayType, NumberType, RegExpType } from '../types';
import { ReadonlyOrNot } from '../types/primitive.type';
import { TypedNumber } from './typed-number.class';
import { TypedObject } from './typed-object.class';
import { TypedString } from './typed-string.class';

type ParseToArray<T> = T extends ReadonlyOrNot<infer R>
  ? T
  : T extends RegExpType.Range<number, number>
    ? NumberType.Range<T>
    : [];

export class TypedArray<T extends ReadonlyOrNot<any[]> | RegExpType.Range<number, number>>
  extends TypedObject<ParseToArray<T>>
  implements
    Pick<FunctionType.MethodsFrom<Array<any>>, 'join' | 'at' | 'push' | 'some' | 'unshift' | 'pop' | 'shift'>,
    ToPrimitive<ParseToArray<T>>,
    Iterable<ArrayType.ElementOf<ParseToArray<T>>>
{
  private readonly array: ParseToArray<T>;

  constructor(data: T extends Array<any> ? T : never);
  constructor(...data: T extends Array<any> ? T : never);

  /**
   * @todo Can't we prioritize the values we received over the range? Why don't we just make a `refine` method for this, too?
   * @param data
   */
  constructor(data: T extends RegExpType.Range<number, number> ? ParseToArray<T> : never);
  constructor(...data: T extends RegExpType.Range<number, number> ? ParseToArray<T> : never);
  constructor(data: ParseToArray<T>) {
    super(data);
    this.array = data;
  }

  [Symbol.iterator](): Iterator<ArrayType.ElementOf<ParseToArray<T>>, any> {
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
   * It only returns the 0th index without subtracting the elements inside the actual container.
   * @todo Add an option parameter for if you want to cause the type after the element has been removed from the interior of the container to be inferred.
   */
  shift(): ReturnType<typeof ArrayPrototype.shift<ParseToArray<T>>> {
    return this.at(0);
  }

  /**
   * Only return the last index without subtracting the elements inside the actual container.
   * @todo Add an option parameter for if you want to cause the type after the element has been removed from the interior of the container to be inferred.
   */
  pop(): ReturnType<typeof ArrayPrototype.pop<ParseToArray<T>>> {
    return this.at(this.array.length - 1);
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
  ): TypedArray<ReturnType<typeof ArrayPrototype.unshift<ParseToArray<T>, Items>>> {
    const initialValue = ArrayPrototype.unshift<ParseToArray<T>, Items>(this.array, ...items);
    return new TypedArray(initialValue);
  }

  /**
   * @inheritdoc
   *
   * I'm reviewing whether internal functions that are different from the existing som should be provided by default for type inference.
   * @todo add function named `IsSameElement` for type inference.
   */
  some<Target>(
    predicate: <INNER_TARGET = Target, Index extends number = number>(
      value: ArrayType.At<ParseToArray<T>, Index>,
      index: Index,
      array: ParseToArray<T>,
    ) => ArrayType.Some<INNER_TARGET, ParseToArray<T>>,
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
  ): TypedArray<ReturnType<typeof ArrayPrototype.push<ParseToArray<T>, Items>>> {
    const initialValue = ArrayPrototype.push<ParseToArray<T>, Items>(this.array, ...items);
    return new TypedArray(initialValue);
  }

  /**
   * @inheritDoc
   */
  at<Index extends number = 0>(
    index: Index | TypedNumber<Index> = new TypedNumber(),
  ): ReturnType<typeof ArrayPrototype.at<ParseToArray<T>, Index>> {
    const primitiveIndex = this.isTypedClass(index) ? index.toPrimitive() : index;
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
  ): TypedString<ReturnType<typeof ArrayPrototype.join<ParseToArray<T>, Separator>>> {
    const primitiveSeparator = this.isTypedClass(separator) ? separator.toPrimitive() : separator;
    const initialValue = ArrayPrototype.join(this.array, primitiveSeparator);
    return new TypedString(initialValue);
  }

  toPrimitive(): ParseToArray<T> {
    return this.array;
  }
}

export namespace TypedArray {
  /**
   * Inference of value type.
   */
  export type ValueType<Pointer extends TypedArray<any> | Array<any>> = Pointer extends TypedArray<infer T>
    ? T
    : Pointer extends Array<any>
      ? Pointer
      : never;

  /**
   * Inference of value types.
   */
  export type ValueTypes<Pointers extends ReadonlyOrNot<(TypedArray<any> | Array<any>)[]>> = Pointers extends [
    infer F extends TypedArray<infer T> | Array<any>,
    ...infer Rest extends ReadonlyOrNot<(TypedArray<any> | Array<any>)[]>,
  ]
    ? [TypedArray.ValueType<F>, ...TypedArray.ValueTypes<Rest>]
    : [];
}
