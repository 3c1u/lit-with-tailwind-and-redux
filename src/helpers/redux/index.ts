import { LitElement } from 'lit'
import type { Store, Action } from 'redux'

const selectorBase = <_RootState, _Value>(
  store: Store<_RootState, Action>,
  selector: (state: _RootState) => _Value,
) => {
  let currentValue: _Value = selector(store.getState())

  return (target: LitElement, propertyKey: string) => {
    let isSubscribed = false

    Object.defineProperty(target, propertyKey, {
      get() {
        if (!isSubscribed) {
          store.subscribe(() => {
            const newValue = selector(store.getState())
            if (newValue === currentValue) {
              return
            }

            currentValue = newValue
            this.requestUpdate()
          })
        }

        return selector(store.getState())
      },
      set() {
        throw new Error(`property '${propertyKey}' is read-only`)
      },
    })
  }
}

export const createAppSelector =
  <_RootState, _Action extends Action>(store: Store<_RootState, _Action>) =>
  <_Value>(selector: (state: _RootState) => _Value) =>
    selectorBase(store, selector)
