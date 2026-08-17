import { useStore } from '../../store/StoreContext.jsx';
import { CountdownBar } from '../CountdownBar.jsx';
import { Header } from './Header.jsx';
import { SearchBar } from './SearchBar.jsx';
import { HomeView } from './HomeView.jsx';
import { ProductDetailView } from './ProductDetailView.jsx';
import { ProductCTA } from './ProductCTA.jsx';
import { BagView } from './BagView.jsx';
import { SavedView } from './SavedView.jsx';
import { BottomNav } from './BottomNav.jsx';
import { Toast } from './Toast.jsx';
import './mobile.css';

export function MobileApp() {
  const { state } = useStore();

  return (
    <div className="m-shell">
      <Header />
      <CountdownBar theme={state.theme} now={state.now} cdDefault={state.cdDefault} variant="mobile" />
      <SearchBar />

      <div className="m-content">
        {state.view === 'home' && <HomeView />}
        {state.view === 'product' && <ProductDetailView />}
        {state.view === 'bag' && <BagView />}
        {state.view === 'saved' && <SavedView />}
      </div>

      {state.view === 'product' && <ProductCTA />}
      {state.view !== 'product' && <BottomNav />}
      <Toast />
    </div>
  );
}
