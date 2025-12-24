import { deepEqual } from '#core/util/deep-equal';

const compareTestCases = [
  { a: {}, b: {}, output: true },
  { a: {}, b: { a: 44 }, output: false },
  { a: null, b: null, output: true },
  { a: { b: { c: { testKey: 'teaa' } } }, b: { b: { c: { testKey: 'teaa' } } }, output: true },
  { a: { test: 42 }, b: { test: '42' }, output: false },
];

describe('deepEqual', () => {
  compareTestCases.forEach(({ a, b, output }) => {
    it(`should compare ${JSON.stringify(a)} with ${JSON.stringify(b)} and return ${output}`, () => {
      expect(deepEqual(a, b)).toBe(output);
    });
  });
});
