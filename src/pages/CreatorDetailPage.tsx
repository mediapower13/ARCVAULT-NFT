import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { NFTCard } from '../components/cards/NFTCard';
import { Creator, NFTArtwork } from '../types';
import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  Twitter,
  Instagram,
  Sparkles,
  Award,
  Share2
} from 'lucide-react';

interface CreatorDetailPageProps {
  creatorId: string;
  navigate: (route: string, id?: string) => void;
}

export const CreatorDetailPage: React.FC<CreatorDetailPageProps> = ({
  creatorId,
  navigate
}) => {
  const { creators, artworks } = useWeb3();

  const creator: Creator = creators.find((c: Creator) => c.id === creatorId) || creators[0];
  const creatorArtworks: NFTArtwork[] = artworks.filter((a: NFTArtwork) => a.creatorId === creator.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 text-left">
      {/* Back Button */}
      <button
        onClick={() => navigate('creators')}
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9E9EA7] hover:text-[#D4AF37] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO CREATORS</span>
      </button>

      {/* Artist Dossier Header */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 bg-[#0A0A0E] p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Avatar Stage */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Dossier Info */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#D4AF37]">{creator.handle}</span>
                <span className="text-xs text-[#5E5E68]">• {creator.location}</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] tracking-tight flex items-center gap-2.5">
                {creator.name}
                {creator.verified && <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />}
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed max-w-2xl">
              {creator.bio}
            </p>

            {/* Artist Statement Quote */}
            <div className="p-4 rounded-xl bg-black/50 border-l-2 border-[#D4AF37] text-xs text-[#9E9EA7] italic leading-relaxed">
              "{creator.statement}"
            </div>

            {/* Stats Row & Etherscan */}
            <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/10">
              <div>
                <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Total Sales Volume</span>
                <span className="font-display font-bold text-xl text-[#D4AF37]">{creator.totalVolume} ETH</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Floor Price</span>
                <span className="font-display font-bold text-xl text-white">{creator.floorPrice} ETH</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Curated Works</span>
                <span className="font-display font-bold text-xl text-white">{creatorArtworks.length}</span>
              </div>
              {creator.etherscan && (
                <div className="ml-auto">
                  <a
                    href={creator.etherscan}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary py-2 px-4 text-xs font-mono"
                  >
                    <span>Etherscan</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Artist Artworks Gallery */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="font-editorial text-2xl font-bold text-white">
            PORTFOLIO OF WORKS ({creatorArtworks.length})
          </h2>
          <span className="text-xs font-mono text-[#9E9EA7]">Curated on Ethereum</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creatorArtworks.map((artwork: NFTArtwork) => (
            <NFTCard
              key={artwork.id}
              artwork={artwork}
              onSelect={(id: string) => navigate('nft', id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
