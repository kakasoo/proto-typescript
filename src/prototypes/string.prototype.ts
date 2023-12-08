import { Split } from '../types';

export const StringPrototype = {
  /**
   * type-safe split.
   * @example StringPrototype.split('abcde', 'c', 1) // ['ab']
   *
   * @param container original string value.
   * @param splitter An object that can split a string.
   * @param limit A value used to limit the number of elements returned in the array.
   */
  split<Container extends string, Splitter extends string = '', Limit extends number = 0>(
    container: Container,
    splitter: Splitter,
    limit?: Limit,
  ): Split<Container, Splitter, Limit> {
    return container.split(splitter, limit) as Split<Container, Splitter, Limit>;
  },
};
