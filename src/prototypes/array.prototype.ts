import { ArrayType, Equal, NumberType } from '../types';
import { Primitive, ReadonlyOrNot } from '../types/primitive.type';

export const ArrayPrototype = {
  /**
   * @param container
   * @param predicate
   * @example
   * ```ts
   * const answer = ArrayPrototype.filter<[1, 2, 3, 4, 5], 2>([1, 2, 3, 4, 5] as const, (el: any): el is 2 => el === 2);
   * const answer = ArrayPrototype.filter([1, 2, 3, 4, 5] as const, (el: any): el is 3 => el === 3);
   * ```
   * @returns
   */
  filter<Container extends ReadonlyOrNot<any[]>, Target = any>(
    container: Container,
    predicate: ArrayType.TypePredicate<Container, Target>,
  ): Equal<Target, unknown> extends true
    ? boolean
    : Equal<Target, any> extends true
      ? boolean
      : ArrayType.Filter<Container, Target> {
    return container.filter(predicate as any) as Equal<Target, unknown> extends true
      ? boolean
      : Equal<Target, any> extends true
        ? boolean
        : ArrayType.Filter<Container, Target>;
  },

  /**
   * Filter `null` or `undefined` element of Array Container.
   * @param container
   * @param predicate filtering options
   * @returns
   */
  filterNullish<Container extends ReadonlyOrNot<any[]>, FilterNull extends boolean, FilterUndefined extends boolean>(
    container: Container,
    predicate: {
      filterNull: FilterNull;
      filterUndefined: FilterUndefined;
    },
  ): ArrayType.FilterNullish<Container, FilterNull, FilterUndefined> {
    return container.filter((element) => {
      if (predicate.filterNull === true) {
        return element !== null;
      }

      if (predicate.filterUndefined === true) {
        return element !== undefined;
      }

      return true;
    }) as ArrayType.FilterNullish<Container, FilterNull, FilterUndefined>;
  },

  /**
   * It only returns the 0th index without subtracting the elements inside the actual container.
   * @param conatiner
   * @returns
   */
  shift<Container extends ReadonlyOrNot<any[]>>(conatiner: Container): ArrayType.At<Container, 0> {
    return conatiner.at(0);
  },

  /**
   * Only return the last index without subtracting the elements inside the actual container.
   * @param conatiner
   * @returns
   */
  pop<Container extends ReadonlyOrNot<any[]>>(
    conatiner: Container,
  ): ArrayType.At<Container, NumberType.Sub<ArrayType.Length<Container>, 1>> {
    return conatiner.at(conatiner.length - 1);
  },

  /**
   * @param container
   * @param items
   * @returns
   */
  unshift<Container extends ReadonlyOrNot<any[]>, Items extends ReadonlyOrNot<any[]>>(
    container: Container,
    ...items: Items
  ): ArrayType.Concat<Items, Container> {
    return [...items, ...container];
  },

  /**
   * @todo add paramter of this method, named `thisArg`.
   *
   * @param container
   * @param predicate
   * @returns
   */
  some<Container extends ReadonlyOrNot<any[]>, Target = any>(
    container: Container,
    predicate: ArrayType.TypePredicate<Container, Target>,
    thisArg?: any,
  ): Equal<Target, unknown> extends true
    ? boolean
    : Equal<Target, any> extends true
      ? boolean
      : ArrayType.Includes<Container, Target> {
    return container.some(predicate as any) as Equal<Target, unknown> extends true
      ? boolean
      : Equal<Target, any> extends true
        ? boolean
        : ArrayType.Includes<Container, Target>;
  },

  /**
   * @param container
   * @param items
   * @returns
   */
  push<Container extends ReadonlyOrNot<any[]>, Items extends ReadonlyOrNot<any[]>>(
    container: Container,
    ...items: Items
  ): ArrayType.Concat<Container, Items> {
    return [...container, ...items];
  },

  /**
   * @param container
   */
  at<Container extends ReadonlyOrNot<any[]>, Index extends number>(
    container: Container,
    index: Index,
  ): ArrayType.At<Container, Index> {
    return container.at(index);
  },

  /**
   * type-safe join.
   * @example ArrayPrototype.join(["a", "b"]);
   * @example ArrayPrototype.join(["a", "b"] as const);
   *
   * @param container
   * @param separator A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
   *
   * @todo support bigint type (es2020) as element of Array.
   */
  join<Container extends ReadonlyOrNot<Exclude<Primitive, symbol>[]>, Separator extends string = ','>(
    container: Container,
    separator: Separator = ',' as Separator,
  ): ArrayType.Join<Container, Separator> {
    return container.join(separator) as ArrayType.Join<Container, Separator>;
  },
};
