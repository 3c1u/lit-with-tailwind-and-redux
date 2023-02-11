// Safari用のpolyfill
import 'construct-style-sheets-polyfill'

import styles from '~/helpers/tailwind'
import '~/components/MyApp.ts'

if (typeof window !== 'undefined') {
  document.adoptedStyleSheets = [styles]
}
