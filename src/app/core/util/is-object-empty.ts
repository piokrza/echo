export function isObjectEmpty<T>(object?: T): boolean {
  return !object || !Object.values(object).some(Boolean);
}
