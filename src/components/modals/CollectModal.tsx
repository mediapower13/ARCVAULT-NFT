import React, { useState } from 'react';
import { NFTArtwork } from '../../types';
import { useWeb3 } from '../../context/Web3Context';
import { ETH_PRICE_USD } from '../../data/mockData';
import { X, ShieldCheck, Zap, ArrowRight, Gavel, Check } from 'lucide-react';

interface CollectModalProps {
  artwork: NFTArtwork | null;
  mode: 'buy' | 'bid';
  onClose: () => void;
}

export const CollectModal: React.FC<CollectModalProps> = ({ artwork, mode, onClose }) => {
  const { wallet, collectArtwork, placeBid, openWalletModal } = useWeb3();
  const [bidAmount, setBidAmount] = useState<string>(
    artwork ? ((artwork.highestBid || artwork.price) * 1.1).toFixed(2) : '1.00'
  );
  const [activeTab, setActiveTab] = useState<'buy' | 'bid'>(mode);

  if (!artwork) return null;

  const minBid = artwork.highestBid ? artwork.highestBid + 0.05 : artwork.price;
  const gasEstimateETH = 0.0012;
  const royaltyPercentage = 7.5; // EIP-2981 7.5%
  const artistRoyaltyETH = (artwork.price * (royaltyPercentage / 100)).toFixed(3);

  const handleBuy = async () => {
    if (!wallet.connected) {
      openWalletModal();
      return;
    }
    const result = await collectArtwork(artwork.id);
    if (result.success) {
      onClose();
    }
  };

  const handleBid = async () => {
    if (!wallet.connected) {
      openWalletModal();
      return;
    }
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount < minBid) return;

    const result = await placeBid(artwork.id, amount);
    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 md:p-8 bg-[#0C0C12]/95 border border-white/15 shadow-2xl overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('buy')}
              className={`text-sm font-display font-bold uppercase tracking-wider pb-1 transition-all ${
                activeTab === 'buy'
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-[#9E9EA7] hover:text-[#F5F5F7]'
              }`}
            >
              Instant Collect
            </button>
            <button
              onClick={() => setActiveTab('bid')}
              className={`text-sm font-display font-bold uppercase tracking-wider pb-1 transition-all ${
                activeTab === 'bid'
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-[#9E9EA7] hover:text-[#F5F5F7]'
              }`}
            >
              Place On-Chain Bid
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#9E9EA7] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Artwork Summary Strip */}
        <div className="flex items-center gap-4 p-3.5 my-5 rounded-xl bg-white/[0.03] border border-white/5">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-16 h-16 rounded-lg object-cover border border-white/10 shadow-md"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
              Token #{artwork.tokenId} • Edition {artwork.edition.current}/{artwork.edition.total}
            </span>
            <h4 className="font-editorial text-base font-bold text-[#F5F5F7] truncate">{artwork.title}</h4>
            <p className="text-xs text-[#9E9EA7]">by {artwork.creator.name}</p>
          </div>
        </div>

        {activeTab === 'buy' ? (
          /* Instant Collect Tab */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#9E9EA7]">
                <span>Fixed Acquisition Price</span>
                <span className="font-mono text-white font-medium">{artwork.price} ETH</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#9E9EA7]">
                <span>Creator Royalty (7.5% EIP-2981)</span>
                <span className="font-mono text-[#D4AF37]">+{artistRoyaltyETH} ETH (Included)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#9E9EA7]">
                <span>Estimated Network Gas</span>
                <span className="font-mono text-white">~{gasEstimateETH} ETH</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm font-semibold">
                <span className="text-white">Total Payment</span>
                <div className="text-right">
                  <span className="text-lg font-display text-[#D4AF37]">
                    {(artwork.price + gasEstimateETH).toFixed(3)} ETH
                  </span>
                  <span className="text-xs text-[#9E9EA7] block font-mono">
                    ≈ ${((artwork.price + gasEstimateETH) * ETH_PRICE_USD).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Wallet Balance Check */}
            <div className="flex items-center justify-between text-xs px-2 text-[#9E9EA7]">
              <span>Vault Balance:</span>
              <span className="font-mono text-[#F5F5F7] font-semibold">
                {wallet.connected ? `${wallet.balanceETH.toFixed(3)} ETH` : 'Not Connected'}
              </span>
            </div>

            <button
              onClick={handleBuy}
              className="w-full btn-primary py-3.5 text-sm font-bold mt-2"
            >
              {wallet.connected ? (
                <>
                  <span>CONFIRM ON-CHAIN ACQUISITION</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>CONNECT WALLET TO COLLECT</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Place Bid Tab */
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[#9E9EA7] uppercase tracking-wider block mb-1.5">
                Enter Bid Amount (ETH)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  min={minBid}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full p-3.5 pr-16 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white font-mono text-lg outline-none"
                  placeholder={minBid.toString()}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-bold text-[#D4AF37]">
                  ETH
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#9E9EA7] mt-1.5 px-1">
                <span>Minimum next bid: <strong className="text-white font-mono">{minBid.toFixed(2)} ETH</strong></span>
                <span>≈ ${(parseFloat(bidAmount || '0') * ETH_PRICE_USD).toLocaleString()} USD</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-[#9E9EA7]">
                <span>Highest Bidder</span>
                <span className="font-mono text-[#F5F5F7]">
                  {artwork.highestBid ? `${artwork.highestBid} ETH` : 'No bids yet'}
                </span>
              </div>
              <div className="flex justify-between text-[#9E9EA7]">
                <span>Your Vault Balance</span>
                <span className="font-mono text-white">{wallet.balanceETH.toFixed(3)} ETH</span>
              </div>
            </div>

            <button
              onClick={handleBid}
              disabled={parseFloat(bidAmount) < minBid}
              className="w-full btn-primary py-3.5 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {wallet.connected ? (
                <>
                  <Gavel className="w-4 h-4" />
                  <span>SUBMIT CRYPTOGRAPHIC BID</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>CONNECT WALLET TO BID</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-[#5E5E68]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Smart contract escrows funds securely on Ethereum {wallet.network}.</span>
        </div>
      </div>
    </div>
  );
};
