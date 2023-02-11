import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TwLitElement } from '~/helpers/TwLitElement'

import { AppButton } from '~/components/AppButton'
import { dispatch, selector } from '~/store'
import { increment } from '~/store/counter'

@customElement('normal-lit-component')
export class NormalLitComponent extends TwLitElement {
  static components = {
    AppButton,
  }

  @selector(state => state.counter.value)
  private readonly counter!: number

  private _onClick = () => {
    dispatch(increment())
  }

  render() {
    return html`
      <div class="flex flex-col gap-4">
        <div>Redux counter: <span class="font-700">${this.counter}</span></div>
        <app-button variant="primary" .onClick=${this._onClick}
          >Increment</app-button
        >
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'normal-lit-component': NormalLitComponent
  }
}
