/**
 * Copy the public site into dist/.
 *
 * Cloudflare Pages for this repo currently uploads the repository root, which
 * also publishes docs/, marketing-audits/, tests/, and dotfiles. dist/ is the
 * publish directory: an allow-list of site files only.
 *
 * Dashboard setting this file expects (Pages project modularcompliance-website):
 *   Build command: node scripts/stage-publish.mjs
 *   Build output directory: dist
 */
import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
export const publishDir = join(repoRoot, 'dist')

/** Paths that belong on modularcompliance.com. Everything else stays in git only. */
export const publishAllowList = [
  'index.html',
  'llms.txt',
  'modules.json',
  'robots.txt',
  'sitemap.xml',
  '_headers',
  '_redirects',
  'css',
  'js',
  'images',
  'pages',
]

export function stagePublish() {
  rmSync(publishDir, { recursive: true, force: true })
  mkdirSync(publishDir, { recursive: true })
  for (const name of publishAllowList) {
    cpSync(join(repoRoot, name), join(publishDir, name), { recursive: true })
  }
  return publishDir
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  stagePublish()
}
