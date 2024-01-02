import { ArrayType, StringType } from '../types';
import { ReadonlyOrNot } from '../types/primitive.type';

export const StringPrototype = {
  slice<Container extends string, Start extends number, End extends number>(
    container: Container,
    start?: Start,
    end?: End,
  ): StringType.Slice<Container, Start, End> {
    return container.slice(start, end) as StringType.Slice<Container, Start, End>;
  },

  /**
   * Returns the position of the first occurrence of a substring.
   * @param searchString The substring to search for in the string
   * @param position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.
   */
  indexOf<Container extends string, SearchString extends string = '', Position extends number = 0>(
    container: Container,
    searchString: SearchString = '' as SearchString,
    position: Position = 0 as Position,
  ): StringType.IndexOf<Container, SearchString, Position> {
    return container.indexOf(searchString, position) as StringType.IndexOf<Container, SearchString, Position>;
  },

  /**
   * Returns a String value that is made from count copies appended together. If count is 0,
   * the empty string is returned.
   * @param count number of copies to append
   */
  repeat<Container extends string, Counter extends number>(
    container: Container,
    counter: Counter,
  ): StringType.Repeat<Container, Counter> {
    return container.repeat(counter) as StringType.Repeat<Container, Counter>;
  },

  /**
   * Returns true if the sequence of elements of searchString converted to a String is the
   * same as the corresponding elements of this object (converted to a String) starting at
   * position. Otherwise returns false.
   */
  startsWith<Container extends string, SearchString extends string, Position extends number>(
    container: Container,
    searchString: SearchString,
    position?: Position,
  ): StringType.StartsWith<Container, SearchString, Position> {
    return container.startsWith(searchString, position) as StringType.StartsWith<Container, SearchString, Position>;
  },

  /**
   * Returns true if the sequence of elements of searchString converted to a String is the
   * same as the corresponding elements of this object (converted to a String) starting at
   * endPosition – length(this). Otherwise returns false.
   */
  endsWith<Container extends string, SearchString extends string, EndPosition extends number>(
    container: Container,
    searchString: SearchString,
    endPosition?: EndPosition,
  ): StringType.EndsWith<Container, SearchString, EndPosition> {
    return container.endsWith(searchString, endPosition) as StringType.EndsWith<Container, SearchString, EndPosition>;
  },

  /**
   * Returns the substring at the specified location within a String object.
   * @param start The zero-based index number indicating the beginning of the substring.
   * @param end Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end.
   * If end is omitted, the characters from start through the end of the original string are returned.
   */
  substring<Conatiner extends string, Start extends number, End extends number | never = never>(
    container: Conatiner,
    start: Start,
    end?: End,
  ): StringType.Substring<Conatiner, Start, End> {
    return container.substring(start, end) as StringType.Substring<Conatiner, Start, End>;
  },

  /**
   * Converts all the alphabetic characters in a string to lowercase.
   */
  toLowerCase<Conatiner extends string>(container: Conatiner): Lowercase<Conatiner> {
    return container.toLowerCase() as Lowercase<Conatiner>;
  },

  /**
   * Converts all the alphabetic characters in a string to uppercase.
   */
  toUpperCase<Conatiner extends string>(container: Conatiner): Uppercase<Conatiner> {
    return container.toUpperCase() as Uppercase<Conatiner>;
  },

  /**
   * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
   * The padding is applied from the start (left) of the current string.
   *
   * @param targetLength The length of the resulting string once the current string has been padded.
   *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
   *
   * @param padString The string to pad the current string with.
   *        If this string is too long, it will be truncated and the left-most part will be applied.
   *        The default value for this parameter is " " (U+0020).
   */
  padStart<Conatiner extends string, TargetLength extends number, PadString extends string>(
    container: Conatiner,
    targetLength: TargetLength,
    padString: PadString,
  ): StringType.PadStart<Conatiner, TargetLength, PadString> {
    return container.padStart(targetLength, padString ?? ' ') as StringType.PadStart<
      Conatiner,
      TargetLength,
      PadString
    >;
  },

  /**
   * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
   * The padding is applied from the end (right) of the current string.
   *
   * @param targetLength The length of the resulting string once the current string has been padded.
   *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
   *
   * @param padString The string to pad the current string with.
   *        If this string is too long, it will be truncated and the left-most part will be applied.
   *        The default value for this parameter is " " (U+0020).
   */
  padEnd<Conatiner extends string, TargetLength extends number, PadString extends string>(
    container: Conatiner,
    targetLength: TargetLength,
    padString: PadString,
  ): StringType.PadEnd<Conatiner, TargetLength, PadString> {
    return container.padEnd(targetLength, padString ?? ' ') as StringType.PadEnd<Conatiner, TargetLength, PadString>;
  },

  /**
   * Returns true if searchString appears as a substring of the result of converting this
   * object to a String, at one or more positions that are
   * greater than or equal to position; otherwise, returns false.
   * @param searchString search string
   * @param position If position is undefined, 0 is assumed, so as to search all of the String.
   *
   * @todo support position parameter
   */
  includes<Container extends string, SearchString extends string, Position extends number>(
    container: Container,
    searchString: SearchString,
    position?: Position,
  ): StringType.Includes<Container, SearchString, Position> {
    return container.includes(searchString, position) as StringType.Includes<Container, SearchString, Position>;
  },

  /**
   * Removes the leading white space and line terminator characters from a string.
   * @param container
   * @returns
   */
  trimStart<Conatiner extends string>(container: Conatiner): StringType.TrimStart<Conatiner> {
    return container.trimStart() as StringType.TrimStart<Conatiner>;
  },

  /**
   * Removes the trailing white space and line terminator characters from a string.
   * @param container
   * @returns
   */
  trimEnd<Conatiner extends string>(container: Conatiner): StringType.TrimEnd<Conatiner> {
    return container.trimEnd() as StringType.TrimEnd<Conatiner>;
  },

  /**
   * Removes the leading and trailing white space and line terminator characters from a string.
   * @param container
   * @returns
   */
  trim<Conatiner extends string>(container: Conatiner): StringType.Trim<Conatiner> {
    return container.trim() as StringType.Trim<Conatiner>;
  },

  /**
   * Returns a string that contains the concatenation of two or more strings.
   * @param strings The strings to append to the end of the string.
   */
  concat<Container extends string, Strings extends ReadonlyOrNot<string[]>>(
    container: Container,
    ...strings: Strings
  ): ArrayType.Join<[Container, ...Strings], ''> {
    return [container, ...strings].join('') as ArrayType.Join<[Container, ...Strings], ''>;
  },

  /**
   * Returns a new String consisting of the single UTF-16 code unit located at the specified index.
   * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
   */
  at<Container extends string, Index extends number>(
    container: Container,
    index: Index,
  ): StringType.At<Container, Index> {
    return container.at(index) as StringType.At<Container, Index>;
  },

  /**
   * type-safe split.
   * @example StringPrototype.split('abcde', 'c', 1) // ['ab']
   *
   * @param container original string value.
   * @param splitter An object that can split a string.
   * @param limit A value used to limit the number of elements returned in the array.
   *
   * @todo support `RegExp` as splitter
   */
  split<Container extends string, Splitter extends string = '', Limit extends number = 0>(
    container: Container,
    splitter: Splitter,
    limit?: Limit,
  ): StringType.Split<Container, Splitter, Limit> {
    return container.split(splitter, limit) as StringType.Split<Container, Splitter, Limit>;
  },
};
