import styles from '~/helpers/tailwind'
import { adoptStyles, LitElement } from 'lit'

type Constructor<T = {}> = new (...args: any[]) => T

export const TwMixin = <T extends Constructor<LitElement>>(superclass: T) => {
  class MixinClass extends superclass {
    connectedCallback(): void {
      super.connectedCallback()
      if (this.shadowRoot === null) {
        throw new Error('shadowRoot is null')
      }

      adoptStyles(this.shadowRoot, [styles])
    }
  }

  return MixinClass as T
}

export abstract class TwLitElement extends TwMixin(LitElement) {}
