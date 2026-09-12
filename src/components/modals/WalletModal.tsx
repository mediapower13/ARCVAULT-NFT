import React, { useState } from 'react';
import { useWeb3, WalletType } from '../../context/Web3Context';
import { BlockchainNetwork } from '../../types';
import {
  X,
  Check,
  Shield,
  Wallet,
  Zap,
  Layers,
  RefreshCw,
  QrCode,
  ExternalLink,
  Smartphone,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Copy,
  Info
} from 'lucide-react';

export const WalletModal: React.FC = () => {
  const {
    isWalletModalOpen,
    closeWalletModal,
    wallet,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    adjustBalance,
    isExtensionDetected
  } = useWeb3();

  const [customBalance, setCustomBalance] = useState(wallet.balanceETH.toString());
  const [activeView, setActiveView] = useState<'wallets' | 'qr' | 'networks'>('wallets');
  const [selectedWalletForQR, setSelectedWalletForQR] = useState<string>('WalletConnect');
  const [copied, setCopied] = useState(false);

  if (!isWalletModalOpen) return null;

  const networks: BlockchainNetwork[] = ['Ethereum', 'Sepolia', 'Base', 'Arbitrum', 'Polygon'];

  const walletOptions: {
    type: WalletType;
    name: string;
    tag: string;
    icon: string;
    installUrl?: string;
  }[] = [
    {
      type: 'MetaMask',
      name: 'MetaMask',
      tag: 'Browser Extension & Mobile App',
      icon: '🦊',
      installUrl: 'https://metamask.io/download/'
    },
    {
      type: 'Coinbase',
      name: 'Coinbase Wallet',
      tag: 'Extension & Smart App',
      icon: '🔵',
      installUrl: 'https://www.coinbase.com/wallet'
    },
    {
      type: 'Phantom',
      name: 'Phantom',
      tag: 'Multi-Chain Crypto Vault',
      icon: '👻',
      installUrl: 'https://phantom.app/'
    },
    {
      type: 'Rabby',
      name: 'Rabby / Rainbow',
      tag: 'Advanced EVM Web3 Wallets',
      icon: '🌈',
      installUrl: 'https://rabby.io/'
    },
    {
      type: 'WalletConnect',
      name: 'WalletConnect (Mobile Apps)',
      tag: 'Scan with Trust, Rainbow, Zerion, Safe...',
      icon: '⚡'
    },
    {
      type: 'Demo',
      name: 'Instant Sandbox Testnet Vault',
      tag: 'Pre-funded with 6.85 ETH test liquidity',
      icon: '💎'
    }
  ];

  const handleWalletSelect = async (opt: typeof walletOptions[0]) => {
    if (opt.type === 'WalletConnect') {
      setSelectedWalletForQR('WalletConnect');
      setActiveView('qr');
      return;
    }

    const success = await connectWallet(opt.type);
    if (success) {
      setActiveView('wallets');
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 bg-[#0C0C12]/95 border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {activeView === 'qr' && (
              <button
                onClick={() => setActiveView('wallets')}
                className="p-1.5 rounded-lg text-[#9E9EA7] hover:text-white hover:bg-white/5 mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h3 className="text-xl font-editorial font-bold text-[#F5F5F7] flex items-center gap-2">
                {wallet.connected ? (
                  <>
                    <Wallet className="w-5 h-5 text-[#D4AF37]" />
                    <span>VAULT ACCOUNT</span>
                  </>
                ) : activeView === 'qr' ? (
                  'SCAN WITH MOBILE WALLET'
                ) : (
                  'CONNECT TO ARCVAULT'
                )}
              </h3>
              <p className="text-xs text-[#9E9EA7] mt-0.5">
                {wallet.connected
                  ? `${wallet.isRealProvider ? 'Live Verified Web3 Extension' : 'Testnet Sandbox Vault'} on ${wallet.network}`
                  : activeView === 'qr'
                  ? 'Scan this cryptographic QR code from your mobile app'
                  : 'Connect your preferred browser extension, mobile app, or sandbox'}
              </p>
            </div>
          </div>
          <button
            onClick={closeWalletModal}
            className="p-2 rounded-full text-[#9E9EA7] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto space-y-6 my-4 pr-1">
          {wallet.connected ? (
            /* Connected State */
            <div className="space-y-6">
              {/* Account Card */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#9E9EA7] uppercase">Connected Address</span>
                    {wallet.isRealProvider ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00F5D4]/15 text-[#00F5D4] border border-[#00F5D4]/30 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED EXTENSION
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1 font-bold">
                        <Sparkles className="w-3 h-3" /> SANDBOX VAULT
                      </span>
                    )}
                  </div>
                  <span className="badge-live">
                    <span className="pulse-dot" />
                    {wallet.network}
                  </span>
                </div>

                <div className="flex items-center justify-between font-mono text-xs font-medium text-[#F5F5F7] tracking-wider bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="break-all">{wallet.address}</span>
                  <button
                    onClick={copyAddress}
                    className="p-1.5 rounded-lg text-[#9E9EA7] hover:text-[#D4AF37] transition-colors flex-shrink-0 ml-2"
                    title="Copy Address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#00F5D4]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-sm">
                  <span className="text-[#9E9EA7]">Vault Liquidity:</span>
                  <div className="text-right">
                    <span className="font-display font-bold text-[#D4AF37] text-xl">
                      {wallet.balanceETH.toFixed(4)} ETH
                    </span>
                    <span className="text-xs text-[#5E5E68] block">≈ ${wallet.balanceUSD.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>

              {/* Network Selector */}
              <div>
                <label className="text-xs font-mono text-[#9E9EA7] uppercase tracking-wider block mb-2">
                  Switch Blockchain Network
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {networks.map((net) => (
                    <button
                      key={net}
                      onClick={() => switchNetwork(net)}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs font-mono transition-all ${
                        wallet.network === net
                          ? 'bg-[#D4AF37]/15 border border-[#D4AF37] text-[#D4AF37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                          : 'bg-white/5 border border-white/5 text-[#9E9EA7] hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{net}</span>
                      {wallet.network === net && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Balance Slider / Faucet */}
              {!wallet.isRealProvider && (
                <div className="p-4 rounded-2xl bg-[#14141E] border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9E9EA7] font-mono flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Simulated Faucet Top-up
                    </span>
                    <span className="text-[#D4AF37] font-bold font-mono">{customBalance} ETH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0.5"
                      max="25"
                      step="0.5"
                      value={customBalance}
                      onChange={(e) => {
                        setCustomBalance(e.target.value);
                        adjustBalance(parseFloat(e.target.value));
                      }}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#5E5E68] font-mono">
                    <span>0.5 ETH</span>
                    <span>10 ETH</span>
                    <span>25 ETH</span>
                  </div>
                </div>
              )}

              {/* Disconnect Button */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={disconnectWallet}
                  className="w-full py-3 rounded-full text-xs font-display uppercase tracking-wider text-[#FF5555] bg-[#FF5555]/10 border border-[#FF5555]/30 hover:bg-[#FF5555]/20 transition-all font-semibold"
                >
                  Disconnect Wallet Session
                </button>
              </div>
            </div>
          ) : activeView === 'qr' ? (
            /* WalletConnect QR Code View */
            <div className="space-y-6 text-center py-2">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-[280px] mx-auto flex flex-col items-center justify-center space-y-3 shadow-inner">
                {/* Simulated QR Pattern */}
                <div className="w-48 h-48 bg-white p-3 rounded-xl shadow-lg flex items-center justify-center relative">
                  <div className="w-full h-full border-4 border-black p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-8 h-8 bg-black" />
                      <div className="w-8 h-8 bg-black" />
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 rounded-lg bg-[#08080A] flex items-center justify-center text-[#D4AF37] text-xl font-bold">
                        ▲
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-8 h-8 bg-black" />
                      <div className="w-4 h-4 bg-black" />
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#9E9EA7]">
                  EIP-6963 Universal Cryptographic URI
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-editorial text-base font-bold text-white">
                  Open your Web3 Mobile App
                </h4>
                <p className="text-xs text-[#9E9EA7] max-w-sm mx-auto">
                  Scan this code using Rainbow, Trust Wallet, MetaMask Mobile, Coinbase, Zerion, or any WalletConnect v2 supported app.
                </p>
              </div>

              <button
                onClick={() => connectWallet('WalletConnect')}
                className="btn-primary py-3 px-6 text-xs w-full sm:w-auto"
              >
                <span>SIMULATE MOBILE APP CONFIRMATION</span>
              </button>
            </div>
          ) : (
            /* Wallet Selection List */
            <div className="space-y-3">
              {/* Instant Sandbox Banner */}
              <div
                onClick={() => connectWallet('Demo')}
                className="p-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 via-[#8A6D1B]/15 to-transparent border border-[#D4AF37]/40 hover:border-[#D4AF37] cursor-pointer transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-black/60 border border-[#D4AF37]/30 text-[#D4AF37]">
                    💎
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors text-sm">
                        One-Click Sandbox Vault
                      </h4>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4]/30 font-bold">
                        INSTANT
                      </span>
                    </div>
                    <p className="text-xs text-[#9E9EA7]">Explore all platform features with 6.85 ETH test liquidity</p>
                  </div>
                </div>
                <div className="text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center gap-2 my-2">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[10px] font-mono text-[#5E5E68] uppercase tracking-wider">
                  Or Connect Verified Provider
                </span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>

              <div className="space-y-2">
                {walletOptions
                  .filter((opt) => opt.type !== 'Demo')
                  .map((opt) => {
                    const isDetected = isExtensionDetected(opt.type);

                    return (
                      <button
                        key={opt.name}
                        onClick={() => handleWalletSelect(opt)}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/[0.07] transition-all group text-left"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="text-2xl p-2 rounded-lg bg-black/40 border border-white/5">
                            {opt.icon}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-display font-semibold text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors">
                                {opt.name}
                              </h4>
                              {isDetected && (
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4]/30 font-bold">
                                  DETECTED & READY
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#9E9EA7] mt-0.5">{opt.tag}</p>
                          </div>
                        </div>

                        <div className="text-white/20 group-hover:text-[#D4AF37] transition-colors">
                          {opt.type === 'WalletConnect' ? (
                            <QrCode className="w-5 h-5" />
                          ) : (
                            <Zap className="w-5 h-5" />
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#5E5E68] flex-shrink-0">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            EIP-1193 Injected + EIP-6963 Universal
          </span>
          <a
            href="https://ethereum.org/en/wallets/"
            target="_blank"
            rel="noreferrer"
            className="text-[#9E9EA7] hover:text-[#D4AF37] flex items-center gap-1 hover:underline"
          >
            <span>Learn About Web3 Wallets</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
