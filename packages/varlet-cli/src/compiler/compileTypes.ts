import { ensureDir, readdir, writeFile } from 'fs-extra'
import { TYPES_DIR } from '../shared/constant'
import { camelize } from '../shared/fsUtils'
import { resolve } from 'path'

export async function compileTypes() {
  await ensureDir(TYPES_DIR)

  const dir = await readdir(TYPES_DIR)

  const ignoreEntryDir = dir.filter((filename) => filename !== 'index.d.ts')

  const exports: string[] = []

  ignoreEntryDir.forEach((filename) => {
    const componentName = camelize(filename.slice(0, filename.indexOf('.d.ts')))

    exports.push(`export * from './${componentName}'`)
  })

  const template = `\
import type { App } from 'vue'

export const install: (app: App) => void

${exports.join('\n')}
`

  await writeFile(resolve(TYPES_DIR, 'index.d.ts'), template)
}
