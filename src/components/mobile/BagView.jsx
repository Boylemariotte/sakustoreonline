import { useStore } from '../../store/StoreContext.jsx';
import { cop } from '../../utils/format.js';
import { EmptyState } from '../EmptyState.jsx';
import { IconBag, IconWhatsApp } from '../icons.jsx';

export function BagView() {
  const { state, actions, derived } = useStore();
  const hasItems = state.bag.length > 0;

  return (
    <div className="m-bag">
      {!hasItems && (
        <EmptyState
          icon={<IconBag width={27} height={27} />}
          title="Tu bolsa está vacía"
          message="Vuelve a la tienda y añade algo que te guste."
          action={
            <button type="button" className="empty-state-action" onClick={actions.goHome}>
              Seguir comprando
            </button>
          }
        />
      )}

      {state.bag.map((l) => (
        <div key={l.key} className="m-bag-line">
          <div className="m-bag-thumb placeholder-art" />
          <div className="m-bag-details">
            <div className="m-bag-row">
              <div className="m-bag-name">{l.name}</div>
              <button type="button" className="m-bag-remove" onClick={() => actions.removeLine(l.key)} aria-label="Quitar">×</button>
            </div>
            <div className="m-bag-meta">Talla {l.size} · {l.color}</div>
            <div className="m-bag-row m-bag-row--bottom">
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

      {hasItems && (
        <>
          <div className="m-summary">
            <div className="m-summary-row"><span>Subtotal</span><span>{cop(derived.subtotal)}</span></div>
            <div className="m-summary-row"><span>Envío</span><span>{derived.shipping === 0 ? 'Gratis' : cop(derived.shipping)}</span></div>
            <div className="m-summary-divider" />
            <div className="m-summary-row m-summary-row--total"><span>Total</span><span>{cop(derived.total)}</span></div>
          </div>
          <button type="button" className="m-whatsapp-btn" onClick={() => actions.sendWhatsApp(state.bag)}>
            <IconWhatsApp />
            Enviar pedido por WhatsApp
          </button>
          <div className="m-whatsapp-note">
            Se abre WhatsApp con tu pedido escrito: prendas, tallas, cantidades y enlaces. Confirmamos el pago por ahí mismo.
          </div>
        </>
      )}
    </div>
  );
}
