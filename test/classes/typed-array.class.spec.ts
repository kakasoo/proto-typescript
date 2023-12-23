import { TypedArray } from '../../src';

/**
 * error case
 */
new TypedArray<'1-3'>([1, 2, 3]).refine([1, 2, 3] as const).join('-');
new TypedArray<'1-3'>([]).refine([1, 2, 3] as const).join('-');
new TypedArray<'1-3'>().refine([1, 2, 3, 4] as const).join('-');
new TypedArray<'1-3'>().refine([0, 1, 2, 3] as const).join('-');

/**
 * right case
 */
new TypedArray(1, 2, 3);
new TypedArray(1, 2, 3 as const);
new TypedArray([1, 2, 3, 4] as const);
new TypedArray<'1-3'>().refine([2, 3] as const).join('-');
new TypedArray(1, 2, 3);
new TypedArray(1, 2, 3 as const);
new TypedArray([1, 2, 3, 4] as const);
