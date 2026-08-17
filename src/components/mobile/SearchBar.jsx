import { useStore } from '../../store/StoreContext.jsx';
import { IconSearch } from '../icons.jsx';

export function SearchBar() {
  const { state, actions } = useStore();
  if (!state.searchOpen) return null;

  return (
    <div className="m-search">
      <div className="m-search-field">
        <IconSearch style={{ color: 'rgba(var(--ink-rgb),.5)' }} />
        <input
          autoFocus
          value={state.q}
          onChange={(e) => actions.setQuery(e.target.value)}
          placeholder="Buscar camisa, jogger, vestido…"
        />
      </div>
      <button type="button" className="m-search-cancel" onClick={actions.closeSearch}>Cerrar</button>
    </div>
  );
}
