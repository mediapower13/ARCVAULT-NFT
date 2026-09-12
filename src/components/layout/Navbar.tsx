import React, { useState, useRef, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { AmbientSound } from '../audio/AmbientSound';
import { BlockchainNetwork } from '../../types';
import {
  Search,
  Wallet,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  PlusCircle,
  FolderLock,
  Copy,
  Check,
  ExternalLink,
  LogOut,
  RefreshCw,
  Layers,
  Zap,
  ArrowRight,
  Sliders
} from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string, id?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  searchQuery,
  setSearchQuery
}) => {
  const { wallet, openWalletModal, disconnectWallet, switchNetwork } = useWeb3();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const networkDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const networks: BlockchainNetwork[] = ['Ethereum', 'Sepolia', 'Base', 'Arbitrum', 'Polygon'];

  const navLinks = [
    { label: 'COLLECT', route: 'explore' },
    { label: 'DROPS', route: 'drops', badge: 'LIVE' },
    { label: 'COLLECTIONS', route: 'collections' },
    { label: 'CREATORS', route: 'creators' },
    { label: 'STUDIO', route: 'studio', icon: PlusCircle },
    { label: 'MY VAULT', route: 'vault', icon: FolderLock }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAccountDropdownOpen(false);
      }
      if (
        networkDropdownRef.current &&
        !networkDropdownRef.current.contains(event.target as Node)
      ) {
        setIsNetworkDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(wallet.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300 border-b border-white/10">
      {/* Top subtle gold ambient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. BRAND LOGO */}
          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E6C86E] via-[#D4AF37] to-[#8A6D1B] flex items-center justify-center p-0.5 shadow-[0_0_20px_rgba(212,175,55,0.35)] group-hover:shadow-[0_0_28px_rgba(212,175,55,0.6)] transition-all">
              <div className="w-full h-full bg-[#08080A] rounded-[10px] flex items-center justify-center font-editorial font-bold text-[#D4AF37] text-xl group-hover:scale-105 transition-transform">
                ▲
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-xl font-bold tracking-[0.2em] text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors">
                  ARCVAULT
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                  ON-CHAIN
                </span>
              </div>
              <span className="block text-[9px] font-mono tracking-[0.22em] text-[#9E9EA7] uppercase">
                Curated Digital Artefacts
              </span>
            </div>
          </div>

          {/* 2. DESKTOP NAVIGATION (Hidden on mobile/tablet) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => navigate(link.route)}
                  className={`relative text-xs font-display font-semibold tracking-[0.14em] uppercase transition-all py-2 px-1 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#D4AF37]'
                      : 'text-[#9E9EA7] hover:text-[#F5F5F7]'
                  }`}
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5 opacity-80" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#00F5D4]/20 border border-[#00F5D4]/40 text-[#00F5D4] font-mono font-bold animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#FFF0B8] to-[#D4AF37] shadow-[0_0_10px_#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. RIGHT UTILITIES & WALLET CONTROLS */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Search Button / Bar (Desktop) */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 bg-[#0C0C12] border border-[#D4AF37]/40 rounded-full px-3.5 py-1.5 shadow-[0_0_15px_rgba(212,175,55,0.15)] animate-in fade-in duration-150">
                  <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search masterworks, artists..."
                    autoFocus
                    className="bg-transparent text-xs text-white placeholder-[#5E5E68] outline-none w-36 sm:w-48 font-sans"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="text-[#5E5E68] hover:text-white transition-colors"
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
                  className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-[#9E9EA7] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-white/[0.08] transition-all"
                  title="Search Curated Collection"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Ambient Soundscape */}
            <AmbientSound />

            {/* Network Selector Pill (Desktop Large) */}
            <div className="relative hidden xl:block" ref={networkDropdownRef}>
              <button
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 border border-white/10 text-xs font-mono text-[#9E9EA7] hover:border-[#D4AF37]/50 hover:text-white transition-all group"
                title="Switch Blockchain Network"
              >
                <span className="pulse-dot" />
                <span>{wallet.network}</span>
                <ChevronDown className="w-3 h-3 text-[#5E5E68] group-hover:text-[#D4AF37] transition-transform" />
              </button>

              {/* Network Dropdown */}
              {isNetworkDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#0E0E14]/95 backdrop-blur-xl border border-white/15 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase text-[#5E5E68] tracking-wider">
                    Select Network
                  </div>
                  {networks.map((net) => (
                    <button
                      key={net}
                      onClick={() => {
                        switchNetwork(net);
                        setIsNetworkDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-mono transition-all ${
                        wallet.network === net
                          ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-bold'
                          : 'text-[#9E9EA7] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${wallet.network === net ? 'bg-[#D4AF37]' : 'bg-[#5E5E68]'}`} />
                        <span>{net}</span>
                      </div>
                      {wallet.network === net && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CONNECT WALLET / VAULT ACCOUNT CAPSULE */}
            {wallet.connected ? (
              /* Connected State */
              <div className="relative" ref={accountDropdownRef}>
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full bg-[#0E0E14] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all text-xs font-mono group"
                >
                  <div className="w-2 h-2 rounded-full bg-[#00F5D4] shadow-[0_0_8px_#00F5D4] animate-pulse" />
                  <span className="text-[#D4AF37] font-bold hidden xs:inline font-mono">
                    {wallet.balanceETH.toFixed(2)} ETH
                  </span>
                  <span className="text-[#9E9EA7] group-hover:text-white border-l border-white/10 pl-2 font-mono">
                    {wallet.shortAddress}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#9E9EA7] group-hover:text-[#D4AF37] transition-transform" />
                </button>

                {/* Account Quick Dropdown */}
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0E0E14]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3.5">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8A6D1B] flex items-center justify-center text-black font-bold text-xs">
                          0x
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Collector Vault</span>
                          <span className="text-[10px] font-mono text-[#00F5D4] flex items-center gap-1">
                            <span className="pulse-dot" /> {wallet.network}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#9E9EA7]">
                        {wallet.walletType}
                      </span>
                    </div>

                    {/* Address & Copy */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-black/60 border border-white/5">
                      <span className="font-mono text-xs text-[#9E9EA7] truncate max-w-[170px]">
                        {wallet.address}
                      </span>
                      <button
                        onClick={handleCopyAddress}
                        className="p-1 rounded-lg text-[#9E9EA7] hover:text-[#D4AF37] transition-colors"
                        title="Copy Address"
                      >
                        {copiedAddress ? <Check className="w-3.5 h-3.5 text-[#00F5D4]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Balance */}
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="text-[#9E9EA7]">Vault Balance</span>
                      <div className="text-right">
                        <span className="font-display font-bold text-[#D4AF37]">
                          {wallet.balanceETH.toFixed(4)} ETH
                        </span>
                        <span className="text-[10px] text-[#5E5E68] block">
                          ≈ ${wallet.balanceUSD.toLocaleString()} USD
                        </span>
                      </div>
                    </div>

                    {/* Quick Menu Actions */}
                    <div className="space-y-1 pt-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          navigate('vault');
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#F5F5F7] hover:bg-[#D4AF37]/15 hover:text-[#D4AF37] transition-colors text-left"
                      >
                        <span className="flex items-center gap-2">
                          <FolderLock className="w-3.5 h-3.5" />
                          View Portfolio Vault
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          openWalletModal();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#F5F5F7] hover:bg-white/5 transition-colors text-left"
                      >
                        <span className="flex items-center gap-2">
                          <Sliders className="w-3.5 h-3.5 text-[#9E9EA7]" />
                          Wallet & Faucet Settings
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setIsAccountDropdownOpen(false);
                          disconnectWallet();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#FF5555] hover:bg-[#FF5555]/10 transition-colors text-left font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <LogOut className="w-3.5 h-3.5" />
                          Disconnect Session
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Disconnected State: Luxury Connect Wallet Button */
              <button
                onClick={openWalletModal}
                className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#E6C86E] via-[#D4AF37] to-[#B89222] text-[#08080A] font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex-shrink-0"
              >
                <Wallet className="w-3.5 h-3.5 text-[#08080A] group-hover:rotate-12 transition-transform" />
                <span className="whitespace-nowrap">CONNECT WALLET</span>
              </button>
            )}

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#F5F5F7] hover:text-[#D4AF37] hover:border-white/20 transition-all flex-shrink-0"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 4. MOBILE / TABLET DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0E]/98 backdrop-blur-2xl border-b border-white/15 px-4 pt-4 pb-8 space-y-5 animate-in slide-in-from-top duration-200 shadow-2xl">
          
          {/* Mobile Search Bar */}
          <div className="flex items-center gap-2.5 bg-black/60 border border-white/15 rounded-xl p-3">
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search masterworks, artists, collections..."
              className="bg-transparent text-xs text-white placeholder-[#5E5E68] outline-none w-full font-sans"
            />
          </div>

          {/* Connected User Badge or Fast Connect in Drawer */}
          {wallet.connected ? (
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#D4AF37]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="pulse-dot" />
                  <span className="font-mono text-xs text-white font-bold">{wallet.shortAddress}</span>
                </div>
                <span className="badge-live">{wallet.network}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                <span className="text-[#9E9EA7]">Vault Liquidity:</span>
                <span className="font-display font-bold text-[#D4AF37]">{wallet.balanceETH.toFixed(3)} ETH</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                openWalletModal();
                setMobileMenuOpen(false);
              }}
              className="w-full btn-primary py-3.5 justify-center"
            >
              <Wallet className="w-4 h-4" />
              <span>CONNECT WEB3 WALLET</span>
            </button>
          )}

          {/* Navigation Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => {
                  navigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left text-sm font-display font-semibold transition-all ${
                  currentRoute === link.route
                    ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'text-[#9E9EA7] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {link.icon && <link.icon className="w-4 h-4 opacity-80" />}
                  {link.label}
                </span>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4]/30 font-mono font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Network Switcher inside Drawer */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#5E5E68] tracking-wider block px-1">
              Active Network
            </span>
            <div className="grid grid-cols-3 gap-2">
              {networks.map((net) => (
                <button
                  key={net}
                  onClick={() => switchNetwork(net)}
                  className={`py-2 px-2 rounded-lg text-xs font-mono transition-all text-center ${
                    wallet.network === net
                      ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-bold'
                      : 'bg-white/5 border border-white/5 text-[#9E9EA7]'
                  }`}
                >
                  {net}
                </button>
              ))}
            </div>
          </div>

          {/* Disconnect or Extra actions */}
          {wallet.connected && (
            <div className="pt-2">
              <button
                onClick={() => {
                  disconnectWallet();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-display text-[#FF5555] bg-[#FF5555]/10 border border-[#FF5555]/30 hover:bg-[#FF5555]/20 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>DISCONNECT WALLET SESSION</span>
              </button>
            </div>
          )}

        </div>
      )}
    </header>
  );
};
