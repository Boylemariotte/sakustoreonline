import { useStore } from '../../store/StoreContext.jsx';

export function Toast() {
  const { state, actions } = useStore();
  if (!state.toast) return null;

  return (
    <div className="m-toast">
      <div className="m-toast-text">{state.toast}</div>
      <button type="button" className="m-toast-action" onClick={actions.openBag}>Ver bolsa</button>
    </div>
  );
}
