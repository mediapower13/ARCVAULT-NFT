import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { BlockchainNetwork } from '../../types';
import { X, Check, Shield, Wallet, Zap, Layers, RefreshCw } from 'lucide-react';

export const WalletModal: React.FC = () => {
  const {
    isWalletModalOpen,
    closeWalletModal,
    wallet,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    adjustBalance
  } = useWeb3();

  const [customBalance, setCustomBalance] = useState(wallet.balanceETH.toString());

  if (!isWalletModalOpen) return null;

  const networks: BlockchainNetwork[] = ['Ethereum', 'Sepolia', 'Base', 'Arbitrum'];

  const wallets = [
    {
      name: 'MetaMask' as const,
      tag: 'Browser Extension & Mobile',
      icon: '🦊',
      popular: true
    },
    {
      name: 'Coinbase' as const,
      tag: 'Smart Wallet & App',
      icon: '🔵',
      popular: false
    },
    {
      name: 'Phantom' as const,
      tag: 'Multi-Chain Crypto Vault',
      icon: '👻',
      popular: false
    },
    {
      name: 'WalletConnect' as const,
      tag: 'Universal QR Scanner',
      icon: '⚡',
      popular: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 md:p-8 bg-[#0C0C10]/95 border border-white/15 shadow-2xl overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div>
            <h3 className="text-xl font-editorial font-bold text-[#F5F5F7]">
              {wallet.connected ? 'VAULT ACCOUNT' : 'CONNECT TO ARCVAULT'}
            </h3>
            <p className="text-xs text-[#9E9EA7] mt-0.5">
              {wallet.connected
                ? 'Manage active on-chain session & testnet simulation'
                : 'Connect your Web3 keypair to mint, collect, and bid'}
            </p>
          </div>
          <button
            onClick={closeWalletModal}
            className="p-2 rounded-full text-[#9E9EA7] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {wallet.connected ? (
          /* Connected State */
          <div className="mt-6 space-y-6">
            {/* Account Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#9E9EA7] uppercase">Connected Address</span>
                <span className="badge-live">
                  <span className="pulse-dot" />
                  {wallet.network}
                </span>
              </div>
              <div className="font-mono text-base font-medium text-[#F5F5F7] tracking-wider break-all bg-white/5 p-2.5 rounded-lg border border-white/5">
                {wallet.address}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-sm">
                <span className="text-[#9E9EA7]">Vault Balance:</span>
                <div className="text-right">
                  <span className="font-display font-bold text-[#D4AF37] text-lg">{wallet.balanceETH.toFixed(3)} ETH</span>
                  <span className="text-xs text-[#5E5E68] block">≈ ${wallet.balanceUSD.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            {/* Network Selector */}
            <div>
              <label className="text-xs font-mono text-[#9E9EA7] uppercase tracking-wider block mb-2">
                Active Blockchain Network
              </label>
              <div className="grid grid-cols-2 gap-2">
                {networks.map((net) => (
                  <button
                    key={net}
                    onClick={() => switchNetwork(net)}
                    className={`flex items-center justify-between p-3 rounded-lg text-xs font-medium border transition-all ${
                      wallet.network === net
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                        : 'bg-white/5 border-white/5 text-[#9E9EA7] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{net}</span>
                    {wallet.network === net && <Check className="w-4 h-4 text-[#D4AF37]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Simulation Balance Slider / Faucet */}
            <div className="p-3.5 rounded-xl bg-[#181820]/80 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9E9EA7] font-mono flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Simulated Balance Faucet
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
              <div className="flex justify-between text-[11px] text-[#5E5E68]">
                <span>0.5 ETH</span>
                <span>10 ETH</span>
                <span>25 ETH</span>
              </div>
            </div>

            {/* Disconnect Button */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={disconnectWallet}
                className="w-full py-3 rounded-full text-xs font-display uppercase tracking-wider text-[#FF5555] bg-[#FF5555]/10 border border-[#FF5555]/30 hover:bg-[#FF5555]/20 transition-all font-semibold"
              >
                Disconnect Session
              </button>
            </div>
          </div>
        ) : (
          /* Connect Options */
          <div className="mt-6 space-y-3">
            {wallets.map((w) => (
              <button
                key={w.name}
                onClick={() => connectWallet(w.name)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/[0.07] transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl p-2 rounded-lg bg-black/40 border border-white/5">{w.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-semibold text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors">
                        {w.name}
                      </h4>
                      {w.popular && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#9E9EA7] mt-0.5">{w.tag}</p>
                  </div>
                </div>
                <div className="text-white/20 group-hover:text-[#D4AF37] transition-colors">
                  <Zap className="w-5 h-5" />
                </div>
              </button>
            ))}

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[#5E5E68] border-t border-white/5 mt-4">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Non-custodial cryptographic connection. Works on Mainnet & Testnets.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
