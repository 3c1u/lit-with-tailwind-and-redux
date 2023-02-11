import { html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { TwLitElement } from '~/helpers/TwLitElement'

import { HauntedComponent } from '~/components/HauntedComponent'
import { NormalLitComponent } from '~/components/NormalLitComponent'

@customElement('my-app')
export class MyApp extends TwLitElement {
  static components = {
    NormalLitComponent,
    HauntedComponent,
  }

  @state()
  private shouldRender: boolean = false

  render() {
    return html`
      <div class="p-4 bg-slate-100 w-full min-h-screen">
        <h2 class="font-700 text-xl text-slate-700">Hello, Lit!</h2>
        <label>
          <input
            type="checkbox"
            @change=${() => {
              this.shouldRender = !this.shouldRender
            }}
            ?checked=${this.shouldRender}
          />
          <span class="ml-2">Render</span>
        </label>
        ${this.shouldRender
          ? html`<div class="mt-8">
                <normal-lit-component></normal-lit-component>
              </div>
              <div class="mt-8">
                <haunted-component></haunted-component>
              </div>`
          : null}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp
  }
}
