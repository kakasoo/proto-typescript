import { ArrayType, ReadonlyOrNot, StringType } from '../types';

export type IndexSignature<T extends ReadonlyOrNot<any[]>> = {
  [key in keyof T]: key extends number
    ? ArrayType.At<T, key>
    : key extends `${number}`
      ? ArrayType.At<T, StringType.ToNumber<key>>
      : never;
};
