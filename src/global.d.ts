interface ReadonlyArray<T> {
  includes(searchElement: unknown): searchElement is T
}

interface Array<T> {
  includes(searchElement: unknown): searchElement is T
}
