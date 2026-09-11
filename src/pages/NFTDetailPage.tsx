import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { CollectModal } from '../components/modals/CollectModal';
import { ProvenanceModal } from '../components/modals/ProvenanceModal';
import { NFTCard } from '../components/cards/NFTCard';
import { NFTArtwork, ProvenanceRecord } from '../types';
import {
  ArrowLeft,
  ShieldCheck,
  Zap,
  ExternalLink,
  Gavel,
  Check,
  Maximize2,
  FileCode,
  HardDrive,
  Copy,
  Clock,
  Sparkles,
  Layers,
  Share2
} from 'lucide-react';

interface NFTDetailPageProps {
  artworkId: string;
  navigate: (route: string, id?: string) => void;
}

export const NFTDetailPage: React.FC<NFTDetailPageProps> = ({ artworkId, navigate }) => {
  const { artworks, wallet } = useWeb3();
  const [modalMode, setModalMode] = useState<'buy' | 'bid' | null>(null);
  const [isProvenanceOpen, setIsProvenanceOpen] = useState(false);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const artwork: NFTArtwork = artworks.find((a: NFTArtwork) => a.id === artworkId) || artworks[0];

  if (!artwork) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-editorial text-2xl font-bold text-white">Artwork Not Found</h2>
        <button onClick={() => navigate('explore')} className="btn-primary mt-4">
          Return to Gallery
        </button>
      </div>
    );
  }

  const isOwner = wallet.collectedNFTs.some((item: NFTArtwork) => item.id === artwork.id);
  const otherWorksByArtist: NFTArtwork[] = artworks.filter(
    (a: NFTArtwork) => a.creatorId === artwork.creatorId && a.id !== artwork.id
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 text-left">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('explore')}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9E9EA7] hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO EXHIBITION</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#9E9EA7] hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5 text-xs font-mono"
            title="Share Artwork"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#00F5D4]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'LINK COPIED' : 'SHARE'}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: High-Res Master Artwork Stage */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl overflow-hidden glass-card p-3 border border-white/15 shadow-2xl bg-black group">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Fullscreen Trigger */}
              <button
                onClick={() => setIsFullscreenImage(true)}
                className="absolute bottom-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-white hover:text-[#D4AF37] hover:bg-black transition-all shadow-lg"
                title="View Fullscreen Master"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Top Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-xs font-mono tracking-widest uppercase bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/10">
                  {artwork.medium}
                </span>
              </div>
            </div>
          </div>

          {/* Master Resolution & Verification Spec Strip */}
          <div className="p-4 rounded-2xl bg-[#0E0E14] border border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs font-mono">
            <div>
              <span className="text-[#5E5E68] block uppercase text-[10px]">Master Resolution</span>
              <span className="text-white font-semibold">{artwork.dimensions || '7680 x 4320 px'}</span>
            </div>
            <div>
              <span className="text-[#5E5E68] block uppercase text-[10px]">Storage Standard</span>
              <span className="text-[#00F5D4] font-semibold">IPFS Dec-Pinned</span>
            </div>
            <div>
              <span className="text-[#5E5E68] block uppercase text-[10px]">Token Standard</span>
              <span className="text-white font-semibold">ERC-721 + EIP-2981</span>
            </div>
            <div>
              <span className="text-[#5E5E68] block uppercase text-[10px]">Creator Royalty</span>
              <span className="text-[#D4AF37] font-semibold">7.5% Perpetual</span>
            </div>
          </div>

          {/* Curator's Notes Monograph */}
          <div className="p-6 md:p-8 rounded-3xl glass-panel bg-[#0B0B0F] border border-white/10 space-y-4">
            <h3 className="font-editorial text-lg font-bold text-[#F5F5F7] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              CURATOR'S MONOGRAPH & NOTES
            </h3>
            <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed italic">
              "{artwork.curatorNotes}"
            </p>
          </div>
        </div>

        {/* Right Column: Information, Pricing, Provenance */}
        <div className="lg:col-span-5 space-y-8">
          {/* Title & Artist Block */}
          <div className="space-y-3 border-b border-white/10 pb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                EDITION {artwork.edition.current} / {artwork.edition.total}
              </span>
              <span className="text-xs font-mono text-[#5E5E68]">TOKEN #{artwork.tokenId}</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#F5F5F7] tracking-tight leading-tight">
              {artwork.title}
            </h1>

            {artwork.subtitle && (
              <p className="text-sm font-mono text-[#9E9EA7]">{artwork.subtitle}</p>
            )}

            {/* Artist Bar */}
            <div
              onClick={() => navigate('creator-detail', artwork.creator.id)}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#D4AF37]/40 cursor-pointer transition-all mt-4"
            >
              <img
                src={artwork.creator.avatar}
                alt={artwork.creator.name}
                className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]/30"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Created By</span>
                <h4 className="font-editorial text-sm font-bold text-white flex items-center gap-1.5 truncate">
                  {artwork.creator.name}
                  {artwork.creator.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </h4>
              </div>
              <span className="text-xs font-mono text-[#D4AF37] hover:underline">Dossier →</span>
            </div>
          </div>

          {/* Pricing & Acquisition Stage */}
          <div className="p-6 rounded-3xl glass-card border border-[#D4AF37]/30 bg-gradient-to-b from-[#14141E] to-[#0A0A0E] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#9E9EA7] uppercase block">
                  {artwork.isLiveAuction ? 'Current Highest Bid' : 'Acquisition Price'}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#D4AF37]">
                    {artwork.isLiveAuction && artwork.highestBid ? artwork.highestBid : artwork.price} ETH
                  </span>
                  <span className="text-xs text-[#9E9EA7] font-mono">
                    ≈ ${((artwork.isLiveAuction && artwork.highestBid ? artwork.highestBid : artwork.price) * 3450).toLocaleString()} USD
                  </span>
                </div>
              </div>

              {artwork.isLiveAuction && (
                <div className="text-right">
                  <span className="badge-live">
                    <span className="pulse-dot" /> AUCTION LIVE
                  </span>
                  <span className="text-[11px] font-mono text-[#9E9EA7] block mt-1">Ends in 2d 14h</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isOwner ? (
              <div className="p-4 rounded-2xl bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-sm font-display font-bold text-[#00F5D4]">
                  <Check className="w-4 h-4" />
                  <span>SECURED IN YOUR VAULT</span>
                </div>
                <p className="text-xs text-[#9E9EA7]">
                  You are the verified on-chain owner of Token #{artwork.tokenId}.
                </p>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setModalMode('buy')}
                  className="w-full btn-primary py-4 text-sm font-bold shadow-lg"
                >
                  <span>COLLECT NOW — {artwork.price} ETH</span>
                </button>

                {artwork.isLiveAuction && (
                  <button
                    onClick={() => setModalMode('bid')}
                    className="w-full btn-secondary py-3.5 text-xs font-bold"
                  >
                    <Gavel className="w-4 h-4 text-[#D4AF37]" />
                    <span>PLACE CRYPTOGRAPHIC BID</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* About The Work */}
          <div className="space-y-3 border-b border-white/10 pb-6">
            <h3 className="font-editorial text-base font-bold text-white uppercase tracking-wider">
              ABOUT THE WORK
            </h3>
            <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed">
              {artwork.description}
            </p>
          </div>

          {/* Technical On-Chain Details Grid */}
          <div className="space-y-3 border-b border-white/10 pb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-base font-bold text-white uppercase tracking-wider">
                DETAILS
              </h3>
              <button
                onClick={() => setIsProvenanceOpen(true)}
                className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>RAW PROOF JSON</span>
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-[#5E5E68]">Blockchain</span>
                <span className="text-[#F5F5F7] font-semibold">{artwork.blockchain}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-[#5E5E68]">Token ID</span>
                <span className="text-[#D4AF37] font-semibold">#{artwork.tokenId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-[#5E5E68]">Edition Size</span>
                <span className="text-[#F5F5F7]">{artwork.edition.total} Master Editions</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-[#5E5E68]">Created</span>
                <span className="text-[#F5F5F7]">{artwork.createdYear}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-[#5E5E68]">Smart Contract</span>
                <a
                  href={`https://etherscan.io/address/${artwork.contractAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <span>{artwork.contractAddress.substring(0, 8)}...{artwork.contractAddress.substring(artwork.contractAddress.length - 6)}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* OWNERSHIP & PROVENANCE HISTORY */}
          <div className="space-y-4">
            <h3 className="font-editorial text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              OWNERSHIP HISTORY
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {artwork.provenance.map((prov: ProvenanceRecord) => (
                <div key={prov.id} className="relative space-y-1">
                  <div className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-black" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-semibold text-white uppercase tracking-wider">
                      {prov.event}
                    </span>
                    <span className="text-[11px] font-mono text-[#5E5E68]">{prov.date}</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#9E9EA7] flex items-center gap-2">
                    <span>
                      {prov.from.substring(0, 6)}...{prov.from.substring(prov.from.length - 4)}
                    </span>
                    {prov.to && (
                      <>
                        <span className="text-[#D4AF37]">→</span>
                        <span>
                          {prov.to.substring(0, 6)}...{prov.to.substring(prov.to.length - 4)}
                        </span>
                      </>
                    )}
                    {prov.price ? (
                      <span className="text-[#D4AF37] font-semibold ml-auto">{prov.price} ETH</span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Works Section */}
      {otherWorksByArtist.length > 0 && (
        <div className="pt-16 border-t border-white/10 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                FROM THE SAME ATELIER
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5F5F7]">
                MORE BY {artwork.creator.name.toUpperCase()}
              </h2>
            </div>
            <button
              onClick={() => navigate('creator-detail', artwork.creator.id)}
              className="text-xs font-mono text-[#D4AF37] hover:underline"
            >
              View All Monograph →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherWorksByArtist.map((otherArt: NFTArtwork) => (
              <NFTCard
                key={otherArt.id}
                artwork={otherArt}
                onSelect={(id: string) => navigate('nft', id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Master Modal */}
      {isFullscreenImage && (
        <div
          onClick={() => setIsFullscreenImage(false)}
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in"
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            className="max-h-[92vh] max-w-[92vw] object-contain rounded-xl shadow-2xl border border-white/15"
          />
          <span className="absolute top-6 right-6 text-xs font-mono text-white/60 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
            Click anywhere to close master viewer
          </span>
        </div>
      )}

      {/* Collect / Bid Modal */}
      {modalMode && (
        <CollectModal
          artwork={artwork}
          mode={modalMode}
          onClose={() => setModalMode(null)}
        />
      )}

      {/* Provenance Raw Metadata Modal */}
      {isProvenanceOpen && (
        <ProvenanceModal
          artwork={artwork}
          onClose={() => setIsProvenanceOpen(false)}
        />
      )}
    </div>
  );
};
