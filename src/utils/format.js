// Precios base -> pesos colombianos, redondeados a la baja psicologica (...900)
export function cop(n) {
  const v = Math.round((n * 2500) / 1000) * 1000 - 100;
  return '$ ' + v.toLocaleString('es-CO');
}

const pad = (n) => (n < 10 ? '0' : '') + n;

export function countdownParts(untilMs, nowMs) {
  let ms = Math.max(0, untilMs - nowMs);
  const d = Math.floor(ms / 86400000); ms -= d * 86400000;
  const h = Math.floor(ms / 3600000); ms -= h * 3600000;
  const m = Math.floor(ms / 60000); ms -= m * 60000;
  const s = Math.floor(ms / 1000);
  return { d: String(d), h: pad(h), m: pad(m), s: pad(s), over: untilMs - nowMs <= 0 };
}

const DIACRITICS_RE = /[\u0300-\u036f]/g;

export function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICS_RE, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Envio gratis desde $150.000 COP
export function shippingFor(subtotalBase) {
  if (subtotalBase === 0) return 0;
  return subtotalBase * 2500 >= 150000 ? 0 : 5.16;
}
