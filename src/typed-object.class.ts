import { IS_TYPED_CLASS, IsTypedInteface } from './interfaces/is-typed.interface';
import { TypedClass } from './types/primitive.type';

export class TypedObject<T extends any> implements IsTypedInteface {
  readonly [IS_TYPED_CLASS]: true = true;
  constructor(private readonly object: T) {}

  toPrimitive(): T {
    return this.object;
  }

  protected isTypedClass(data: any): data is TypedClass {
    return data[IS_TYPED_CLASS] === true;
  }
}
