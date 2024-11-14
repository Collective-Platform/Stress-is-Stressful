/** @type {import('prettier').Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
  singleQuote: true,
  tailwindFunctions: ['cva', 'cx'],
}

export default config
