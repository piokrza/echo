import { Path } from '#core/enum';
import { setPath } from '#core/util';

describe('setPath', () => {
  it('should return appropriate path', () => {
    const expectedPath = setPath(Path.ECHO, Path.DASHBOARD);
    expect(expectedPath).toBe('echo/dashboard');
  });
});
