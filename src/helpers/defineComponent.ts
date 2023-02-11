import { component } from 'haunted'
import { LitElement } from 'lit'
import { TwMixin } from '~/helpers/TwLitElement'

type Constructor<T = {}> = new (...args: any[]) => T

function _defineComponent(...args: Parameters<typeof component>) {
  return TwMixin(component(...args) as Constructor<LitElement>)
}

export const defineComponent = _defineComponent as unknown as typeof component
