import { toPrimitive } from '../../interfaces';
import { ToTypedNumber } from '../../interfaces/to-typed-number.interface';
import { StringType } from '../../types';
import { TypedNumber } from '../typed-number.class';

export class TypedInt<T extends number> implements toPrimitive<T>, ToTypedNumber<T> {
  private readonly int: T;
  constructor(data: StringType.IsInt<T>) {
    if (typeof data === 'number') {
      this.int = data;
    } else {
      throw new Error('IS NOT INT FORMAT');
    }
  }

  toTypedNumber(): TypedNumber<T> {
    return new TypedNumber<T>(this.int);
  }

  toPrimitive(): T {
    return this.int;
  }
}
