import React, { useState, useEffect } from 'react';
import { useWeb3 } from './context/Web3Context';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WalletModal } from './components/modals/WalletModal';
import { TransactionModal } from './components/modals/TransactionModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { NFTDetailPage } from './pages/NFTDetailPage';
import { DropsPage } from './pages/DropsPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { CreatorsPage } from './pages/CreatorsPage';
import { CreatorDetailPage } from './pages/CreatorDetailPage';
import { ProfileVaultPage } from './pages/ProfileVaultPage';
import { CreatorStudioPage } from './pages/CreatorStudioPage';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = (route: string, id?: string) => {
    setCurrentRoute(route);
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back/forward or hash change if needed
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const [route, id] = hash.split('/');
        if (route) {
          setCurrentRoute(route);
          setSelectedId(id);
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'explore':
        return (
          <ExplorePage
            navigate={navigate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case 'nft':
        return <NFTDetailPage artworkId={selectedId || 'artwork-001'} navigate={navigate} />;
      case 'drops':
        return <DropsPage navigate={navigate} />;
      case 'collections':
        return <CollectionsPage navigate={navigate} />;
      case 'collection-detail':
        return (
          <CollectionDetailPage
            collectionId={selectedId || 'col-monolithic-voids'}
            navigate={navigate}
          />
        );
      case 'creators':
        return <CreatorsPage navigate={navigate} />;
      case 'creator-detail':
        return (
          <CreatorDetailPage
            creatorId={selectedId || 'creator-alexander-reed'}
            navigate={navigate}
          />
        );
      case 'vault':
      case 'profile':
        return <ProfileVaultPage navigate={navigate} />;
      case 'studio':
        return <CreatorStudioPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08080A] text-[#F5F5F7] font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))] pointer-events-none z-0" />
      <div className="fixed inset-0 noise-overlay pointer-events-none z-0 opacity-40" />

      {/* Main Layout */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar
          currentRoute={currentRoute}
          navigate={navigate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="flex-1">
          {renderPage()}
        </main>

        <Footer navigate={navigate} />
      </div>

      {/* Global Modals & Notifications */}
      <WalletModal />
      <TransactionModal />
      <ToastContainer />
    </div>
  );
};
