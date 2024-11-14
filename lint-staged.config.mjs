import path from 'node:path'
import process from 'node:process'

/** @type {import('lint-staged').ConfigFn} */
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

/** @type {import('lint-staged').Config} */
const config = {
  '*.{js,jsx,ts,tsx,cjs,mjs}': ['prettier --write', buildEslintCommand],
  '*.json': ['prettier --write'],
}

export default config
