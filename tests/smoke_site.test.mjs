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

test('homepage and llms.txt match live self-serve trial (no invented Enterprise price)', () => {
  for (const f of ['index.html', 'llms.txt']) {
    const t = read(f)
    assert.match(t, /14-day free trial/i, f)
    assert.match(t, /no credit card required/i, f)
    assert.match(t, /Start Free Trial/)
    assert.match(t, /https:\/\/app\.modularcompliance\.com\/register/)
    assert.match(t, /NZ\$199/)
    assert.match(t, /NZ\$499/)
    assert.match(t, /Enterprise is by enquiry/)
    assert.doesNotMatch(t, /\$999/, f)
    assert.doesNotMatch(t, /NZ\$999/, f)
    assert.match(t, /9429041896853/)
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

test('IPP lead magnet is a real page, not a homepage duplicate', () => {
  const file = 'pages/privacy-ipp-checklist.html'
  assert.equal(existsSync(join(root, file)), true, file)
  const magnet = read(file)
  const home = read('index.html')
  const redirects = read('_redirects')

  assert.notEqual(magnet, home)
  assert.match(redirects, /^\/privacy-ipp-checklist\s+\/pages\/privacy-ipp-checklist\.html\s+200/m)
  assert.match(redirects, /^\/privacy-ipp-checklist\.html\s+\/pages\/privacy-ipp-checklist\.html\s+200/m)

  assert.match(magnet, /<title>NZ Privacy Act 2020 — IPP self-check \(educational\)/)
  assert.match(magnet, /<link rel="canonical" href="https:\/\/modularcompliance\.com\/privacy-ipp-checklist">/)
  assert.match(magnet, /<meta property="og:url" content="https:\/\/modularcompliance\.com\/privacy-ipp-checklist">/)
  assert.match(magnet, /<meta property="og:title" content="NZ Privacy Act 2020 — IPP self-check \(educational\)/)
  assert.doesNotMatch(magnet, /<link rel="canonical" href="https:\/\/modularcompliance\.com\/">/)
  assert.doesNotMatch(home, /<title>NZ Privacy Act 2020 — IPP self-check \(educational\)/)
  assert.match(magnet, /<h1[^>]*>NZ Privacy Act 2020 — IPP self-check \(educational\)<\/h1>/)
  assert.doesNotMatch(home, /<h1[^>]*>NZ Privacy Act 2020 — IPP self-check \(educational\)<\/h1>/)
})

test('IPP lead magnet uses claim-safe copy, 13 IPPs, and live CTAs', () => {
  const magnet = read('pages/privacy-ipp-checklist.html')
  assert.match(magnet, /Walk through the 13 Information Privacy Principles/)
  assert.match(magnet, /Progress is saved in this browser only/)
  assert.match(magnet, /not legal advice/)
  assert.match(magnet, /not a certification/)
  assert.match(magnet, /does not mean you are .Privacy Act compliant/)
  assert.match(magnet, /People do the compliance work/)
  assert.match(magnet, /9429041896853/)

  for (const title of [
    'Purpose of collection',
    'Source of personal information',
    'What to tell people when collecting',
    'Manner of collection',
    'Storage and security',
    'Access',
    'Correction',
    'Accuracy',
    'Retention',
    'Use limits',
    'Disclosure limits',
    'Disclosure outside New Zealand',
    'Unique identifiers',
  ]) {
    assert.match(magnet, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), title)
  }
  assert.match(magnet, /IPP 12/)
  assert.match(magnet, /IPP 13/)

  assert.match(magnet, /href="https:\/\/app\.modularcompliance\.com\/#\/privacy-ipp-checklist"/)
  assert.match(magnet, /Open in app/)
  assert.match(magnet, /href="https:\/\/app\.modularcompliance\.com\/register"/)
  assert.match(magnet, /Start [Ff]ree [Tt]rial/)

  assert.doesNotMatch(magnet, /\$999/)
  assert.doesNotMatch(magnet, /NZ\$999/)
  assert.doesNotMatch(magnet, /Privacy Commissioner approved/i)
  assert.doesNotMatch(magnet, /WorkSafe/)
  assert.doesNotMatch(magnet, /guaranteed audit/i)
  assert.doesNotMatch(magnet, /compliant with/i)
})

test('homepage links to the IPP magnet and still forbids invented Enterprise $999', () => {
  const home = read('index.html')
  assert.match(home, /href="\/privacy-ipp-checklist"/)
  assert.doesNotMatch(home, /\$999/)
  assert.doesNotMatch(home, /NZ\$999/)
})

test('sitemap includes the IPP magnet URL', () => {
  const s = read('sitemap.xml')
  assert.match(s, /<loc>https:\/\/modularcompliance\.com\/privacy-ipp-checklist<\/loc>/)
})
