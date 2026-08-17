import { useStore } from '../../store/StoreContext.jsx';

export function Hero() {
  const { actions } = useStore();

  return (
    <div className="d-hero">
      <div className="d-hero-copy">
        <div className="d-hero-eyebrow">nueva temporada</div>
        <div className="d-hero-title">Lino y algodón<br />para toda la casa</div>
        <div className="d-hero-desc">
          Prendas casuales para mujer, hombre y niños. Envío gratis en compras desde $ 150.000 y cambios durante 30 días.
        </div>
        <div className="d-hero-actions">
          <button type="button" className="d-hero-btn d-hero-btn--dark" onClick={() => actions.selectDTab('Mujer')}>
            Ver la colección
          </button>
          <button type="button" className="d-hero-btn" onClick={() => actions.selectDTab('Niños')}>
            Niños
          </button>
        </div>
      </div>
      <div className="d-hero-art placeholder-art">
        <div className="d-hero-sheen" />
        <div className="placeholder-label" style={{ top: 16, left: 18 }}>[ foto de campaña · 1600×1200 ]</div>
      </div>
    </div>
  );
}
