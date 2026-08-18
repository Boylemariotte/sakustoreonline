import { useStore } from '../../store/StoreContext.jsx';
import { GROUPS } from '../../data/products.js';

const NAV_ITEMS = [...GROUPS, 'Exclusivos', 'Nuevo'];

export function TopNav() {
  const { state, actions, derived } = useStore();

  return (
    <div className="d-topnav">
      <div className="d-brand">
        <div className="d-brand-logo" style={{ backgroundImage: `url(${state.theme.logo})` }} />
        <div className="d-brand-name">{state.theme.name}</div>
      </div>
      <div className="d-nav-links">
        {NAV_ITEMS.map((t) => (
          <button
            key={t}
            type="button"
            className={`d-nav-link ${t === state.dTab ? 'is-active' : ''}`}
            onClick={() => actions.selectDTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="d-nav-right">
        <div className="d-search-box">
          <span>⌕</span>
          <span>Buscar camisas, jeans…</span>
        </div>
        <div className="d-fav-pill">♡ Favoritos</div>
        <button type="button" className="d-cart-btn" onClick={actions.openCart}>
          Bolsa · {derived.bagCount}
        </button>
      </div>
    </div>
  );
}
