import { ToPrimitive } from '../interfaces/to-primitive.interface';
import { ArrayPrototype, StringPrototype } from '../prototypes';
import { ArrayType, FunctionType, NumberType, StringType } from '../types';
import { ReadonlyOrNot } from '../types/primitive.type';
import { TypedArray } from './typed-array.class';
import { TypedBoolean } from './typed-boolean.class';
import { TypedNumber } from './typed-number.class';
import { TypedObject } from './typed-object.class';

/**
 * @todo support iterator.
 */
export class TypedString<T extends string | number | boolean = ''>
  extends TypedObject<T>
  implements
    Pick<
      FunctionType.MethodsFrom<String>,
      | 'split'
      | 'at'
      | 'concat'
      | 'trimStart'
      | 'trimEnd'
      | 'trim'
      | 'padEnd'
      | 'padStart'
      | 'toLowerCase'
      | 'toUpperCase'
      | 'includes'
      | 'substring'
      | 'startsWith'
      | 'endsWith'
    >,
    ToPrimitive<T | `${T}`>
{
  private readonly string: `${T}`;

  constructor(data: T = '' as T) {
    super(data);
    this.string = String(data) as `${T}`;
  }

  /**
   * @inheritdoc
   */
  concat<Strings extends ReadonlyOrNot<(string | TypedString<string>)[]>>(
    ...strings: Strings
  ): TypedString<ReturnType<typeof StringPrototype.concat<`${T}`, TypedString.ValueTypes<Strings>>>> {
    const primitiveStrs = strings.map((el) => (this.isTypedClass(el) ? el.toPrimitive() : el));
    const initialValue = ArrayPrototype.join([this.string, ...primitiveStrs] as const, '') as ArrayType.Join<
      [`${T}`, ...TypedString.ValueTypes<Strings>],
      ''
    >;
    return new TypedString(initialValue);
  }

  /**
   * @inheritdoc
   */
  startsWith<SearchString extends string, Position extends number>(
    searchString: SearchString,
    position?: Position,
  ): TypedBoolean<ReturnType<typeof StringPrototype.startsWith<`${T}`, SearchString, Position>>> {
    const initialValue = StringPrototype.startsWith(this.string, searchString, position);
    return new TypedBoolean(initialValue);
  }

  /**
   * @inheritdoc
   */
  endsWith<SearchString extends string, EndPosition extends number>(
    searchString: SearchString,
    endPosition?: EndPosition,
  ): TypedBoolean<ReturnType<typeof StringPrototype.endsWith<`${T}`, SearchString, EndPosition>>> {
    const initialValue = StringPrototype.endsWith(this.string, searchString, endPosition);
    return new TypedBoolean(initialValue);
  }

  /**
   * @inheritdoc
   */
  substring<Start extends number, End extends number | never = never>(
    start: Start,
    end?: End,
  ): TypedString<ReturnType<typeof StringPrototype.substring<`${T}`, Start, End>>> {
    const initialValue = StringPrototype.substring(this.string, start, end);
    return new TypedString(initialValue);
  }

  /**
   * @inheritdoc
   */
  includes<SearchString extends string, Position extends number>(
    searchString: SearchString,
    position?: Position,
  ): TypedBoolean<ReturnType<typeof StringPrototype.includes<`${T}`, SearchString, Position>>> {
    const initialValue = StringPrototype.includes(this.string, searchString, position);
    return new TypedBoolean(initialValue);
  }

  /**
   * @inheritdoc
   */
  toLowerCase(): TypedString<ReturnType<typeof StringPrototype.toLowerCase<`${T}`>>> {
    const initialValue = StringPrototype.toLowerCase(this.string);
    return new TypedString(initialValue);
  }

  /**
   * @inheritdoc
   */
  toUpperCase(): TypedString<ReturnType<typeof StringPrototype.toUpperCase<`${T}`>>> {
    const initialValue = StringPrototype.toUpperCase(this.string);
    return new TypedString(initialValue);
  }

  /**
   * @inheritdoc
   */
  padStart<TargetLength extends number, PadString extends string>(
    targetLength: TargetLength,
    padString: PadString,
  ): TypedString<ReturnType<typeof StringPrototype.padStart<`${T}`, TargetLength, PadString>>> {
    const initialValue = StringPrototype.padStart(this.string, targetLength, padString ?? ' ');
    return new TypedString(initialValue);
  }

  /**
   * @inheritdoc
   */
  padEnd<TargetLength extends number, PadString extends string>(
    targetLength: TargetLength,
    padString: PadString,
  ): TypedString<ReturnType<typeof StringPrototype.padEnd<`${T}`, TargetLength, PadString>>> {
    const initialValue = StringPrototype.padEnd(this.string, targetLength, padString ?? ' ');
    return new TypedString(initialValue);
  }

  /**
   * @inheritdoc
   */
  trim(): TypedString<ReturnType<typeof StringPrototype.trim<`${T}`>>> {
    const initialValue = StringPrototype.trim(this.string);
    return new TypedString(initialValue);
  }

  /**
   * @inheritdoc
   */
  trimEnd(): TypedString<ReturnType<typeof StringPrototype.trimEnd<`${T}`>>> {
    const initialValue = StringPrototype.trimEnd(this.string);
    return new TypedString(initialValue);
  }

  /**
   * @inheritdoc
   */
  trimStart(): TypedString<ReturnType<typeof StringPrototype.trimStart<`${T}`>>> {
    const initialValue = StringPrototype.trimStart(this.string);
    return new TypedString(initialValue);
  }

  typedLength(): TypedNumber<StringType.Length<`${T}`>> {
    return new TypedNumber(this.length);
  }

  get length(): StringType.Length<`${T}`> {
    const primitiveLength = this.string.length as StringType.Length<`${T}`>;
    return primitiveLength;
  }

  /**
   * If a value greater than the length of the current data is given as an index, it is inferred as underdefined that no wrapper exists.
   * @inheritdoc
   */
  at<
    Index extends number,
    RETURN_TYPE extends NumberType.Compare<Index, '<', StringType.Length<`${T}`>> extends true
      ? TypedString<ReturnType<typeof StringPrototype.at<`${T}`, Index>>>
      : undefined,
  >(index: Index | TypedNumber<Index> = new TypedNumber()): RETURN_TYPE {
    const primitiveIndex = this.isTypedClass(index) ? index.toPrimitive() : index;
    const initialValue = StringPrototype.at(this.string, primitiveIndex);
    if (initialValue) {
      return new TypedString(initialValue) as RETURN_TYPE;
    }
    return undefined as RETURN_TYPE;
  }

  /**
   * type-safe split.
   *
   * @inheritdoc
   */
  split<Splitter extends string = '', Limit extends number = 0>(
    splitter: Splitter | TypedString<Splitter> = new TypedString<Splitter>(),
    limit: Limit | TypedNumber<Limit> = new TypedNumber<Limit>(),
  ): TypedArray<ReturnType<typeof StringPrototype.split<`${T}`, Splitter, Limit>>> {
    const primitiveContainer: Splitter = this.isTypedClass(splitter) ? splitter.toPrimitive() : splitter;
    const primitiveLimit: Limit = this.isTypedClass(limit) ? limit.toPrimitive() : limit;
    const initialValue = StringPrototype.split(this.string, primitiveContainer, primitiveLimit);
    return new TypedArray<typeof initialValue>(initialValue);
  }

  toPrimitive(): T;
  toPrimitive(): `${T}`;
  toPrimitive(): T | `${T}` {
    return this.string;
  }
}

export namespace TypedString {
  /**
   * Inference of value type.
   */
  export type ValueType<Pointer extends TypedString<any> | string> = Pointer extends TypedString<infer T>
    ? `${T}`
    : Pointer extends string
      ? Pointer
      : never;

  /**
   * Inference of value types.
   */
  export type ValueTypes<Pointers extends ReadonlyOrNot<(TypedString<any> | string)[]>> = Pointers extends [
    infer F extends TypedString<infer T> | string,
    ...infer Rest extends ReadonlyOrNot<(TypedString<any> | string)[]>,
  ]
    ? [TypedString.ValueType<F>, ...TypedString.ValueTypes<Rest>]
    : [];
}
