import { useStore, findProduct, ALL_PRODUCTS } from '../../store/StoreContext.jsx';
import { cop } from '../../utils/format.js';
import { IconHeart } from '../icons.jsx';

export function ProductCTA() {
  const { state, actions } = useStore();
  const cur = findProduct(state.productId) || ALL_PRODUCTS[0];
  const saved = !!state.saved[cur.id];
  const label = state.size ? `Añadir a la bolsa · ${cop(cur.price)}` : 'Elige una talla';

  return (
    <div className="m-cta-bar">
      <button
        type="button"
        className="m-cta-heart"
        onClick={() => actions.toggleSave(cur.id)}
        style={{ color: saved ? 'var(--accent)' : 'rgba(var(--ink-rgb),.55)' }}
        aria-label={saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      >
        <IconHeart filled={saved} width={21} height={21} />
      </button>
      <button
        type="button"
        className={`m-cta-add ${state.size ? 'is-ready' : ''}`}
        onClick={() => actions.addToBag(cur, state.size, state.color)}
      >
        {label}
      </button>
    </div>
  );
}
