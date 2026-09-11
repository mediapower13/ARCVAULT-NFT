import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { NFTCard } from '../components/cards/NFTCard';
import { NFTArtwork } from '../types';
import {
  Wallet,
  ShieldCheck,
  FolderLock,
  Layers,
  Gavel,
  History,
  Copy,
  Check,
  ExternalLink,
  Zap,
  PlusCircle,
  ArrowRight
} from 'lucide-react';

interface ProfileVaultPageProps {
  navigate: (route: string, id?: string) => void;
}

export const ProfileVaultPage: React.FC<ProfileVaultPageProps> = ({ navigate }) => {
  const { wallet, openWalletModal } = useWeb3();
  const [activeTab, setActiveTab] = useState<'collected' | 'bids' | 'created' | 'history'>('collected');
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!wallet.connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mx-auto">
          <FolderLock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-editorial text-3xl font-extrabold text-white">
            COLLECTOR VAULT LOCKED
          </h2>
          <p className="text-sm text-[#9E9EA7] max-w-md mx-auto">
            Connect your Web3 keypair to view your secured digital collection, active auction bids, and cryptographic provenance history.
          </p>
        </div>
        <button onClick={openWalletModal} className="btn-primary">
          <Wallet className="w-4 h-4" />
          <span>CONNECT WALLET SESSION</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left">
      {/* Vault Header Stage */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#D4AF37]/30 bg-gradient-to-r from-[#0C0C12] via-[#101018] to-[#0A0A0E] p-8 md:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="badge-live">
                <span className="pulse-dot" /> {wallet.network} Connected
              </span>
              <span className="text-xs font-mono text-[#D4AF37]">{wallet.walletType}</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#F5F5F7]">
              COLLECTOR VAULT
            </h1>

            {/* Address Row with Copy */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#9E9EA7] bg-black/50 px-3 py-1.5 rounded-lg border border-white/5 break-all">
                {wallet.address}
              </span>
              <button
                onClick={copyAddress}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9E9EA7] hover:text-white transition-colors"
                title="Copy Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00F5D4]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Portfolio Total Card */}
          <div className="p-6 rounded-2xl bg-black/60 border border-white/10 text-left md:text-right space-y-1">
            <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">
              Vault Liquidity Balance
            </span>
            <div className="font-display font-extrabold text-3xl text-[#D4AF37]">
              {wallet.balanceETH.toFixed(3)} ETH
            </div>
            <span className="text-xs text-[#9E9EA7] font-mono block">
              ≈ ${wallet.balanceUSD.toLocaleString()} USD
            </span>
            <div className="pt-2">
              <button
                onClick={openWalletModal}
                className="text-[11px] font-mono text-[#D4AF37] hover:underline"
              >
                Manage / Faucet Simulation →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('collected')}
          className={`px-4 py-2.5 rounded-full text-xs font-display font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'collected'
              ? 'bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.3)]'
              : 'bg-white/5 text-[#9E9EA7] hover:text-white'
          }`}
        >
          <FolderLock className="w-3.5 h-3.5" />
          <span>COLLECTED WORKS ({wallet.collectedNFTs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bids')}
          className={`px-4 py-2.5 rounded-full text-xs font-display font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'bids'
              ? 'bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.3)]'
              : 'bg-white/5 text-[#9E9EA7] hover:text-white'
          }`}
        >
          <Gavel className="w-3.5 h-3.5" />
          <span>ACTIVE BIDS ({wallet.activeBids.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('created')}
          className={`px-4 py-2.5 rounded-full text-xs font-display font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'created'
              ? 'bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.3)]'
              : 'bg-white/5 text-[#9E9EA7] hover:text-white'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>STUDIO CREATIONS ({wallet.createdNFTs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2.5 rounded-full text-xs font-display font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'history'
              ? 'bg-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.3)]'
              : 'bg-white/5 text-[#9E9EA7] hover:text-white'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>ON-CHAIN LEDGER ({wallet.transactionHistory.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'collected' && (
        <div>
          {wallet.collectedNFTs.length === 0 ? (
            <div className="p-16 rounded-3xl glass-panel text-center space-y-4 border border-white/10">
              <FolderLock className="w-10 h-10 text-[#5E5E68] mx-auto" />
              <h3 className="font-editorial text-xl font-bold text-white">No Artworks In Vault Yet</h3>
              <p className="text-xs text-[#9E9EA7] max-w-sm mx-auto">
                Discover pieces in the curated exhibition or mint from live creator drops to build your on-chain collection.
              </p>
              <button onClick={() => navigate('explore')} className="btn-primary text-xs">
                <span>EXPLORE EXHIBITION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wallet.collectedNFTs.map((artwork: NFTArtwork) => (
                <NFTCard
                  key={artwork.id}
                  artwork={artwork}
                  onSelect={(id: string) => navigate('nft', id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'bids' && (
        <div className="space-y-4">
          {wallet.activeBids.length === 0 ? (
            <div className="p-16 rounded-3xl glass-panel text-center space-y-4 border border-white/10">
              <Gavel className="w-10 h-10 text-[#5E5E68] mx-auto" />
              <h3 className="font-editorial text-xl font-bold text-white">No Active Bids</h3>
              <p className="text-xs text-[#9E9EA7] max-w-sm mx-auto">
                You currently have no active bids on live auctions.
              </p>
              <button onClick={() => navigate('explore')} className="btn-secondary text-xs">
                Browse Live Auctions
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {wallet.activeBids.map((bid, bidx: number) => (
                <div
                  key={bidx}
                  onClick={() => navigate('nft', bid.artworkId)}
                  className="p-5 rounded-2xl glass-card border border-white/10 hover:border-[#D4AF37]/50 flex items-center justify-between cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="badge-live">
                      <span className="pulse-dot" /> LEADING BIDDER
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-white">{bid.artworkTitle}</h4>
                    <span className="text-xs font-mono text-[#5E5E68]">Bid submitted: {new Date(bid.date).toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Your Bid Amount</span>
                    <span className="font-display font-extrabold text-xl text-[#D4AF37]">{bid.amount} ETH</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'created' && (
        <div>
          {wallet.createdNFTs.length === 0 ? (
            <div className="p-16 rounded-3xl glass-panel text-center space-y-4 border border-white/10">
              <PlusCircle className="w-10 h-10 text-[#5E5E68] mx-auto" />
              <h3 className="font-editorial text-xl font-bold text-white">No Studio Minted Works</h3>
              <p className="text-xs text-[#9E9EA7] max-w-sm mx-auto">
                Use the Creator Studio to upload master artwork, configure IPFS decentralized metadata, and deploy to smart contracts.
              </p>
              <button onClick={() => navigate('studio')} className="btn-primary text-xs">
                <span>LAUNCH CREATOR STUDIO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wallet.createdNFTs.map((artwork: NFTArtwork) => (
                <NFTCard
                  key={artwork.id}
                  artwork={artwork}
                  onSelect={(id: string) => navigate('nft', id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-3">
          {wallet.transactionHistory.map((tx) => (
            <div
              key={tx.id}
              className="p-4 rounded-2xl bg-[#0E0E14] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-bold">
                  {tx.type}
                </span>
                <div>
                  <h4 className="text-white font-semibold font-sans text-sm">{tx.title}</h4>
                  <span className="text-[#5E5E68]">{tx.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:ml-auto">
                {tx.amount && (
                  <span className="text-[#D4AF37] font-bold font-display text-sm">{tx.amount} ETH</span>
                )}
                <a
                  href={`https://etherscan.io/tx/${tx.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9E9EA7] hover:text-white flex items-center gap-1"
                >
                  <span>{tx.txHash.substring(0, 10)}...</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
