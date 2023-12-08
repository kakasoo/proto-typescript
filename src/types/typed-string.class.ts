import { toPrimitive } from '../interfaces/to-primitive.interface';

export class TypedString<T extends string | number | boolean> implements toPrimitive<`${T}`> {
  private readonly data: `${T}`;

  constructor(data: T) {
    this.data = String(data) as `${T}`;
  }

  toPrimitive(): `${T}` {
    return this.data;
  }
}
