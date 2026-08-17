import { useStore } from '../../store/StoreContext.jsx';
import { byGroup } from '../../data/products.js';
import { ProductCard } from '../ProductCard.jsx';

const TITLES = { Hombre: 'Novedades para él', 'Niños': 'Para los peques', Mujer: 'Novedades para ella' };

export function ProductGrid() {
  const { state, actions } = useStore();
  const list = byGroup(state.dTab).length ? byGroup(state.dTab) : byGroup('Mujer');
  const title = TITLES[state.dTab] || TITLES.Mujer;

  return (
    <>
      <div className="d-section-head">
        <div className="d-section-title">{title}</div>
        <div className="d-section-count">{list.length} prendas · ordenar por novedad</div>
      </div>
      <div className="d-grid" key={state.dTab}>
        {list.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            saved={!!state.saved[p.id]}
            onOpen={() => actions.openQuickView(p.id)}
            onToggleSave={actions.toggleSave}
            variant="wide"
          />
        ))}
      </div>
    </>
  );
}
