import React, { useState } from 'react';
import { NFTArtwork } from '../../types';
import { useWeb3 } from '../../context/Web3Context';
import { CollectModal } from '../modals/CollectModal';
import { Sparkles, Gavel, Check, ArrowUpRight } from 'lucide-react';

interface NFTCardProps {
  artwork: NFTArtwork;
  onSelect: (artworkId: string) => void;
}

export const NFTCard: React.FC<NFTCardProps> = ({ artwork, onSelect }) => {
  const { wallet } = useWeb3();
  const [modalMode, setModalMode] = useState<'buy' | 'bid' | null>(null);

  const isOwner = wallet.collectedNFTs.some((item) => item.id === artwork.id);

  return (
    <>
      <div className="group relative rounded-2xl overflow-hidden glass-card flex flex-col cursor-pointer border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300">
        {/* Artwork Image Container */}
        <div
          onClick={() => onSelect(artwork.id)}
          className="relative aspect-[4/3] w-full overflow-hidden bg-black/80"
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-[#F5F5F7]">
              EDITION {artwork.edition.current} / {artwork.edition.total}
            </span>

            {isOwner ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#00F5D4]/20 border border-[#00F5D4]/40 text-[#00F5D4] flex items-center gap-1 backdrop-blur-md">
                <Check className="w-3 h-3" /> VAULT SECURED
              </span>
            ) : artwork.isLiveAuction ? (
              <span className="badge-live backdrop-blur-md">
                <span className="pulse-dot" /> LIVE AUCTION
              </span>
            ) : artwork.isCuratedDrop ? (
              <span className="badge-curated backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> CURATED
              </span>
            ) : null}
          </div>

          {/* Medium Tag */}
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9E9EA7] bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/5">
              {artwork.medium}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            {/* Title & Creator */}
            <div className="flex items-start justify-between gap-2">
              <h3
                onClick={() => onSelect(artwork.id)}
                className="font-editorial text-lg font-bold text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors truncate"
              >
                {artwork.title}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(artwork.id);
                }}
                className="text-[#9E9EA7] hover:text-[#D4AF37] transition-colors p-1"
                title="View Artwork Monograph"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Creator Row */}
            <div className="flex items-center gap-2 mt-2">
              <img
                src={artwork.creator.avatar}
                alt={artwork.creator.name}
                className="w-5 h-5 rounded-full object-cover border border-white/20"
              />
              <span className="text-xs text-[#9E9EA7] font-medium">{artwork.creator.name}</span>
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#5E5E68] block">
                {artwork.isLiveAuction ? 'Current Highest Bid' : 'Acquisition Price'}
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-display font-bold text-base text-[#D4AF37]">
                  {artwork.isLiveAuction && artwork.highestBid ? artwork.highestBid : artwork.price} ETH
                </span>
                <span className="text-[11px] text-[#9E9EA7] font-mono">
                  ≈ ${((artwork.isLiveAuction && artwork.highestBid ? artwork.highestBid : artwork.price) * 3450).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Quick Action Button */}
            {!isOwner && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalMode(artwork.isLiveAuction ? 'bid' : 'buy');
                }}
                className={`py-2 px-3.5 rounded-full text-xs font-display font-semibold transition-all ${
                  artwork.isLiveAuction
                    ? 'bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white border border-white/10'
                    : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black'
                }`}
              >
                {artwork.isLiveAuction ? 'Place Bid' : 'Collect'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Collect / Bid Modal */}
      {modalMode && (
        <CollectModal
          artwork={artwork}
          mode={modalMode}
          onClose={() => setModalMode(null)}
        />
      )}
    </>
  );
};
