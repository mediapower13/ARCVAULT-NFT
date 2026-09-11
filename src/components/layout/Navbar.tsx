import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { AmbientSound } from '../audio/AmbientSound';
import {
  Search,
  Wallet,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  PlusCircle,
  FolderLock
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  searchQuery,
  setSearchQuery
}) => {
  const { wallet, openWalletModal, disconnectWallet } = useWeb3();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { label: 'COLLECT', route: 'explore' },
    { label: 'DROPS', route: 'drops', badge: 'LIVE' },
    { label: 'COLLECTIONS', route: 'collections' },
    { label: 'CREATORS', route: 'creators' },
    { label: 'STUDIO', route: 'studio', icon: PlusCircle },
    { label: 'MY VAULT', route: 'vault', icon: FolderLock }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8A6D1B] flex items-center justify-center p-0.5 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <div className="w-full h-full bg-[#08080A] rounded-[7px] flex items-center justify-center font-editorial font-bold text-[#D4AF37] text-lg">
                ▲
              </div>
            </div>
            <div>
              <span className="font-editorial text-xl font-bold tracking-[0.2em] text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors">
                ARCVAULT
              </span>
              <span className="block text-[9px] font-mono tracking-[0.25em] text-[#9E9EA7] uppercase">
                Digital Works Verified On-Chain
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => navigate(link.route)}
                  className={`relative text-xs font-display font-semibold tracking-[0.12em] uppercase transition-all py-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#D4AF37]'
                      : 'text-[#9E9EA7] hover:text-[#F5F5F7]'
                  }`}
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#00F5D4]/20 border border-[#00F5D4]/30 text-[#00F5D4] font-mono font-bold">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Utilities & Wallet Controls */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* Search Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 bg-black/60 border border-white/20 rounded-full px-3 py-1.5 animate-in fade-in duration-150">
                  <Search className="w-4 h-4 text-[#9E9EA7]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search works, artists, medium..."
                    autoFocus
                    className="bg-transparent text-xs text-white placeholder-[#5E5E68] outline-none w-48 font-sans"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="text-[#5E5E68] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    if (currentRoute !== 'explore') navigate('explore');
                  }}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#9E9EA7] hover:text-white hover:border-white/20 transition-all"
                  title="Search curated collection"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Ambient Soundscape */}
            <AmbientSound />

            {/* Network Badge */}
            <button
              onClick={openWalletModal}
              className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-[#9E9EA7] hover:border-[#D4AF37]/40 transition-colors"
            >
              <span className="pulse-dot" />
              <span>{wallet.network}</span>
            </button>

            {/* Connect / Wallet Button */}
            {wallet.connected ? (
              <button
                onClick={openWalletModal}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.07] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/15 transition-all text-xs font-mono"
              >
                <div className="w-2 h-2 rounded-full bg-[#00F5D4] shadow-[0_0_8px_#00F5D4]" />
                <span className="text-[#D4AF37] font-bold">{wallet.balanceETH.toFixed(2)} ETH</span>
                <span className="text-[#9E9EA7] border-l border-white/10 pl-2">{wallet.shortAddress}</span>
              </button>
            ) : (
              <button
                onClick={openWalletModal}
                className="btn-primary"
              >
                <Wallet className="w-4 h-4" />
                <span>CONNECT WALLET</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <AmbientSound />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#F5F5F7]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0E] border-b border-white/10 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          {/* Mobile Search */}
          <div className="flex items-center gap-2 bg-black/60 border border-white/15 rounded-xl p-3">
            <Search className="w-4 h-4 text-[#9E9EA7]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search works, artists, collections..."
              className="bg-transparent text-xs text-white placeholder-[#5E5E68] outline-none w-full"
            />
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => {
                  navigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm font-display font-medium ${
                  currentRoute === link.route
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'text-[#9E9EA7] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F5D4]/20 text-[#00F5D4] font-mono">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Wallet Button */}
          <div className="pt-2 border-t border-white/10">
            {wallet.connected ? (
              <button
                onClick={() => {
                  openWalletModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-[#D4AF37]/40 text-xs font-mono text-white"
              >
                <div className="flex items-center gap-2">
                  <span className="pulse-dot" />
                  <span>{wallet.shortAddress}</span>
                </div>
                <span className="text-[#D4AF37] font-bold">{wallet.balanceETH.toFixed(2)} ETH</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  openWalletModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full btn-primary py-3"
              >
                <Wallet className="w-4 h-4" />
                <span>CONNECT WALLET</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
