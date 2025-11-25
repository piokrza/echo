import type { Path } from '#core/enum';

export const setPath = (...paths: Path[]) => paths.join('/');
