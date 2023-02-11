import tailwindcss from 'tailwindcss/tailwind.css?inline'

const styles = new CSSStyleSheet()
styles.replaceSync(tailwindcss)

export default styles
