import { At, Concat, Join } from '../types';

export const ArrayPrototype = {
  push<Conatiner extends any[] | readonly any[], Items extends any[] | readonly any[]>(
    container: Conatiner,
    ...items: Items
  ): Concat<Conatiner, Items> {
    return [...container, ...items];
  },

  /**
   * @inheritdoc
   * @param container
   */
  at<Container extends any[] | readonly any[], Index extends number>(
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
  join<
    Container extends readonly (string | number | boolean)[] | (string | number | boolean)[],
    Separator extends string = ',',
  >(container: Container, separator: Separator = ',' as Separator): Join<Container, Separator> {
    return container.join(separator) as Join<Container, Separator>;
  },
};
