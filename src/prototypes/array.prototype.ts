import { Join } from '../types';

export const ArrayPrototype = {
  /**
   * type-safe join.
   * @example ArrayPrototype.join(["a", "b"]);
   * @example ArrayPrototype.join(["a", "b"] as const);
   *
   * @param container
   * @param separator A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
   * @returns
   */
  join<
    Container extends readonly (string | number | boolean)[] | (string | number | boolean)[],
    Separator extends string = ',',
  >(container: Container, separator: Separator = ',' as Separator): Join<Container, Separator> {
    return container.join(separator) as Join<Container, Separator>;
  },
};
