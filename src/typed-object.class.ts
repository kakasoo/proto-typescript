export class TypedObject<T extends any> {
  constructor(private readonly object: T) {}

  protected toPrimitive() {}
}
