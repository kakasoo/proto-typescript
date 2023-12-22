import { toPrimitive } from '../../interfaces';
import { ToTypedNumber } from '../../interfaces/to-typed-number.interface';
import { StringType } from '../../types';
import { TypedNumber } from '../typed-number.class';

export class TypedDecimal<T extends number, Integer extends number, Fractional extends number>
  implements toPrimitive<T>, ToTypedNumber<T>
{
  private readonly decimal: T;
  constructor(data: StringType.IsDecimal<T, Integer, Fractional>) {
    if (typeof data === 'number') {
      this.decimal = data;
    } else {
      throw new Error('IS NOT INT FORMAT');
    }
  }

  toTypedNumber(): TypedNumber<T> {
    return new TypedNumber<T>(this.decimal);
  }

  toPrimitive(): T {
    return this.decimal;
  }
}
