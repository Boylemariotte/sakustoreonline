import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ALL_PRODUCTS, COLORS, findProduct, sizesFor } from '../data/products.js';
import { cop, shippingFor, slugify } from '../utils/format.js';
import { DEFAULT_THEME, rawTheme, readTheme } from './theme.js';

const StoreCtx = createContext(null);

const BAG_KEY = 'saku.bag';
const SAVED_KEY = 'saku.saved';
const WHATSAPP_NUMBER = '573183072698';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function initialState() {
  return {
    // mobile
    view: 'home', // home | product | bag | saved
    tab: 'Mujer',
    productId: null,
    size: null,
    color: 0,
    photo: 0,
    shake: false,
    q: '',
    searchOpen: false,
    toast: null,
    // desktop
    dTab: 'Mujer',
    dQuick: null,
    dSize: null,
    dColor: 0,
    dCart: false,
    dToast: null,
    // shared
    saved: loadJSON(SAVED_KEY, {}),
    bag: loadJSON(BAG_KEY, []),
    theme: readTheme(),
    now: Date.now(),
    cdDefault: Date.now() + 6 * 86400000 + 7 * 3600000,
  };
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(initialState);
  const toastTimer = useRef(null);
  const dToastTimer = useRef(null);
  const lastRawTheme = useRef(null);

  const patch = useCallback((partial) => {
    setState((s) => ({ ...s, ...(typeof partial === 'function' ? partial(s) : partial) }));
  }, []);

  // persist bag / saved
  useEffect(() => {
    try { localStorage.setItem(BAG_KEY, JSON.stringify(state.bag)); } catch { /* storage unavailable */ }
  }, [state.bag]);
  useEffect(() => {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(state.saved)); } catch { /* storage unavailable */ }
  }, [state.saved]);

  // countdown ticker
  useEffect(() => {
    const id = setInterval(() => patch({ now: Date.now() }), 1000);
    return () => clearInterval(id);
  }, [patch]);

  // theme sync (cross-tab, e.g. a future admin panel writing localStorage.saku.theme)
  useEffect(() => {
    lastRawTheme.current = rawTheme();
    const applyTheme = () => patch({ theme: readTheme() });
    const onStorage = (e) => {
      if (e && e.key && e.key !== 'saku.theme') return;
      lastRawTheme.current = rawTheme();
      applyTheme();
    };
    window.addEventListener('storage', onStorage);
    const poll = setInterval(() => {
      const raw = rawTheme();
      if (raw !== lastRawTheme.current) {
        lastRawTheme.current = raw;
        applyTheme();
      }
    }, 600);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(poll);
    };
  }, [patch]);

  useEffect(() => () => {
    clearTimeout(toastTimer.current);
    clearTimeout(dToastTimer.current);
  }, []);

  const showToast = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    patch({ toast: msg });
    toastTimer.current = setTimeout(() => patch({ toast: null }), 2600);
  }, [patch]);

  const showDToast = useCallback((msg) => {
    clearTimeout(dToastTimer.current);
    patch({ dToast: msg });
    dToastTimer.current = setTimeout(() => patch({ dToast: null }), 2600);
  }, [patch]);

  const actions = useMemo(() => ({
    // navigation
    goHome: () => patch({ view: 'home', toast: null }),
    goBack: () => patch({ view: 'home', toast: null }),
    navHome: () => patch({ view: 'home', toast: null }),
    navSaved: () => patch({ view: 'saved', toast: null }),
    navBag: () => patch({ view: 'bag', toast: null }),
    openBag: () => patch({ view: 'bag', toast: null }),

    // search
    openSearch: () => patch({ searchOpen: true, view: 'home', toast: null }),
    closeSearch: () => patch({ searchOpen: false, q: '' }),
    setQuery: (q) => patch({ q }),

    // catalog
    selectTab: (t) => {
      if (t === 'Rebajas') { showToast('Rebajas llega en la siguiente iteración.'); return; }
      patch({ tab: t, toast: null });
    },
    openProduct: (id) => patch({ view: 'product', productId: id, size: null, color: 0, photo: 0, toast: null }),
    setPhoto: (i) => patch({ photo: i }),
    setColor: (i) => patch({ color: i }),
    setSize: (s) => patch({ size: s, shake: false }),

    toggleSave: (id, e) => {
      if (e) e.stopPropagation();
      patch((s) => ({ saved: { ...s.saved, [id]: !s.saved[id] } }));
    },

    addToBag: (product, size, colorIdx) => {
      if (!size) { patch({ shake: true }); return; }
      const key = product.id + '|' + size + '|' + colorIdx;
      patch((s) => {
        const bag = s.bag.slice();
        const i = bag.findIndex((l) => l.key === key);
        if (i >= 0) bag[i] = { ...bag[i], qty: bag[i].qty + 1 };
        else bag.push({ key, id: product.id, name: product.name, price: product.price, size, color: COLORS[colorIdx].name, qty: 1 });
        return { bag };
      });
      showToast(product.name + ' · talla ' + size + ' añadido');
    },

    incLine: (key) => patch((s) => ({ bag: s.bag.map((x) => x.key === key ? { ...x, qty: x.qty + 1 } : x) })),
    decLine: (key) => patch((s) => ({ bag: s.bag.map((x) => x.key === key ? { ...x, qty: Math.max(1, x.qty - 1) } : x) })),
    removeLine: (key) => patch((s) => ({ bag: s.bag.filter((x) => x.key !== key) })),

    sendWhatsApp: (bag) => {
      if (!bag.length) return;
      window.open(waLink(bag), '_blank', 'noopener');
    },

    // desktop
    selectDTab: (t) => {
      if (t === 'Rebajas' || t === 'Nuevo') { showDToast(t + ' llega en la siguiente iteración.'); return; }
      patch({ dTab: t });
    },
    openQuickView: (id) => patch({ dQuick: id, dSize: null, dColor: 0, dToast: null }),
    closeQuickView: () => patch({ dQuick: null }),
    setDColor: (i) => patch({ dColor: i }),
    setDSize: (s) => patch({ dSize: s }),
    addToBagDesktop: (product, size, colorIdx) => {
      if (!size) return;
      const key = product.id + '|' + size + '|' + colorIdx;
      patch((s) => {
        const bag = s.bag.slice();
        const i = bag.findIndex((l) => l.key === key);
        if (i >= 0) bag[i] = { ...bag[i], qty: bag[i].qty + 1 };
        else bag.push({ key, id: product.id, name: product.name, price: product.price, size, color: COLORS[colorIdx].name, qty: 1 });
        return { bag, dQuick: null, dCart: true };
      });
    },
    openCart: () => patch({ dCart: true, dToast: null }),
    closeCart: () => patch({ dCart: false }),
    dismissToast: () => patch({ toast: null }),
    dismissDToast: () => patch({ dToast: null }),
  }), [patch, showToast, showDToast]);

  const derived = useMemo(() => {
    const bagCount = state.bag.reduce((a, l) => a + l.qty, 0);
    const savedIds = Object.keys(state.saved).filter((k) => state.saved[k]);
    const subtotal = state.bag.reduce((a, l) => a + l.qty * l.price, 0);
    const shipping = shippingFor(subtotal);
    return { bagCount, savedIds, subtotal, shipping, total: subtotal + shipping };
  }, [state.bag, state.saved]);

  const value = useMemo(() => ({ state, actions, derived }), [state, actions, derived]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

function waLink(bag) {
  const sub = bag.reduce((a, l) => a + l.qty * l.price, 0);
  const ship = shippingFor(sub);
  const lines = ['*Nuevo pedido — SAKU*', ''];
  bag.forEach((l, i) => {
    lines.push((i + 1) + '. *' + l.name + '*');
    lines.push('   Talla: ' + l.size + '  ·  Color: ' + l.color);
    lines.push('   Cantidad: ' + l.qty + '  ·  Precio unidad: ' + cop(l.price));
    lines.push('   Subtotal: ' + cop(l.qty * l.price));
    lines.push('   Producto: https://saku.co/producto/' + slugify(l.name) + '-' + l.id);
    lines.push('');
  });
  lines.push('Subtotal: ' + cop(sub));
  lines.push('Envío: ' + (ship === 0 ? 'Gratis' : cop(ship)));
  lines.push('*Total a pagar: ' + cop(sub + ship) + '*');
  lines.push('');
  lines.push('Datos de entrega:');
  lines.push('Nombre: ');
  lines.push('Dirección: ');
  lines.push('Ciudad: ');
  lines.push('Método de pago (Nequi / transferencia / contraentrega): ');
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
}

export { ALL_PRODUCTS, findProduct, sizesFor, DEFAULT_THEME };
