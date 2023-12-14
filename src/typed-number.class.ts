import { toPrimitive } from './interfaces/to-primitive.interface';

export class TypedNumber<T extends number = 0> implements toPrimitive<T> {
  constructor(private readonly number: T = 0 as T) {}

  toPrimitive(): T {
    return this.number;
  }
}
