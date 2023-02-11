import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TwLitElement } from '~/helpers/TwLitElement'

import { AppButton } from '~/components/AppButton'
import { HauntedComponent } from '~/components/HauntedComponent'
import { dispatch, selector } from '~/store'
import { increment } from '~/store/counter'

@customElement('my-app')
export class MyApp extends TwLitElement {
  static components = {
    AppButton,
    HauntedComponent,
  }

  @selector(state => state.counter.value)
  private readonly counter!: number

  private _onClick = () => {
    dispatch(increment())
  }

  render() {
    return html`
      <div class="p-4 bg-slate-100 w-full min-h-screen">
        <h2 class="font-700 text-xl text-slate-700">Hello, Lit!</h2>
        <div class="mt-8 flex flex-col gap-4">
          <div>
            Redux counter: <span class="font-700">${this.counter}</span>
          </div>
          <app-button variant="primary" .onClick=${this._onClick}
            >Increment</app-button
          >
        </div>
        <div class="mt-8">
          <haunted-component></haunted-component>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp
  }
}
