import { ToPrimitive } from '../interfaces/to-primitive.interface';
import { ArrayPrototype, StringPrototype } from '../prototypes';
import { ArrayType, FunctionType, NumberType, StringType } from '../types';
import { ReadonlyOrNot } from '../types/primitive.type';
import { TypedArray } from './typed-array.class';
import { TypedBoolean } from './typed-boolean.class';
import { TypedNumber } from './typed-number.class';
import { TypedObject } from './typed-object.class';

/**
 * @todo allow each method's parameter to use TypedClass format
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
      | 'repeat'
      | 'indexOf'
      | 'slice'
    >,
    ToPrimitive<T | `${T}`>,
    Iterable<ArrayType.ElementOf<StringType.Split<`${T}`>>>
{
  [n: number]: ArrayType.At<StringType.Split<`${T}`>, number>;

  private readonly string: `${T}`;

  constructor(data: T = '' as T) {
    super(data);
    this.string = String(data) as `${T}`;

    /**
     * mapping for index signature
     */
    String(data)
      .split('')
      .forEach((el, i) => {
        this[i] = el;
      });
  }

  [Symbol.iterator](): Iterator<ArrayType.ElementOf<StringType.Split<`${T}`>>, any> {
    let i = 0;
    return {
      next: () => {
        return i === this.string.length
          ? {
              done: true as const,
              value: undefined,
            }
          : {
              value: this.at(i++)?.toPrimitive() as ArrayType.ElementOf<StringType.Split<`${T}`>>,
              done: false as const,
            };
      },
    };
  }

  /**
   * @inheritdoc
   */
  slice<Start extends number, End extends number>(
    start?: Start | TypedNumber<Start>,
    end?: End | TypedNumber<End>,
  ): TypedString<ReturnType<typeof StringPrototype.slice<`${T}`, Start, End>>> {
    const primitiveStart = this.isTypedClass(start) ? start.toPrimitive() : start;
    const primitiveEnd = this.isTypedClass(end) ? end.toPrimitive() : end;
    const initialValue = StringPrototype.slice(this.string, primitiveStart, primitiveEnd);
    return new TypedString(initialValue);
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
  repeat<Counter extends number = 0>(counter: Counter | TypedNumber<Counter> = new TypedNumber<Counter>()) {
    const primitiveCounter = this.isTypedClass(counter) ? counter.toPrimitive() : counter;
    const initialValue = StringPrototype.repeat(this.string, primitiveCounter);
    return new TypedString(initialValue);
  }

  /**
   * @inheritdoc
   */
  indexOf<SearchString extends string = '', Position extends number = 0>(
    searchString: SearchString | TypedString<SearchString> = new TypedString(),
    position: Position | TypedNumber<Position> = new TypedNumber(),
  ): TypedNumber<ReturnType<typeof StringPrototype.indexOf<`${T}`, SearchString, Position>>> {
    const primitiveSearchString = this.isTypedClass(searchString) ? searchString.toPrimitive() : searchString;
    const primitivePosition = this.isTypedClass(position) ? position.toPrimitive() : position;
    const initialValue = StringPrototype.indexOf(this.string, primitiveSearchString, primitivePosition);
    return new TypedNumber(initialValue);
  }

  /**
   * @inheritdoc
   */
  startsWith<SearchString extends string = '', Position extends number = 0>(
    searchString: SearchString | TypedString<SearchString> = new TypedString(),
    position: Position | TypedNumber<Position> = new TypedNumber(),
  ): TypedBoolean<ReturnType<typeof StringPrototype.startsWith<`${T}`, SearchString, Position>>> {
    const primitiveSearchString = this.isTypedClass(searchString) ? searchString.toPrimitive() : searchString;
    const primitivePosition = this.isTypedClass(position) ? position.toPrimitive() : position;
    const initialValue = StringPrototype.startsWith(this.string, primitiveSearchString, primitivePosition);
    return new TypedBoolean(initialValue);
  }

  /**
   * @inheritdoc
   */
  endsWith<SearchString extends string = '', EndPosition extends number = 0>(
    searchString: SearchString | TypedString<SearchString> = new TypedString(),
    position: EndPosition | TypedNumber<EndPosition> = new TypedNumber(),
  ): TypedBoolean<ReturnType<typeof StringPrototype.endsWith<`${T}`, SearchString, EndPosition>>> {
    const primitiveSearchString = this.isTypedClass(searchString) ? searchString.toPrimitive() : searchString;
    const primitivePosition = this.isTypedClass(position) ? position.toPrimitive() : position;
    const initialValue = StringPrototype.endsWith(this.string, primitiveSearchString, primitivePosition);
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
  includes<SearchString extends string = '', Position extends number = 0>(
    searchString: SearchString | TypedString<SearchString> = new TypedString(),
    position: Position | TypedNumber<Position> = new TypedNumber(),
  ): TypedBoolean<ReturnType<typeof StringPrototype.includes<`${T}`, SearchString, Position>>> {
    const primitiveSearchString = this.isTypedClass(searchString) ? searchString.toPrimitive() : searchString;
    const primitivePosition = this.isTypedClass(position) ? position.toPrimitive() : position;
    const initialValue = StringPrototype.includes(this.string, primitiveSearchString, primitivePosition);
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
  padStart<TargetLength extends number = StringType.Length<`${T}`>, PadString extends string = ' '>(
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
