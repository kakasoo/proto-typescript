import { toPrimitive } from '../../interfaces';
import { StringType } from '../../types';

export class TypedInt<T extends number> implements toPrimitive<T> {
  private readonly int: T;
  constructor(data: StringType.IsInt<T>) {
    if (typeof data === 'number') {
      this.int = data;
    } else {
      throw new Error('IS NOT INT FORMAT');
    }
  }

  toPrimitive(): T {
    return this.int;
  }
}
