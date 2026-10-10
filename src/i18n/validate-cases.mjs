const locales = ['en', 'es', 'pt'];
const textFields = ['name', 'sector', 'status', 'headline', 'summary', 'context', 'outcome', 'note'];

// Astro executes this when building every language. Invalid content fails the build
// before a card, panel or navigation tab can be published out of sync.
export function validateCaseStudies(studies) {
  const referenceIds = studies.en?.items?.map((item) => item.id);

  for (const locale of locales) {
    const items = studies[locale]?.items;
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(`Cases (${locale}): expected a non-empty items list`);
    }

    const seen = new Set();
    items.forEach((item, index) => {
      const at = `Cases (${locale}, item ${index + 1})`;
      if (!item || typeof item !== 'object') throw new Error(`${at}: expected an object`);
      if (typeof item.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || ['cases', 'next'].includes(item.id)) {
        throw new Error(`${at}: id must be a unique URL-safe slug, excluding cases and next`);
      }
      if (seen.has(item.id)) throw new Error(`${at}: duplicate id ${item.id}`);
      seen.add(item.id);
      if (item.id !== referenceIds?.[index]) throw new Error(`${at}: id/order differs from English`);

      for (const field of textFields) {
        if (typeof item[field] !== 'string' || !item[field].trim()) {
          throw new Error(`${at} (${item.id}): ${field} must contain text`);
        }
      }
      for (const field of ['solution', 'journey']) {
        if (!Array.isArray(item[field]) || item[field].length === 0 || item[field].some((value) => typeof value !== 'string' || !value.trim())) {
          throw new Error(`${at} (${item.id}): ${field} must contain non-empty steps`);
        }
      }
      if (item.url !== undefined) {
        let url;
        try { url = new URL(item.url); } catch { /* invalid URL */ }
        if (!url || !['http:', 'https:'].includes(url.protocol)) {
          throw new Error(`${at} (${item.id}): url must be an absolute HTTP(S) address`);
        }
      }
    });

    if (items.length !== referenceIds.length) {
      throw new Error(`Cases (${locale}): expected the same cases as English`);
    }
  }
}
