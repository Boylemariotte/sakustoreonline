import { useStore } from '../../store/StoreContext.jsx';
import { cop } from '../../utils/format.js';
import { EmptyState } from '../EmptyState.jsx';
import { IconWhatsApp } from '../icons.jsx';

export function CartDrawer() {
  const { state, actions, derived } = useStore();
  if (!state.dCart) return null;
  const hasItems = state.bag.length > 0;

  return (
    <div className="d-overlay" role="dialog" aria-modal="true">
      <div className="d-overlay-backdrop" onClick={actions.closeCart} />
      <div className="d-drawer">
        <div className="d-drawer-head">
          <div className="d-drawer-title">Tu bolsa · {derived.bagCount}</div>
          <button type="button" className="d-round-btn" onClick={actions.closeCart} aria-label="Cerrar">×</button>
        </div>
        <div className="d-drawer-body">
          {!hasItems && (
            <EmptyState
              icon="◠"
              title="Tu bolsa está vacía"
              message="Abre una prenda del catálogo y elige tu talla."
            />
          )}
          {state.bag.map((l) => (
            <div key={l.key} className="d-drawer-line">
              <div className="d-drawer-thumb placeholder-art" />
              <div className="d-drawer-details">
                <div className="d-drawer-row">
                  <div className="d-drawer-name">{l.name}</div>
                  <button type="button" className="m-bag-remove" onClick={() => actions.removeLine(l.key)} aria-label="Quitar">×</button>
                </div>
                <div className="d-drawer-meta">Talla {l.size} · {l.color}</div>
                <div className="d-drawer-row d-drawer-row--bottom">
                  <div className="m-qty">
                    <button type="button" onClick={() => actions.decLine(l.key)} aria-label="Restar">−</button>
                    <span>{l.qty}</span>
                    <button type="button" onClick={() => actions.incLine(l.key)} aria-label="Sumar">+</button>
                  </div>
                  <div className="m-bag-total">{cop(l.qty * l.price)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasItems && (
          <div className="d-drawer-footer">
            <div className="m-summary-row"><span>Subtotal</span><span>{cop(derived.subtotal)}</span></div>
            <div className="m-summary-row"><span>Envío</span><span>{derived.shipping === 0 ? 'Gratis' : cop(derived.shipping)}</span></div>
            <div className="m-summary-row m-summary-row--total" style={{ fontSize: 17 }}><span>Total</span><span>{cop(derived.total)}</span></div>
            <button type="button" className="m-whatsapp-btn" style={{ marginTop: 6 }} onClick={() => actions.sendWhatsApp(state.bag)}>
              <IconWhatsApp />
              Enviar pedido por WhatsApp
            </button>
            <div className="m-whatsapp-note">
              Abre WhatsApp con el pedido detallado (prendas, tallas, cantidades y enlaces) al +57 318 3072698.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
