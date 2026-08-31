/**
 * Crawl / entity smoke for the public marketing site.
 * Run: node --test tests/smoke_site.test.mjs
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (f) => readFileSync(join(root, f), 'utf8')

test('index.html exists and names Modular Compliance', () => {
  const html = read('index.html')
  assert.ok(html.length > 500)
  assert.match(html, /Modular Compliance/)
  assert.match(html, /9429041896853/)
})

test('robots.txt allows citation crawlers and blocks training ClaudeBot', () => {
  const r = read('robots.txt')
  assert.match(r, /User-agent: Claude-SearchBot\nAllow: \//)
  assert.match(r, /User-agent: Claude-User\nAllow: \//)
  assert.match(r, /User-agent: OAI-SearchBot\nAllow: \//)
  assert.match(r, /User-agent: ClaudeBot\nDisallow: \//)
  assert.match(r, /User-agent: GPTBot\nDisallow: \//)
  assert.doesNotMatch(r, /User-agent: ClaudeBot\nAllow: \//)
})

test('JSON-LD has Organization and SoftwareApplication, not FAQ schema', () => {
  const html = read('index.html')
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  assert.ok(blocks.some((b) => /"@type": "Organization"/.test(b)))
  assert.ok(blocks.some((b) => /"@type": "SoftwareApplication"/.test(b)))
  assert.equal(blocks.some((b) => /FAQPage/.test(b)), false)
  assert.equal(blocks.some((b) => /aggregateRating/.test(b)), false)
  assert.doesNotMatch(html, /compliant with/i)
})

test('llms.txt uses the Instilligent Limited NZBN', () => {
  const t = read('llms.txt')
  assert.match(t, /9429041896853/)
  assert.doesNotMatch(t, /9429051796284/)
})

test('no free-trial bait on primary surfaces', () => {
  for (const f of ['index.html', 'llms.txt']) {
    const t = read(f)
    assert.equal(/free\s+trial/i.test(t), false, f)
  }
})

test('og image file exists', () => {
  assert.equal(existsSync(join(root, 'images/og-image.png')), true)
})

test('Phase A foundation pages exist and are wired via _redirects', () => {
  const redirects = read('_redirects')
  for (const [route, file] of [
    ['/about', 'pages/about.html'],
    ['/privacy', 'pages/privacy.html'],
    ['/terms', 'pages/terms.html'],
    ['/security', 'pages/security.html'],
    ['/contact', 'pages/contact.html'],
  ]) {
    assert.equal(existsSync(join(root, file)), true, file)
    assert.match(redirects, new RegExp(`^${route.replace('/', '\\/')}\\s+\\/${file.replace('/', '\\/')}\\s+200`, 'm'))
  }
})

test('new pages carry the correct NZBN and no fabricated certifications', () => {
  for (const f of ['pages/about.html', 'pages/contact.html', 'pages/security.html', 'pages/terms.html']) {
    const t = read(f)
    assert.match(t, /9429041896853/, f)
    assert.doesNotMatch(t, /compliant with/i, f)
    assert.equal(/free\s+trial/i.test(t), false, f)
    assert.doesNotMatch(t, /SOC\s*2\s+certif/i, f)
    assert.doesNotMatch(t, /ISO\s*27001\s+certif/i, f)
  }
})

test('security page explicitly disclaims certifications it does not hold', () => {
  const t = read('pages/security.html')
  assert.match(t, /does not hold ISO.{0,20}27001, SOC.{0,10}2/i)
})

test('sitemap includes all Phase A URLs', () => {
  const s = read('sitemap.xml')
  for (const path of ['/', '/about', '/privacy', '/terms', '/security', '/contact']) {
    assert.match(s, new RegExp(`<loc>https://modularcompliance\\.com${path.replace('/', '\\/')}</loc>`))
  }
})
