import React from 'react';
import { Creator } from '../../types';
import { ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface CreatorCardProps {
  creator: Creator;
  onSelect: (creatorId: string) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(creator.id)}
      className="group rounded-2xl p-6 glass-card border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-6"
    >
      {/* Top Section */}
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#D4AF37] transition-colors flex-shrink-0">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-editorial text-lg font-bold text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors truncate">
              {creator.name}
            </h3>
            {creator.verified && <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />}
          </div>
          <p className="text-xs font-mono text-[#D4AF37] mt-0.5">{creator.handle}</p>
          <p className="text-xs text-[#5E5E68] mt-1">{creator.location}</p>
        </div>
      </div>

      {/* Bio Statement */}
      <p className="text-xs text-[#9E9EA7] line-clamp-3 leading-relaxed">
        {creator.bio}
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 text-center">
        <div>
          <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Total Volume</span>
          <span className="text-sm font-display font-bold text-[#D4AF37]">{creator.totalVolume} ETH</span>
        </div>
        <div>
          <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Floor Price</span>
          <span className="text-sm font-display font-bold text-white">{creator.floorPrice} ETH</span>
        </div>
      </div>

      {/* Link */}
      <div className="flex items-center justify-between text-xs font-mono text-[#9E9EA7] group-hover:text-[#D4AF37] transition-colors pt-2 border-t border-white/5">
        <span>VIEW ARTIST DOSSIER</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
