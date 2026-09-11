import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { NFTCard } from '../components/cards/NFTCard';
import { CreatorCard } from '../components/cards/CreatorCard';
import { NFTArtwork, Creator } from '../types';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  Award,
  Flame,
  ArrowUpRight
} from 'lucide-react';

interface HomePageProps {
  navigate: (route: string, id?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { artworks, drops, creators, wallet, openWalletModal } = useWeb3();

  const featuredDrop = drops[0];
  const featuredArtworks = artworks.slice(0, 4);
  const spotlightArtwork = artworks.find((a: NFTArtwork) => a.id === 'artwork-001') || artworks[0];

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
        {/* Ambient Backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-br from-[#D4AF37]/10 via-[#7000FF]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00F5D4]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Typography Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Monogram & Curation Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                  CURATED ON-CHAIN ART PLATFORM
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-[#F5F5F7]">
                  DIGITAL <br />
                  <span className="text-gold-gradient">CULTURE</span> <br />
                  ON-CHAIN.
                </h1>
                <p className="text-base sm:text-lg text-[#9E9EA7] font-sans max-w-lg leading-relaxed pt-2">
                  Discover, collect, and trade exceptional digital works from selected computational masters.
                  Authenticated permanently on Ethereum.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('explore')}
                  className="btn-primary"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {!wallet.connected ? (
                  <button
                    onClick={openWalletModal}
                    className="btn-secondary"
                  >
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    <span>CONNECT WALLET</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('vault')}
                    className="btn-secondary"
                  >
                    <span>OPEN VAULT ({wallet.balanceETH.toFixed(2)} ETH)</span>
                  </button>
                )}
              </div>

              {/* Protocol Stats Strip */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-md">
                <div>
                  <span className="font-editorial text-2xl font-bold text-[#F5F5F7]">737.5 ETH</span>
                  <span className="block text-[11px] font-mono text-[#5E5E68] uppercase mt-0.5">Total Volume</span>
                </div>
                <div>
                  <span className="font-editorial text-2xl font-bold text-[#F5F5F7]">100%</span>
                  <span className="block text-[11px] font-mono text-[#5E5E68] uppercase mt-0.5">On-Chain Verified</span>
                </div>
                <div>
                  <span className="font-editorial text-2xl font-bold text-[#D4AF37]">0.85 ETH</span>
                  <span className="block text-[11px] font-mono text-[#5E5E68] uppercase mt-0.5">Genesis Floor</span>
                </div>
              </div>
            </div>

            {/* Right Hero Artwork Stage */}
            <div className="lg:col-span-5 relative">
              <div
                onClick={() => navigate('nft', spotlightArtwork.id)}
                className="group relative rounded-3xl overflow-hidden glass-card p-3 border border-white/15 cursor-pointer shadow-2xl hover:border-[#D4AF37]/60 transition-all duration-500"
              >
                {/* Artwork Frame */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black">
                  <img
                    src={spotlightArtwork.image}
                    alt={spotlightArtwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="badge-curated">
                      <Sparkles className="w-3.5 h-3.5" /> SPOTLIGHT WORK
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md border border-white/10 text-white">
                      Token #{spotlightArtwork.tokenId}
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2 text-left">
                    <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                      {spotlightArtwork.medium}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                      {spotlightArtwork.title}
                    </h3>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <img
                          src={spotlightArtwork.creator.avatar}
                          alt={spotlightArtwork.creator.name}
                          className="w-6 h-6 rounded-full object-cover border border-white/20"
                        />
                        <span className="text-xs text-[#9E9EA7]">{spotlightArtwork.creator.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Acquisition</span>
                        <span className="font-display font-bold text-[#D4AF37] text-sm">
                          {spotlightArtwork.price} ETH
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED DROP SPOTLIGHT */}
      {featuredDrop && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#D4AF37]/30 bg-gradient-to-r from-[#0E0E14] to-[#12121B] p-8 md:p-12 shadow-2xl">
            {/* Corner Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Drop Image */}
              <div
                onClick={() => navigate('drops')}
                className="lg:col-span-6 relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-xl border border-white/10"
              >
                <img
                  src={featuredDrop.coverImage}
                  alt={featuredDrop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="badge-live backdrop-blur-md">
                    <span className="pulse-dot" /> LIVE CURATED DROP
                  </span>
                  <span className="text-xs font-mono text-white bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                    {featuredDrop.mintedEditions} / {featuredDrop.totalEditions} Minted
                  </span>
                </div>
              </div>

              {/* Drop Details */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] block">
                    FEATURED CURATED DROP
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#F5F5F7] tracking-tight">
                    {featuredDrop.title}
                  </h2>
                  <p className="text-sm text-[#9E9EA7] leading-relaxed pt-1">
                    {featuredDrop.curatorStatement}
                  </p>
                </div>

                {/* Artist Dossier Row */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <img
                    src={featuredDrop.creator.avatar}
                    alt={featuredDrop.creator.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/40"
                  />
                  <div>
                    <h4 className="font-editorial text-sm font-bold text-white flex items-center gap-1.5">
                      {featuredDrop.creator.name}
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    </h4>
                    <span className="text-xs font-mono text-[#9E9EA7]">{featuredDrop.creator.handle}</span>
                  </div>
                </div>

                {/* Drop Live Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#9E9EA7]">Edition Allocation Progress</span>
                    <span className="text-[#D4AF37] font-bold">
                      {((featuredDrop.mintedEditions / featuredDrop.totalEditions) * 100).toFixed(0)}% Claimed
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#00F5D4] rounded-full transition-all duration-1000"
                      style={{
                        width: `${(featuredDrop.mintedEditions / featuredDrop.totalEditions) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Mint CTA */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => navigate('drops')}
                    className="btn-primary"
                  >
                    <span>ENTER DROP CONSOLE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase text-[#5E5E68] block">Mint Price</span>
                    <span className="font-display font-bold text-lg text-white">
                      {featuredDrop.mintPrice} ETH <span className="text-xs text-[#9E9EA7] font-mono">(${(featuredDrop.mintPrice * 3450).toLocaleString()})</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. CURATED EXHIBITION GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              CURRENT EXHIBITION
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#F5F5F7]">
              SELECTED WORKS
            </h2>
          </div>
          <button
            onClick={() => navigate('explore')}
            className="flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-wider text-[#D4AF37] hover:underline"
          >
            <span>VIEW COMPLETE GALLERY ({artworks.length} WORKS)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Artworks Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtworks.map((artwork: NFTArtwork) => (
            <NFTCard
              key={artwork.id}
              artwork={artwork}
              onSelect={(id: string) => navigate('nft', id)}
            />
          ))}
        </div>
      </section>

      {/* 4. CURATORIAL VALUES / PROTOCOL PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-14 rounded-3xl glass-panel border border-white/10 bg-[#0A0A0E] space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              THE ARCVAULT STANDARD
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#F5F5F7]">
              BUILT FOR TIMELESS VALUE
            </h2>
            <p className="text-xs sm:text-sm text-[#9E9EA7]">
              A curated departure from algorithmic hype. Designed specifically for institutional and fine art collectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#F5F5F7]">Curated Selection</h3>
              <p className="text-xs text-[#9E9EA7] leading-relaxed">
                Only invited computational artists, sculptors, and generative theorists are admitted to the protocol exhibition registry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00F5D4]/15 border border-[#00F5D4]/30 flex items-center justify-center text-[#00F5D4]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#F5F5F7]">Immutable Provenance</h3>
              <p className="text-xs text-[#9E9EA7] leading-relaxed">
                Full cryptographic history with IPFS metadata pinning, EIP-712 structured signing, and permanent on-chain audit trails.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#7000FF]/15 border border-[#7000FF]/30 flex items-center justify-center text-[#7000FF]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#F5F5F7]">8K Lossless Masters</h3>
              <p className="text-xs text-[#9E9EA7] leading-relaxed">
                Every tokenized artwork includes ultra high-resolution archival media files suitable for physical museum displays and projection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CREATORS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              PROFILES IN DIGITAL ART
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#F5F5F7]">
              CURATED CREATORS
            </h2>
          </div>
          <button
            onClick={() => navigate('creators')}
            className="flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-wider text-[#D4AF37] hover:underline"
          >
            <span>VIEW ALL ARTISTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.map((creator: Creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onSelect={(id: string) => navigate('creator-detail', id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
