import { At, Concat, Join, ArraySome } from '../types';
import { Primitive, ReadonlyOrNot } from '../types/primitive.type';

export const ArrayPrototype = {
  some<Target, Conatiner extends ReadonlyOrNot<any[]>>(
    container: Conatiner,
    predicate: <INNER_TARGET = Target, Index extends number = number>(
      value: At<Conatiner, Index>,
      index: Index,
      array: Conatiner,
    ) => ArraySome<INNER_TARGET, Conatiner>,
    // thisArg?: any,
  ): boolean {
    for (let i = 0; i < container.length; i++) {
      if (predicate(container[i], i, container)) {
        return true;
      }
    }

    return false;
  },

  push<Conatiner extends ReadonlyOrNot<any[]>, Items extends ReadonlyOrNot<any[]>>(
    container: Conatiner,
    ...items: Items
  ): Concat<Conatiner, Items> {
    return [...container, ...items];
  },

  /**
   * @inheritdoc
   * @param container
   */
  at<Container extends ReadonlyOrNot<any[]>, Index extends number>(
    container: Container,
    index: Index,
  ): At<Container, Index> {
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
  ): Join<Container, Separator> {
    return container.join(separator) as Join<Container, Separator>;
  },
};
