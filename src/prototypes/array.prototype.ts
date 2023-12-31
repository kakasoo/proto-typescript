import { ArrayType, NumberType } from '../types';
import { Primitive, ReadonlyOrNot } from '../types/primitive.type';

export const ArrayPrototype = {
  /**
   * It only returns the 0th index without subtracting the elements inside the actual container.
   * @param conatiner
   * @returns
   */
  shift<Conatiner extends ReadonlyOrNot<any[]>>(conatiner: Conatiner): ArrayType.At<Conatiner, 0> {
    return conatiner.at(0);
  },

  /**
   * Only return the last index without subtracting the elements inside the actual container.
   * @param conatiner
   * @returns
   */
  pop<Conatiner extends ReadonlyOrNot<any[]>>(
    conatiner: Conatiner,
  ): ArrayType.At<Conatiner, NumberType.Sub<ArrayType.Length<Conatiner>, 1>> {
    return conatiner.at(conatiner.length - 1);
  },

  /**
   * @param container
   * @param items
   * @returns
   */
  unshift<Conatiner extends ReadonlyOrNot<any[]>, Items extends ReadonlyOrNot<any[]>>(
    container: Conatiner,
    ...items: Items
  ): ArrayType.Concat<Items, Conatiner> {
    return [...items, ...container];
  },

  /**
   * @todo add paramter of this method, named `thisArg`.
   *
   * @param container
   * @param predicate
   * @returns
   */
  some<Target, Conatiner extends ReadonlyOrNot<any[]>>(
    container: Conatiner,
    predicate: <INNER_TARGET = Target, Index extends number = number>(
      value: ArrayType.At<Conatiner, Index>,
      index: Index,
      array: Conatiner,
    ) => ArrayType.Some<INNER_TARGET, Conatiner>,
    // thisArg?: any,
  ): boolean {
    for (let i = 0; i < container.length; i++) {
      if (predicate(container[i], i, container)) {
        return true;
      }
    }

    return false;
  },

  /**
   * @param container
   * @param items
   * @returns
   */
  push<Conatiner extends ReadonlyOrNot<any[]>, Items extends ReadonlyOrNot<any[]>>(
    container: Conatiner,
    ...items: Items
  ): ArrayType.Concat<Conatiner, Items> {
    return [...container, ...items];
  },

  /**
   * @inheritdoc
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
   * @inheritdoc
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
