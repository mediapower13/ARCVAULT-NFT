import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { NFTCard } from '../components/cards/NFTCard';
import { Collection, NFTArtwork } from '../types';
import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

interface CollectionDetailPageProps {
  collectionId: string;
  navigate: (route: string, id?: string) => void;
}

export const CollectionDetailPage: React.FC<CollectionDetailPageProps> = ({
  collectionId,
  navigate
}) => {
  const { collections, artworks } = useWeb3();

  const collection: Collection = collections.find((c: Collection) => c.id === collectionId) || collections[0];
  const collectionArtworks: NFTArtwork[] = artworks.filter((a: NFTArtwork) => a.collectionId === collection.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      {/* Back Button */}
      <button
        onClick={() => navigate('collections')}
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9E9EA7] hover:text-[#D4AF37] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO COLLECTIONS</span>
      </button>

      {/* Hero Banner Header */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 bg-[#0A0A0E] p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="badge-curated">
                <Sparkles className="w-3.5 h-3.5" /> CURATED MONOGRAPH
              </span>
              <span className="text-xs font-mono text-[#9E9EA7]">Est. {collection.createdAt}</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
              {collection.name}
            </h1>

            <p className="text-sm text-[#9E9EA7] leading-relaxed max-w-2xl">
              {collection.curatorStatement}
            </p>

            {/* Creator Monograph Row */}
            <div
              onClick={() => navigate('creator-detail', collection.creator.id)}
              className="inline-flex items-center gap-3 p-2 pr-4 rounded-full bg-white/5 border border-white/10 hover:border-[#D4AF37] cursor-pointer transition-all"
            >
              <img
                src={collection.creator.avatar}
                alt={collection.creator.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-bold text-white flex items-center gap-1">
                {collection.creator.name}
                {collection.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </span>
              <span className="text-xs font-mono text-[#D4AF37]">Dossier →</span>
            </div>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Floor Price</span>
                <span className="font-display font-bold text-xl text-[#D4AF37]">{collection.floorPrice} ETH</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Total Volume</span>
                <span className="font-display font-bold text-xl text-white">{collection.totalVolume} ETH</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Items Count</span>
                <span className="font-display font-bold text-xl text-white">{collection.totalItems}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Unique Owners</span>
                <span className="font-display font-bold text-xl text-white">{collection.ownersCount}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-[#5E5E68]">Smart Contract:</span>
              <a
                href={`https://etherscan.io/address/${collection.contractAddress}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>{collection.contractAddress.substring(0, 6)}...{collection.contractAddress.substring(collection.contractAddress.length - 4)}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Artworks Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="font-editorial text-2xl font-bold text-white">
            COLLECTION ARTWORKS ({collectionArtworks.length})
          </h2>
          <span className="text-xs font-mono text-[#9E9EA7]">All pieces verified ERC-721</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collectionArtworks.map((artwork: NFTArtwork) => (
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
