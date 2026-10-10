import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

function attributes(html, name) {
  return [...html.matchAll(new RegExp(`${name}="([^"]+)"`, 'g'))].map((match) => match[1]);
}

for (const locale of ['en', 'es', 'pt']) {
  test(`${locale} cards, panels and navigation stay aligned`, () => {
    const path = locale === 'en' ? 'dist/cases/index.html' : `dist/${locale}/cases/index.html`;
    const html = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
    const cases = attributes(html, 'data-open-panel');
    const panels = attributes(html, 'id').filter((id) => id.startsWith('panel-')).map((id) => id.slice(6));
    const tabs = attributes(html, 'data-tab');

    assert.ok(cases.length > 0, 'expected case cards');
    assert.deepEqual(panels, ['cases', ...cases, 'next']);
    assert.deepEqual(tabs, panels);
    for (const id of cases) assert.ok(html.includes(`href="#panel-${id}"`), `missing card link for ${id}`);
  });
}
