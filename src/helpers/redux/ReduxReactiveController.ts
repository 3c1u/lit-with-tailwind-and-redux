import { ReactiveController, ReactiveControllerHost } from 'lit'
import { Store, Action } from 'redux'

export class ReduxReactiveController<_RootState, _Action extends Action>
  implements ReactiveController
{
  host: ReactiveControllerHost

  private _store: Store<_RootState, _Action>
  private _unsubscribe?: () => void

  private _selectors: Array<(state: _RootState) => unknown> = []
  private _availableProperties = new Set<string>()
  private _currentValues: Array<unknown> = []

  constructor(host: ReactiveControllerHost, store: Store<_RootState, _Action>) {
    this.host = host
    this._store = store

    host.addController(this)
  }

  addSelector<_Value>(prop: string, selector: (state: _RootState) => _Value) {
    if (this._availableProperties.has(prop)) {
      return
    }

    this._availableProperties.add(prop)
    this._selectors.push(selector)
    this._currentValues.push(selector(this._store.getState()))
  }

  hostConnected() {
    this._unsubscribe = this._store.subscribe(() => {
      console.log('subscribe')

      const newValues = this._selectors.map(selector =>
        selector(this._store.getState()),
      )

      const changed = newValues.some(
        (newValue, index) => newValue !== this._currentValues[index],
      )

      if (!changed) {
        return
      }

      this._currentValues = newValues
      this.host.requestUpdate()
    })
  }

  hostDisconnected() {
    this._unsubscribe?.()
  }
}
