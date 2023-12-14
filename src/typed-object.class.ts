import { TypedClass } from './types/primitive.type';

export const IS_TYPED_CLASS = Symbol('TYPED_CLASS');

export class TypedObject<T extends any> {
  private readonly [IS_TYPED_CLASS]: true;
  constructor(private readonly object: T) {
    this[IS_TYPED_CLASS] = true as const;
  }

  toPrimitive(): T {
    return this.object;
  }

  protected isTypedClass(data: any): data is TypedClass {
    return data[IS_TYPED_CLASS] === true;
  }
}
