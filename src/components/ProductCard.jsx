import { cop } from '../utils/format.js';
import { IconHeart } from './icons.jsx';

export function ProductCard({ product, saved, onOpen, onToggleSave, variant = 'grid' }) {
  return (
    <div className={`product-card product-card--${variant}`} onClick={onOpen}>
      <div className="product-card-thumb placeholder-art">
        <div className="placeholder-label" style={{ top: 10, left: 10 }}>[ prenda ]</div>
        <button
          type="button"
          className="heart-btn"
          aria-label={saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          onClick={(e) => onToggleSave(product.id, e)}
        >
          <IconHeart filled={saved} style={{ color: saved ? 'var(--accent)' : 'inherit' }} />
        </button>
        {product.tag && <div className="product-tag">{product.tag}</div>}
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
