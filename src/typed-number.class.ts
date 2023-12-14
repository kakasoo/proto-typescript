import { toPrimitive } from './interfaces/to-primitive.interface';
import { TypedObject } from './typed-object.class';

export class TypedNumber<T extends number = 0> extends TypedObject<T> implements toPrimitive<T> {
  constructor(private readonly number: T = 0 as T) {
    super(number);
  }

  toPrimitive(): T {
    return this.number;
  }
}
