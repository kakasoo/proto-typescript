import { ToPrimitive } from '../interfaces';
import { Equal, ReadonlyOrNot } from '../types';
import { TypedObject } from './typed-object.class';

export class TypedBoolean<T extends boolean = false> extends TypedObject<T> implements ToPrimitive<T> {
  private readonly boolean: T;

  constructor(data: T = false as T) {
    super(data);
    this.boolean = data;
  }

  /**
   * @example
   * ```ts
   * const yn = TypedBoolean.refine({ true: 'Y', false: 'N' });
   *
   * const t = yn('Y'); // true
   * const f = yn('N'); // false
   * const y = yn(true); // 'Y'
   * const n = yn(false); // 'N'
   * ```
   * @param map Defines the key name that you want to specify with true and false.
   * @returns
   */
  refine<T extends string, F extends string>(map: { true: T; false: F }) {
    return function <Choice extends T | F | boolean>(data: Choice | boolean) {
      type RETURN_TYPE = Equal<Choice, T> extends true
        ? true
        : Equal<Choice, F> extends true
          ? false
          : Equal<Choice, true> extends true
            ? T
            : Equal<Choice, false> extends true
              ? F
              : never;

      if (data === map.true) {
        return true as RETURN_TYPE;
      } else if (data === map.false) {
        return false as RETURN_TYPE;
      } else if (data === true) {
        return map.true as RETURN_TYPE;
      } else {
        return map.false as RETURN_TYPE;
      }
    };
  }

  static refine<T extends string, F extends string>(map: { true: T; false: F }) {
    return function <Choice extends T | F | boolean>(data: Choice | boolean) {
      type RETURN_TYPE = Equal<Choice, T> extends true
        ? true
        : Equal<Choice, F> extends true
          ? false
          : Equal<Choice, true> extends true
            ? T
            : Equal<Choice, false> extends true
              ? F
              : never;

      if (data === map.true) {
        return true as RETURN_TYPE;
      } else if (data === map.false) {
        return false as RETURN_TYPE;
      } else if (data === true) {
        return map.true as RETURN_TYPE;
      } else {
        return map.false as RETURN_TYPE;
      }
    };
  }

  toPrimitive(): T {
    return this.boolean;
  }
}

export namespace TypedBoolean {
  /**
   * Inference of value type.
   */
  export type ValueType<Pointer extends TypedBoolean<any> | Boolean> = Pointer extends TypedBoolean<infer T>
    ? `${T}`
    : Pointer extends boolean
      ? Pointer
      : never;

  /**
   * Inference of value types.
   */
  export type ValueTypes<Pointers extends ReadonlyOrNot<(TypedBoolean<any> | boolean)[]>> = Pointers extends [
    infer F extends TypedBoolean<infer T> | boolean,
    ...infer Rest extends ReadonlyOrNot<(TypedBoolean<any> | boolean)[]>,
  ]
    ? [TypedBoolean.ValueType<F>, ...TypedBoolean.ValueTypes<Rest>]
    : [];
}
