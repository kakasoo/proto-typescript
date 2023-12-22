import { toPrimitive } from '../../interfaces';
import { StringType } from '../../types';

/**
 * @todo `toTypedNumber` method
 */
export class TypedDecimal<T extends number, Integer extends number, Fractional extends number>
  implements toPrimitive<T>
{
  private readonly decimal: T;
  constructor(data: StringType.IsDecimal<T, Integer, Fractional>) {
    if (typeof data === 'number') {
      this.decimal = data;
    } else {
      throw new Error('IS NOT INT FORMAT');
    }
  }

  toPrimitive(): T {
    return this.decimal;
  }
}
