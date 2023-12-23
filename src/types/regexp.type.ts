import { ErrorType } from './error.type';
import { NumberType } from './number.type';

export namespace RegExpType {
  /**
   * number range
   *
   * @exmple 1-9 ok
   * @exmple 5-1 x  (right is less than left)
   * @exmple 2-2 ok (case which is left and right is equals)
   */
  export type Range<T extends number, P extends number> = NumberType.Compare<T, '<=', P> extends true
    ? `${T}-${P}`
    : never | ErrorType.TO_HAVE_TO_BE_BIGGER_THAN_FROM;
}
