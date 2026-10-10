import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateCaseStudies } from '../src/i18n/validate-cases.mjs';

const example = () => ({
  id: 'sample', name: 'Sample', sector: 'Sector', status: 'Website',
  headline: 'Headline', summary: 'Summary', context: 'Context',
  solution: ['A step'], outcome: 'Outcome', journey: ['Discover'], note: 'Note',
});
const studies = () => Object.fromEntries(['en', 'es', 'pt'].map((locale) => [locale, { items: [example()] }]));

test('accepts matching cases with or without a verified project URL', () => {
  const data = studies();
  data.en.items[0].url = 'https://example.com/';
  assert.doesNotThrow(() => validateCaseStudies(data));
});

test('rejects missing story content before publication', () => {
  const data = studies();
  data.es.items[0].solution = [''];
  assert.throws(() => validateCaseStudies(data), /solution must contain non-empty steps/);
});

test('rejects duplicate or reserved panel IDs', () => {
  const data = studies();
  data.pt.items.push(example());
  assert.throws(() => validateCaseStudies(data), /duplicate id sample/);
  data.pt.items[1].id = 'next';
  assert.throws(() => validateCaseStudies(data), /URL-safe slug/);
});

test('requires the same case order in all languages', () => {
  const data = studies();
  data.es.items[0].id = 'otro-caso';
  assert.throws(() => validateCaseStudies(data), /id\/order differs from English/);
});

test('rejects unsafe or incomplete project links', () => {
  const data = studies();
  data.en.items[0].url = 'javascript:alert(1)';
  assert.throws(() => validateCaseStudies(data), /absolute HTTP\(S\) address/);
});
