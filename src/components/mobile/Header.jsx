import { useStore } from '../../store/StoreContext.jsx';
import { IconBack, IconSearch, IconBag } from '../icons.jsx';

const VIEW_TITLES = { bag: 'Tu bolsa', saved: 'Favoritos', product: 'Detalle' };

export function Header() {
  const { state, actions, derived } = useStore();
  const isHome = state.view === 'home';
  const canGoBack = state.view !== 'home';

  return (
    <div className="m-header">
      <div className="m-header-left">
        {canGoBack && (
          <button type="button" className="m-icon-btn" onClick={actions.goBack} aria-label="Volver">
            <IconBack />
          </button>
        )}
        {isHome ? (
          <div className="m-brand">
            <div className="m-brand-logo" style={{ backgroundImage: `url(${state.theme.logo})` }} />
            <div className="m-brand-name">{state.theme.name}</div>
          </div>
        ) : (
          <div className="m-header-title">{VIEW_TITLES[state.view] || ''}</div>
        )}
      </div>
      <div className="m-header-right">
        <button type="button" className="m-icon-btn" onClick={actions.openSearch} aria-label="Buscar">
          <IconSearch />
        </button>
        <button type="button" className="m-bag-btn" onClick={actions.openBag} aria-label="Ver bolsa">
          <IconBag />
          <span>{derived.bagCount}</span>
        </button>
      </div>
    </div>
  );
}
