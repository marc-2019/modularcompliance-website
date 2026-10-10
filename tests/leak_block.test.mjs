// Publish-root leak block: `node --test tests/leak_block.test.mjs` (Node >= 22.18 / 23.6, which can import .ts).
// Optional live check (read-only GETs): LIVE=1 BASE_URL=https://<preview>.modularcompliance-website.pages.dev node --test tests/leak_block.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

const BLOCKED = [
  '/.gitignore', '/.nojekyll', '/.github/workflows/x.yml', '/_routes.json', '/functions/_middleware.ts',
  '/docs/AI-DISCOVERABILITY-AUDIT.md', '/docs/superpowers/specs/2026-03-25-modularcompliance-website-design.md',
  '/marketing-audits/mcp-connector-stocktake-2026-08-26.md', '/tests/smoke_site.test.mjs',
  '/tests/leak_block.test.mjs', '/scripts/stage-publish.mjs', '/package.json', '/README.md',
  // encoded / case / traversal variants (the 302 rules in _redirects do not catch these)
  '/%2egitignore', '/%252egitignore', '/%64ocs/AI-DISCOVERABILITY-AUDIT.md', '/docs%2FAI-DISCOVERABILITY-AUDIT.md',
  '/%6Darketing-audits/mcp-delta-spec-2026-08-26.md', '/DOCS/AI-DISCOVERABILITY-AUDIT.md',
  '/%74ests/smoke_site.test.mjs', '/css/..%2fdocs/AI-DISCOVERABILITY-AUDIT.md', '/pages/../.gitignore',
];
const PUBLIC = [
  '/', '/index.html', '/llms.txt', '/robots.txt', '/sitemap.xml', '/modules.json',
  '/pages/about.html', '/pages/privacy-ipp-checklist.html', '/about', '/privacy-ipp-checklist', '/css/style.css',
];

test('middleware blocks repo-only paths and encoded variants, passes public pages', async () => {
  const m = await import('../functions/_middleware.ts');
  for (const p of BLOCKED) assert.equal(m.isBlocked(p), true, `not blocked: ${p}`);
  for (const p of PUBLIC) assert.equal(m.isBlocked(p), false, `wrongly blocked: ${p}`);
});

test('_routes.json sends everything except exact public files through the middleware', () => {
  const r = JSON.parse(read('_routes.json'));
  assert.deepEqual(r.include, ['/*']);
  for (const e of r.exclude) assert.ok(!e.includes('*'), `wildcard exclude can bypass the middleware: ${e}`);
});

test('live: blocked paths 404, public pages 200', { skip: process.env.LIVE !== '1' }, async () => {
  const base = process.env.BASE_URL || 'https://modularcompliance.com';
  for (const p of BLOCKED) {
    const r = await fetch(base + p, { redirect: 'manual' });
    assert.equal(r.status, 404, `${p} -> ${r.status}`);
  }
  for (const p of PUBLIC) {
    const r = await fetch(base + p);
    assert.equal(r.status, 200, `${p} -> ${r.status}`);
  }
});
