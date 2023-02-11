import { html, TemplateResult } from 'lit'
import { useState, useCallback } from 'haunted'
import { defineComponent } from '~/helpers/defineComponent'

export const HauntedComponent = defineComponent((): TemplateResult => {
  const [counter, setCounter] = useState(0)
  const increment = useCallback(() => {
    setCounter(current => current! + 1)
  }, [])

  return html`<div class="flex flex-col gap-4">
    <div>
      Counter:
      <span class="font-700">${counter}</span>
    </div>
    <app-button .onClick=${increment}>Increment</app-button>
  </div>`
})

customElements.define('haunted-component', HauntedComponent)
