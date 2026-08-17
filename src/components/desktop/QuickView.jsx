import { useStore, findProduct, sizesFor } from '../../store/StoreContext.jsx';
import { COLORS } from '../../data/products.js';
import { cop } from '../../utils/format.js';

export function QuickView() {
  const { state, actions } = useStore();
  if (!state.dQuick) return null;
  const dq = findProduct(state.dQuick);
  if (!dq) return null;
  const sizes = sizesFor(dq);
  const saved = !!state.saved[dq.id];
  const ctaLabel = state.dSize ? `Añadir a la bolsa · ${cop(dq.price)}` : 'Elige una talla';

  return (
    <div className="d-overlay d-overlay--center" role="dialog" aria-modal="true">
      <div className="d-overlay-backdrop" onClick={actions.closeQuickView} />
      <div className="d-modal">
        <div className="d-modal-art placeholder-art">
          <div className="placeholder-label" style={{ top: 16, left: 18 }}>[ foto de producto ]</div>
        </div>
        <div className="d-modal-body">
          <div className="d-modal-head">
            <div className="m-product-head" style={{ gap: 7 }}>
              <div className="m-eyebrow">{dq.cat}</div>
              <div className="d-modal-name">{dq.name}</div>
              <div className="m-product-price" style={{ fontSize: 20 }}>
                <span>{cop(dq.price)}</span>
                {dq.was && <span className="m-product-was">{cop(dq.was)}</span>}
              </div>
            </div>
            <button type="button" className="d-round-btn" onClick={actions.closeQuickView} aria-label="Cerrar">×</button>
          </div>
          <div className="m-product-desc">{dq.desc}</div>

          <div className="m-option-group">
            <div className="m-option-head">
              <div className="m-option-label">Color</div>
              <div className="m-option-value">{COLORS[state.dColor].name}</div>
            </div>
            <div className="m-swatches">
              {COLORS.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  className={`m-swatch ${i === state.dColor ? 'is-active' : ''}`}
                  style={{ width: 32, height: 32, background: c.hex }}
                  onClick={() => actions.setDColor(i)}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <div className="m-option-group">
            <div className="m-option-head">
              <div className="m-option-label">Talla</div>
              <div className="m-option-link">Guía de tallas</div>
            </div>
            <div className="m-sizes">
              {sizes.map((z) => (
                <button
                  key={z}
                  type="button"
                  className={`m-size ${z === state.dSize ? 'is-active' : ''}`}
                  style={{ minWidth: 54, padding: '12px 8px' }}
                  onClick={() => actions.setDSize(z)}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          <div className="m-info-text">{dq.fabric} Envío gratis desde $ 150.000.</div>

          <div className="d-modal-actions">
            <button
              type="button"
              className="m-cta-heart"
              style={{ color: saved ? 'var(--accent)' : 'var(--accent)' }}
              onClick={() => actions.toggleSave(dq.id)}
              aria-label={saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            >
              {saved ? '♥' : '♡'}
            </button>
            <button
              type="button"
              className={`m-cta-add ${state.dSize ? 'is-ready' : ''}`}
              onClick={() => actions.addToBagDesktop(dq, state.dSize, state.dColor)}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
