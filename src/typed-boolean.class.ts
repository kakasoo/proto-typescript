import { TypedObject } from './typed-object.class';

export class TypedBoolean<T extends boolean = false> extends TypedObject<T> {
  private readonly boolean: T;

  constructor(data: T = false as T) {
    super(data);
    this.boolean = data;
  }
}
