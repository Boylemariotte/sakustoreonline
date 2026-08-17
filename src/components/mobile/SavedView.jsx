import { useStore, findProduct } from '../../store/StoreContext.jsx';
import { ProductCard } from '../ProductCard.jsx';
import { EmptyState } from '../EmptyState.jsx';
import { IconHeart } from '../icons.jsx';

export function SavedView() {
  const { state, actions, derived } = useStore();
  const savedProducts = derived.savedIds.map(findProduct).filter(Boolean);

  return (
    <div className="m-saved">
      {savedProducts.length === 0 && (
        <EmptyState
          icon={<IconHeart width={27} height={27} />}
          title="Aún no hay favoritos"
          message="Toca el corazón en cualquier prenda para guardarla aquí."
        />
      )}
      <div className="m-grid">
        {savedProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            saved
            onOpen={() => actions.openProduct(p.id)}
            onToggleSave={actions.toggleSave}
          />
        ))}
      </div>
    </div>
  );
}
