import React from 'react';
import { Collection } from '../../types';
import { ShieldCheck, ArrowRight, Layers } from 'lucide-react';

interface CollectionCardProps {
  collection: Collection;
  onSelect: (collectionId: string) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(collection.id)}
      className="group rounded-2xl overflow-hidden glass-card cursor-pointer border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col"
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-black/80">
        <img
          src={collection.coverImage}
          alt={collection.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-transparent to-transparent opacity-90" />

        {/* Creator Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-2 p-1.5 pr-3 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
          <img
            src={collection.creator.avatar}
            alt={collection.creator.name}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs text-[#F5F5F7] font-medium flex items-center gap-1">
            {collection.creator.name}
            {collection.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />}
          </span>
        </div>
      </div>

      {/* Collection Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors">
            {collection.name}
          </h3>
          <p className="text-xs text-[#9E9EA7] mt-1.5 line-clamp-2 leading-relaxed">
            {collection.tagline}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 text-center">
          <div>
            <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Floor</span>
            <span className="text-xs font-display font-bold text-[#D4AF37]">{collection.floorPrice} ETH</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Volume</span>
            <span className="text-xs font-display font-bold text-white">{collection.totalVolume} ETH</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Items</span>
            <span className="text-xs font-display font-bold text-white">{collection.totalItems}</span>
          </div>
        </div>

        {/* Action Link */}
        <div className="flex items-center justify-between text-xs font-mono text-[#9E9EA7] group-hover:text-[#D4AF37] transition-colors pt-2 border-t border-white/5">
          <span>VIEW COLLECTION MONOGRAPH</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
