export namespace NeverType {
  export type IsNever<T> = [T] extends [never] ? true : false;
}
