import { useMemo } from 'react';
import { useStore, ALL_PRODUCTS } from '../../store/StoreContext.jsx';
import { byGroup } from '../../data/products.js';
import { ProductCard } from '../ProductCard.jsx';

const TABS = ['Mujer', 'Hombre', 'Niños', 'Exclusivos'];

export function HomeView() {
  const { state, actions } = useStore();
  const q = (state.q || '').trim().toLowerCase();

  const list = useMemo(() => {
    if (q) {
      return ALL_PRODUCTS.filter((p) => (p.name + ' ' + p.cat).toLowerCase().includes(q));
    }
    const base = byGroup(state.tab);
    return base.length ? base : byGroup('Mujer');
  }, [q, state.tab]);

  const showHero = !q;
  const listTitle = q
    ? 'Resultados'
    : state.tab === 'Niños' ? 'Para los peques'
    : state.tab === 'Hombre' ? 'Novedades para él'
    : state.tab === 'Exclusivos' ? 'Piezas exclusivas'
    : 'Novedades para ella';
  const countLabel = list.length + (list.length === 1 ? ' prenda' : ' prendas');
  const noResults = q && list.length === 0;

  return (
    <div className="m-home">
      {showHero && (
        <>
          <div className="m-tabs">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                className={`m-tab ${t === state.tab ? 'is-active' : ''}`}
                onClick={() => actions.selectTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="m-hero placeholder-art" onClick={() => list[0] && actions.openProduct(list[0].id)}>
            <div className="m-hero-overlay">
              <div className="m-hero-eyebrow">nueva temporada</div>
              <div className="m-hero-title">Lino y algodón<br />para toda la casa</div>
              <div className="m-hero-cta">Ver la colección</div>
            </div>
            <div className="placeholder-label" style={{ top: 14, left: 14 }}>[ foto de campaña ]</div>
          </div>
        </>
      )}

      <div className="m-section-head">
        <div className="m-section-title">{listTitle}</div>
        <div className="m-section-count">{countLabel}</div>
      </div>

      {noResults && (
        <div className="m-no-results">No encontramos esa prenda. Prueba con "camisa", "jogger" o "vestido".</div>
      )}

      <div className="m-grid" key={state.tab + (q ? ':q' : '')}>
        {list.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            saved={!!state.saved[p.id]}
            onOpen={() => actions.openProduct(p.id)}
            onToggleSave={actions.toggleSave}
          />
        ))}
      </div>
    </div>
  );
}
