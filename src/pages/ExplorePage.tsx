import React, { useState, useMemo } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { NFTCard } from '../components/cards/NFTCard';
import { ArtworkMedium, NFTArtwork } from '../types';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Rows,
  Maximize2,
  Sparkles,
  ArrowUpDown,
  Filter
} from 'lucide-react';

interface ExplorePageProps {
  navigate: (route: string, id?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  navigate,
  searchQuery,
  setSearchQuery
}) => {
  const { artworks } = useWeb3();

  const [selectedMedium, setSelectedMedium] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'edition' | 'newest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'cinema' | 'list'>('grid');

  const mediums: { label: string; value: string }[] = [
    { label: 'All Mediums', value: 'all' },
    { label: 'Architectural 3D', value: 'Architectural 3D' },
    { label: 'Digital Sculpture', value: 'Digital Sculpture' },
    { label: 'Generative Code', value: 'Generative Code' },
    { label: 'Audiovisual', value: 'Audiovisual' },
    { label: 'Minimalist 3D', value: 'Minimalist 3D' }
  ];

  const statuses = [
    { label: 'All Works', value: 'all' },
    { label: 'Buy Now', value: 'buy-now' },
    { label: 'Live Auctions', value: 'live-auction' },
    { label: 'Curated Drops', value: 'curated' }
  ];

  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art: NFTArtwork) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = art.title.toLowerCase().includes(q);
          const matchCreator = art.creator.name.toLowerCase().includes(q) || art.creator.handle.toLowerCase().includes(q);
          const matchMedium = art.medium.toLowerCase().includes(q);
          const matchDesc = art.description.toLowerCase().includes(q);
          if (!matchTitle && !matchCreator && !matchMedium && !matchDesc) return false;
        }

        // Medium filter
        if (selectedMedium !== 'all' && art.medium !== selectedMedium) {
          return false;
        }

        // Status filter
        if (selectedStatus === 'buy-now' && art.isLiveAuction) return false;
        if (selectedStatus === 'live-auction' && !art.isLiveAuction) return false;
        if (selectedStatus === 'curated' && !art.isCuratedDrop) return false;

        return true;
      })
      .sort((a: NFTArtwork, b: NFTArtwork) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'edition') return a.edition.total - b.edition.total;
        return parseInt(b.tokenId) - parseInt(a.tokenId);
      });
  }, [artworks, searchQuery, selectedMedium, selectedStatus, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-8">
      {/* Page Header */}
      <div className="space-y-3 text-left">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
          CURATED CATALOGUE
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
          EXPLORE EXHIBITION
        </h1>
        <p className="text-xs sm:text-sm text-[#9E9EA7] max-w-xl leading-relaxed">
          Browse verified digital artworks, sculptured voids, and generative algorithmic compositions from our roster of international artists.
        </p>
      </div>

      {/* Filter & Controls Bar */}
      <div className="p-4 rounded-2xl glass-panel bg-[#0C0C12] border border-white/10 space-y-4">
        {/* Row 1: Search & Sort & View */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EA7]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, artist name, medium, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-[#5E5E68] focus:border-[#D4AF37] outline-none"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#9E9EA7]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white outline-none cursor-pointer text-xs"
              >
                <option value="newest" className="bg-[#0E0E14] text-white">Recently Minted</option>
                <option value="price-asc" className="bg-[#0E0E14] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#0E0E14] text-white">Price: High to Low</option>
                <option value="edition" className="bg-[#0E0E14] text-white">Edition Scarcity</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-[#9E9EA7] hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cinema')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'cinema' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-[#9E9EA7] hover:text-white'
                }`}
                title="Cinema Exhibition View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Medium Filters & Status Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
          {/* Medium Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {mediums.map((m) => (
              <button
                key={m.value}
                onClick={() => setSelectedMedium(m.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedMedium === m.value
                    ? 'bg-[#D4AF37] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                    : 'bg-white/5 text-[#9E9EA7] hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1.5">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => setSelectedStatus(s.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-display font-medium transition-all ${
                  selectedStatus === s.value
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 text-[#9E9EA7] hover:text-white border border-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Artworks List Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#9E9EA7]">
        <span>SHOWING {filteredArtworks.length} OF {artworks.length} CURATED ARTWORKS</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[#D4AF37] hover:underline"
          >
            Clear Search Query
          </button>
        )}
      </div>

      {/* Content Rendering by View Mode */}
      {filteredArtworks.length === 0 ? (
        <div className="p-16 rounded-3xl glass-panel text-center space-y-4 border border-white/10 bg-black/40">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto opacity-60" />
          <h3 className="font-editorial text-xl font-bold text-white">No Artworks Found</h3>
          <p className="text-xs text-[#9E9EA7] max-w-sm mx-auto">
            Try adjusting your search criteria or reset medium filters to view the complete collection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMedium('all');
              setSelectedStatus('all');
            }}
            className="btn-secondary text-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork: NFTArtwork) => (
            <NFTCard
              key={artwork.id}
              artwork={artwork}
              onSelect={(id: string) => navigate('nft', id)}
            />
          ))}
        </div>
      ) : (
        /* Cinema / Theater Mode */
        <div className="space-y-12">
          {filteredArtworks.map((artwork: NFTArtwork) => (
            <div
              key={artwork.id}
              onClick={() => navigate('nft', artwork.id)}
              className="group rounded-3xl overflow-hidden glass-card p-6 md:p-8 border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-500 cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono uppercase bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-white border border-white/10">
                      {artwork.medium}
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-4 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#D4AF37]">
                      Token #{artwork.tokenId} • Edition {artwork.edition.current}/{artwork.edition.total}
                    </span>
                  </div>
                  <h2 className="font-editorial text-3xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                    {artwork.title}
                  </h2>
                  <p className="text-xs text-[#9E9EA7] leading-relaxed line-clamp-3">
                    {artwork.description}
                  </p>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <img
                      src={artwork.creator.avatar}
                      alt={artwork.creator.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">{artwork.creator.name}</span>
                      <span className="text-[11px] font-mono text-[#9E9EA7]">{artwork.creator.handle}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Price</span>
                      <span className="font-display font-bold text-xl text-[#D4AF37]">{artwork.price} ETH</span>
                    </div>
                    <button className="btn-primary text-xs py-2.5 px-5">
                      VIEW MONOGRAPH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
