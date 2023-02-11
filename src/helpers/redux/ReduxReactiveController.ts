import { ReactiveController, ReactiveControllerHost } from 'lit'
import { Store, Action } from 'redux'

export class ReduxReactiveController<_RootState, _Action extends Action, _Value>
  implements ReactiveController
{
  host: ReactiveControllerHost

  private _store: Store<_RootState, _Action>
  private _selector!: (state: _RootState) => _Value
  private _unsubscribe?: () => void
  private _currentValue?: _Value

  constructor(
    host: ReactiveControllerHost,
    store: Store<_RootState, _Action>,
    selector: (state: _RootState) => _Value,
  ) {
    this.host = host
    this._store = store
    this._selector = selector
    this._currentValue = selector(store.getState())

    host.addController(this)
  }

  hostConnected() {
    this._store.subscribe(() => {
      const newValue = this._selector(this._store.getState())
      if (newValue === this._currentValue) {
        return
      }

      this._currentValue = newValue
      this.host.requestUpdate()
    })
  }

  hostDisconnected() {
    this._unsubscribe?.()
  }
}
