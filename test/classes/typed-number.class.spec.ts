import typia from 'typia';
import { StringType, TypedNumber } from '../../src';

describe('TypedInt', () => {
  it('Int TypedInt class constructor can not receive non-int value.', async () => {
    type num = StringType.ToNumber<'3.5'>;
    expect(typia.random<num>()).toBe(3.5);

    type isNotInt = StringType.Includes<`${num}`, '.'>;
    expect(typia.random<isNotInt>()).toBe(true);

    type errorMessage = StringType.IsInt<num>;
    expect(typia.random<errorMessage>()).toBe('IS NOT INT FORMAT');
  });
});

describe('TypedNumber', () => {
  it('Decimal, integer generic type omitted by using functional parameter.', async () => {
    const case1 = TypedNumber.refine('decimal', 1, 2)(3.14);
    expect(case1.toPrimitive()).toBe(3.14);
  });

  it('if you don not set decimal, integer length...', async () => {
    const case1 = TypedNumber.refine('decimal')(3.14);
    expect(case1.toPrimitive()).toBe(3.14);
  });

  it('TypedInt can be called from TypedNumber', async () => {
    const case1 = TypedNumber.refine('int')(3);
    expect(case1.toPrimitive()).toBe(3);
  });
});
