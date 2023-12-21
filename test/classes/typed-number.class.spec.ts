import typia from 'typia';
import { NumberType, StringType } from '../../src';

describe('TypedInt', () => {
  it('Int TypedInt class constructor can not receive non-int value.', async () => {
    type num = NumberType.ToNumberFromString<'3.5'>;
    expect(typia.random<num>()).toBe(3.5);

    type isNotInt = StringType.Includes<`${num}`, '.'>;
    expect(typia.random<isNotInt>()).toBe(true);

    type errorMessage = StringType.IsInt<num>;
    expect(typia.random<errorMessage>()).toBe('IS NOT INT FORMAT');
  });
});
