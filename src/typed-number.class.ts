import { toPrimitive } from './interfaces/to-primitive.interface';

export class TypedNumber<T extends number = 0> implements toPrimitive<T> {
  constructor(private readonly data: T = 0 as T) {}

  toPrimitive(): T {
    return this.data;
  }
}
