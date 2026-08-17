import { StoreProvider } from './store/StoreContext.jsx';
import { useMediaQuery } from './hooks/useMediaQuery.js';
import { MobileApp } from './components/mobile/MobileApp.jsx';
import { DesktopApp } from './components/desktop/DesktopApp.jsx';

function App() {
  const isDesktop = useMediaQuery('(min-width: 900px)');

  return (
    <StoreProvider>
      {isDesktop ? <DesktopApp /> : <MobileApp />}
    </StoreProvider>
  );
}

export default App;
