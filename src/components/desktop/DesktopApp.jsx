import { TopNav } from './TopNav.jsx';
import { Hero } from './Hero.jsx';
import { ProductGrid } from './ProductGrid.jsx';
import { Footer } from './Footer.jsx';
import { CartDrawer } from './CartDrawer.jsx';
import { QuickView } from './QuickView.jsx';
import { DesktopToast } from './DesktopToast.jsx';
import './desktop.css';

export function DesktopApp() {
  return (
    <div className="d-shell">
      <TopNav />
      <div className="d-page">
        <Hero />
        <ProductGrid />
        <Footer />
      </div>
      <CartDrawer />
      <QuickView />
      <DesktopToast />
    </div>
  );
}
