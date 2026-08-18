const EXCLUSIVES_KEY = 'saku.exclusives';

export function rawExclusives() {
  try {
    return localStorage.getItem(EXCLUSIVES_KEY) || '';
  } catch {
    return '';
  }
}

// { [productId]: isoDateString } — a future admin panel writes here to edit
// an individual product's countdown without touching the catalog data.
export function readExclusiveOverrides() {
  try {
    return JSON.parse(rawExclusives() || '{}');
  } catch {
    return {};
  }
}

export function exclusiveUntilMs(product, overrides) {
  const iso = (overrides && overrides[product.id]) || product.exclusiveUntil;
  if (!iso) return null;
  const ms = new Date(iso).getTime();
  return Number.isNaN(ms) ? null : ms;
}
