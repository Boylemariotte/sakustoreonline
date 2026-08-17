import { useStore } from '../../store/StoreContext.jsx';
import { IconHome, IconHeart, IconBag } from '../icons.jsx';

export function BottomNav() {
  const { state, actions, derived } = useStore();
  const isCatalog = state.view === 'home' || state.view === 'product';

  return (
    <div className="m-nav">
      <button type="button" className={`m-nav-item ${isCatalog ? 'is-active' : ''}`} onClick={actions.navHome}>
        <IconHome />
        <span>Tienda</span>
      </button>
      <button type="button" className={`m-nav-item ${state.view === 'saved' ? 'is-active' : ''}`} onClick={actions.navSaved}>
        <span className="m-nav-icon-wrap">
          <IconHeart filled={derived.savedIds.length > 0} style={{ color: derived.savedIds.length ? 'var(--accent)' : 'inherit' }} />
          {derived.savedIds.length > 0 && <span className="m-badge">{derived.savedIds.length}</span>}
        </span>
        <span>Favoritos</span>
      </button>
      <button type="button" className={`m-nav-item ${state.view === 'bag' ? 'is-active' : ''}`} onClick={actions.navBag}>
        <span className="m-nav-icon-wrap">
          <IconBag width={21} height={21} />
          {derived.bagCount > 0 && <span className="m-badge">{derived.bagCount}</span>}
        </span>
        <span>Bolsa</span>
      </button>
    </div>
  );
}
