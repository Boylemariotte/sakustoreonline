import { useStore, findProduct, sizesFor, ALL_PRODUCTS, exclusiveUntilMs, isExclusive } from '../../store/StoreContext.jsx';
import { COLORS } from '../../data/products.js';
import { cop } from '../../utils/format.js';
import { IconHeart } from '../icons.jsx';
import { ExclusiveBanner } from '../ExclusiveBanner.jsx';

export function ProductDetailView() {
  const { state, actions } = useStore();
  const cur = findProduct(state.productId) || ALL_PRODUCTS[0];
  const sizes = sizesFor(cur);
  const saved = !!state.saved[cur.id];
  const related = ALL_PRODUCTS.filter((p) => p.id !== cur.id && p.group === cur.group).slice(0, 4);
  const exclusiveUntil = isExclusive(cur) ? exclusiveUntilMs(cur, state.exclusiveOverrides) : null;

  return (
    <div className="m-product">
      <div className="m-gallery placeholder-art">
        <div className="m-gallery-sheen" />
        <div className="placeholder-label" style={{ top: 14, left: 14 }}>[ foto de producto {state.photo + 1}/4 ]</div>
        <button
          type="button"
          className="heart-btn heart-btn--big"
          onClick={() => actions.toggleSave(cur.id)}
          aria-label={saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <IconHeart filled={saved} width={20} height={20} style={{ color: saved ? 'var(--accent)' : 'inherit' }} />
        </button>
        <div className="m-dots">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              className={`m-dot ${i === state.photo ? 'is-active' : ''}`}
              onClick={() => actions.setPhoto(i)}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="m-product-body">
        {exclusiveUntil && <ExclusiveBanner untilMs={exclusiveUntil} now={state.now} />}
        <div className="m-product-head">
          <div className="m-eyebrow">{cur.cat}</div>
          <div className="m-product-name">{cur.name}</div>
          <div className="m-product-price">
            <span>{cop(cur.price)}</span>
            {cur.was && <span className="m-product-was">{cop(cur.was)}</span>}
          </div>
          <div className="m-product-desc">{cur.desc}</div>
        </div>

        <div className="m-option-group">
          <div className="m-option-head">
            <div className="m-option-label">Color</div>
            <div className="m-option-value">{COLORS[state.color].name}</div>
          </div>
          <div className="m-swatches">
            {COLORS.map((c, i) => (
              <button
                key={c.name}
                type="button"
                className={`m-swatch ${i === state.color ? 'is-active' : ''}`}
                style={{ background: c.hex }}
                onClick={() => actions.setColor(i)}
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
                className={`m-size ${z === state.size ? 'is-active' : ''}`}
                onClick={() => actions.setSize(z)}
              >
                {z}
              </button>
            ))}
          </div>
          <div className={`m-size-hint ${state.shake ? 'is-warn shake' : ''}`}>
            {state.shake ? 'Elige una talla para continuar.' : 'Talla normal. Si dudas entre dos, coge la más grande.'}
          </div>
        </div>

        <div className="m-info-box">
          <div className="m-info-row">
            <div className="m-info-icon">↺</div>
            <div className="m-info-text">Envío gratis desde $ 150.000 y 30 días para cambios.</div>
          </div>
          <div className="m-info-row">
            <div className="m-info-icon">◈</div>
            <div className="m-info-text">{cur.fabric}</div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="m-related">
            <div className="m-related-title">Combina con</div>
            <div className="m-related-scroll">
              {related.map((r) => (
                <div key={r.id} className="m-related-item" onClick={() => actions.openProduct(r.id)}>
                  <div className="m-related-thumb placeholder-art" />
                  <div className="m-related-name">{r.name}</div>
                  <div className="m-related-price">{cop(r.price)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
