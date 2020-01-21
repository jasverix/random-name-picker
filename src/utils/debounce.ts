type AnyFunction = (...args: any[]) => any

export function debounce<T extends AnyFunction> (fn: T, debounceTime: number): T {
  let debounceTimeout: number | null = null
  const resultFunction: AnyFunction = function (...args) {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }
    debounceTimeout = setTimeout(() => {
      debounceTimeout = null
      // @ts-ignore
      fn.apply(this, args)
    }, debounceTime)
  }

  return resultFunction as T
}
