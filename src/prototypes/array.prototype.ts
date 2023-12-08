import { Join } from '../types';

export const ArrayPrototype = {
  /**
   * type-safe join.
   *
   * @example ArrayPrototype.join(["a", "b"]);
   * @example ArrayPrototype.join(["a", "b"] as const);
   * @param arr
   * @param separator
   * @returns
   */
  join<
    Container extends readonly (string | number | boolean)[] | (string | number | boolean)[],
    Separator extends string = ',',
  >(arr: Container, separator: Separator = ',' as Separator): Join<Container, Separator> {
    return arr.join(separator) as Join<Container, Separator>;
  },
};
