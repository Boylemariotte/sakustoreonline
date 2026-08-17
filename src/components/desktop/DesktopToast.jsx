import { useStore } from '../../store/StoreContext.jsx';

export function DesktopToast() {
  const { state, actions } = useStore();
  if (!state.dToast) return null;

  return (
    <div className="d-toast" onClick={actions.dismissDToast}>
      {state.dToast}
    </div>
  );
}
