import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { CollectionCard } from '../components/cards/CollectionCard';
import { Collection } from '../types';
import { Layers, ShieldCheck, ArrowUpDown } from 'lucide-react';

interface CollectionsPageProps {
  navigate: (route: string, id?: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({ navigate }) => {
  const { collections } = useWeb3();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
          CURATED PORTFOLIOS
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
          COLLECTIONS MONOGRAPH
        </h1>
        <p className="text-xs sm:text-sm text-[#9E9EA7] max-w-xl leading-relaxed">
          Thematic bodies of computational work curated for museum archives and decentralized collectors.
        </p>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((col: Collection) => (
          <CollectionCard
            key={col.id}
            collection={col}
            onSelect={(id: string) => navigate('collection-detail', id)}
          />
        ))}
      </div>
    </div>
  );
};
