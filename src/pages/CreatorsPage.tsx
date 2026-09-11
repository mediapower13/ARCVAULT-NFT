import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { CreatorCard } from '../components/cards/CreatorCard';
import { Creator } from '../types';
import { ShieldCheck, Award } from 'lucide-react';

interface CreatorsPageProps {
  navigate: (route: string, id?: string) => void;
}

export const CreatorsPage: React.FC<CreatorsPageProps> = ({ navigate }) => {
  const { creators } = useWeb3();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
          ATELIER DOSSIERS
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
          CURATED CREATORS
        </h1>
        <p className="text-xs sm:text-sm text-[#9E9EA7] max-w-xl leading-relaxed">
          The computational artists, digital architects, and theorists defining on-chain culture on the ARCVAULT protocol.
        </p>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {creators.map((creator: Creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            onSelect={(id: string) => navigate('creator-detail', id)}
          />
        ))}
      </div>
    </div>
  );
};
