import type { SubjectDictionary, LoadingDictionary } from '#core/model';

export type StateObject<T = unknown> = Readonly<T> & {
  $: SubjectDictionary<T>;
  loading: LoadingDictionary<T>;
};
