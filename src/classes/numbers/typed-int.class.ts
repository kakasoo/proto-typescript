import { StringType } from '../../types';

export class TypedInt<T extends number> {
  private readonly int: T;
  constructor(data: StringType.IsInt<T>) {
    if (typeof data === 'number') {
      this.int = data;
    } else {
      throw new Error('IS NOT INT FORMAT');
    }
  }
}
