import { LitElement } from 'lit'
import type { Store, Action } from 'redux'
import { ReduxReactiveController } from '~/helpers/redux/ReduxReactiveController'

const controllerSym = Symbol('~/src/helpers/redux__ReduxReactiveController')

const selectorBase = <_RootState, _Value>(
  store: Store<_RootState, Action>,
  selector: (state: _RootState) => _Value,
) => {
  return (target: LitElement, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get() {
        if (!(controllerSym in this)) {
          const controller = new ReduxReactiveController(this, store)
          controller.addSelector(propertyKey, selector)

          Object.defineProperty(this, controllerSym, {
            value: controller,
            enumerable: false,
            configurable: false,
            writable: false,
          })
        } else {
          const controller = this[controllerSym] as ReduxReactiveController<
            _RootState,
            Action
          >

          controller.addSelector(propertyKey, selector)
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
