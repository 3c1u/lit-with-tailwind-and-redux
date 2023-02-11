import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classes } from '@3c1u/classes'
import { TwLitElement } from '~/helpers/TwLitElement'

const appButtonVariants = ['primary', 'secondary', 'tertiary'] as const
export type AppButtonVariant = (typeof appButtonVariants)[number]

type AppButtonStylesByState = {
  [key in 'base' | 'default' | 'disabled']: string
}

const buttonStylesByVariant: Record<AppButtonVariant, AppButtonStylesByState> =
  {
    primary: {
      base: classes`focus:outline-none font-700 h-10 px-4 rounded select-none`,
      disabled: classes`bg-slate-300 text-slate-50`,
      default: classes`bg-blue-500 hover:bg-blue-400 text-white focus:ring focus:ring-blue-500 focus:ring-opacity-60`,
    },
    secondary: {
      base: classes`border border-current focus:outline-none font-700 h-10 px-4 rounded select-none`,
      disabled: classes`text-slate-300`,
      default: classes` text-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-60`,
    },
    tertiary: {
      base: classes``,
      disabled: classes`text-slate-300 underline`,
      default: classes`text-blue-500 hover:text-blue-400 underline hover:no-underline`,
    },
  }

@customElement('app-button')
export class AppButton extends TwLitElement {
  @property({ type: Function })
  onClick?: (event: MouseEvent | KeyboardEvent) => void = undefined

  @property({ type: Boolean })
  disabled = false

  @property({ type: Boolean })
  fill = false

  @property()
  variant: string = 'primary'

  private _handleClick = (event: MouseEvent | KeyboardEvent) => {
    if (this.disabled) {
      return
    }

    this.onClick?.(event)
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    this._handleClick(event)
  }

  render() {
    const variant = appButtonVariants.includes(this.variant)
      ? this.variant
      : 'primary'

    const state = this.disabled ? 'disabled' : 'default'

    return html`
      <div
        role="button"
        tabindex=${this.disabled ? '-1' : '0'}
        ?aria-disabled=${this.disabled}
        class=${classes`flex items-center ${
          buttonStylesByVariant[variant].base
        } ${buttonStylesByVariant[variant][state]} ${!this.fill && 'w-fit'}`}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-button': AppButton
  }
}
