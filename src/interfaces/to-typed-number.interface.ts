import { TypedNumber } from '../classes';

export interface ToTypedNumber<T extends number> {
  toTypedNumber: () => TypedNumber<T>;
}
