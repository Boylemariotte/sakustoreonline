import { cop, compactCountdown } from '../utils/format.js';
import { useStore, exclusiveUntilMs, isExclusive } from '../store/StoreContext.jsx';
import { IconHeart } from './icons.jsx';

export function ProductCard({ product, saved, onOpen, onToggleSave, variant = 'grid' }) {
  const { state } = useStore();
  const exclusive = isExclusive(product);
  const untilMs = exclusive ? exclusiveUntilMs(product, state.exclusiveOverrides) : null;
  const countdown = untilMs ? compactCountdown(untilMs, state.now) : null;
  const cover = product.images && product.images[0];

  return (
    <div className={`product-card product-card--${variant}`} onClick={onOpen}>
      <div className={`product-card-thumb ${cover ? '' : 'placeholder-art'}`}>
        {cover ? (
          <img className="thumb-img" src={cover} alt={product.name} loading="lazy" />
        ) : (
          <div className="placeholder-label" style={{ top: 10, left: 10 }}>[ prenda ]</div>
        )}
        <button
          type="button"
          className="heart-btn"
          aria-label={saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          onClick={(e) => onToggleSave(product.id, e)}
        >
          <IconHeart filled={saved} style={{ color: saved ? 'var(--accent)' : 'inherit' }} />
        </button>
        {exclusive ? (
          <div className="product-tag product-tag--exclusive">
            <div className="product-tag-line1"><span className="product-tag-star">✦</span> Exclusivo</div>
            <div className="product-tag-time">{countdown || 'Agotado'}</div>
          </div>
        ) : (
          product.tag && <div className="product-tag">{product.tag}</div>
        )}
      </div>
      <div className="product-card-info">
        {variant === 'wide' && <div className="product-card-cat">{product.cat}</div>}
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-price">
          <span style={{ color: product.was ? 'var(--accent)' : 'rgba(var(--ink-rgb),.62)' }}>{cop(product.price)}</span>
          {product.was && <span className="product-card-was">{cop(product.was)}</span>}
        </div>
      </div>
    </div>
  );
}
