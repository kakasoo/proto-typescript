import { Split } from '../types';

export namespace StringPrototype {
  export function split<Container extends string, Splitter extends string, Limit extends number>(
    container: Container,
    splitter: Splitter,
    limit?: Limit,
  ): Split<Container, Splitter, Limit> {
    return container.split(splitter, limit) as Split<Container, Splitter, Limit>;
  }
}
