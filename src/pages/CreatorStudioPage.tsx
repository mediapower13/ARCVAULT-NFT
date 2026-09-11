import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ArtworkMedium, Collection } from '../types';
import {
  Upload,
  Sparkles,
  ShieldCheck,
  Zap,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  HardDrive,
  FileCode,
  ArrowRight
} from 'lucide-react';

interface CreatorStudioPageProps {
  navigate: (route: string, id?: string) => void;
}

export const CreatorStudioPage: React.FC<CreatorStudioPageProps> = ({ navigate }) => {
  const { collections, createArtworkInStudio, wallet, openWalletModal } = useWeb3();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [curatorNotes, setCuratorNotes] = useState('');
  const [medium, setMedium] = useState<ArtworkMedium>('Architectural 3D');
  const [price, setPrice] = useState('1.25');
  const [totalEditions, setTotalEditions] = useState('25');
  const [collectionId, setCollectionId] = useState(collections[0]?.id || 'col-monolithic-voids');
  const [imagePreview, setImagePreview] = useState('/artworks/architecture_of_light.jpg');
  const [attributes, setAttributes] = useState<{ trait_type: string; value: string }[]>([
    { trait_type: 'Material', value: 'Obsidian Monolith' },
    { trait_type: 'Render Engine', value: 'Octane 8K Master' }
  ]);

  const presetArtworks = [
    { label: 'Brutalist Monolith', url: '/artworks/architecture_of_light.jpg' },
    { label: 'Obsidian Liquid Chrome', url: '/artworks/form_void_sculpture.jpg' },
    { label: 'Quantum Generative Filaments', url: '/artworks/chronos_generative.jpg' },
    { label: 'Event Horizon Desert', url: '/artworks/the_last_horizon.jpg' },
    { label: 'Neoclassical Bust', url: '/artworks/neoclassical_synthesis.jpg' },
    { label: 'Spatial Waveform', url: '/artworks/spatial_acoustics.jpg' }
  ];

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { trait_type: '', value: '' }]);
  };

  const handleRemoveAttribute = (idx: number) => {
    setAttributes(attributes.filter((_, i) => i !== idx));
  };

  const handleAttributeChange = (idx: number, field: 'trait_type' | 'value', val: string) => {
    const updated = [...attributes];
    updated[idx][field] = val;
    setAttributes(updated);
  };

  const handleMintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.connected) {
      openWalletModal();
      return;
    }

    if (!title) {
      alert('Please provide a title for your artwork');
      return;
    }

    const priceNum = parseFloat(price);
    const editionsNum = parseInt(totalEditions, 10);

    const result = await createArtworkInStudio({
      title,
      subtitle,
      description: description || 'Contemporary digital exploration.',
      curatorNotes: curatorNotes || 'Authenticated on ARCVAULT.',
      price: isNaN(priceNum) ? 1.0 : priceNum,
      medium,
      image: imagePreview,
      totalEditions: isNaN(editionsNum) ? 25 : editionsNum,
      collectionId,
      attributes: attributes.filter((a) => a.trait_type && a.value)
    });

    if (result.success) {
      navigate('nft', result.artworkId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
          ATELIER MINTING STUDIO
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
          DEPLOY ON-CHAIN ARTWORK
        </h1>
        <p className="text-xs sm:text-sm text-[#9E9EA7] max-w-xl leading-relaxed">
          Upload master media, pin decentralized metadata to IPFS, configure EIP-2981 perpetual royalties, and mint ERC-721 tokens.
        </p>
      </div>

      <form onSubmit={handleMintSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Artwork Media */}
          <div className="p-6 rounded-3xl glass-panel bg-[#0B0B10] border border-white/10 space-y-5">
            <h3 className="font-editorial text-lg font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#D4AF37]" />
              1. MASTER ASSET & MEDIA
            </h3>

            {/* Upload Area & Sample Presets */}
            <div className="space-y-4">
              <div className="relative border-2 border-dashed border-white/15 hover:border-[#D4AF37]/60 rounded-2xl p-6 text-center cursor-pointer transition-colors group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <Upload className="w-8 h-8 text-[#9E9EA7] group-hover:text-[#D4AF37] mx-auto mb-2 transition-colors" />
                <p className="text-xs font-semibold text-white">Click or drag & drop high-res artwork master</p>
                <p className="text-[11px] text-[#5E5E68] mt-1">PNG, JPG, WEBP, MP4 (Up to 100MB 8K Master)</p>
              </div>

              {/* Sample Quick Selectors */}
              <div>
                <span className="text-[11px] font-mono text-[#5E5E68] uppercase block mb-2">
                  Or Select Curated Master Template:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {presetArtworks.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImagePreview(preset.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                        imagePreview === preset.url
                          ? 'border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)] scale-105'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                      title={preset.label}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Details & Monograph */}
          <div className="p-6 rounded-3xl glass-panel bg-[#0B0B10] border border-white/10 space-y-4">
            <h3 className="font-editorial text-lg font-bold text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#00F5D4]" />
              2. CURATORIAL METADATA
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="text-[#9E9EA7] font-mono uppercase block mb-1">Artwork Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Architecture of Light"
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="text-[#9E9EA7] font-mono uppercase block mb-1">Subtitle / Sub-series</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Study in Monumental Suspension No. 04"
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#9E9EA7] font-mono uppercase block mb-1">Medium Classification</label>
                  <select
                    value={medium}
                    onChange={(e) => setMedium(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white focus:border-[#D4AF37] outline-none font-mono text-xs"
                  >
                    <option value="Architectural 3D">Architectural 3D</option>
                    <option value="Digital Sculpture">Digital Sculpture</option>
                    <option value="Generative Code">Generative Code</option>
                    <option value="Audiovisual">Audiovisual</option>
                    <option value="Minimalist 3D">Minimalist 3D</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#9E9EA7] font-mono uppercase block mb-1">Collection</label>
                  <select
                    value={collectionId}
                    onChange={(e) => setCollectionId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white focus:border-[#D4AF37] outline-none font-mono text-xs"
                  >
                    {collections.map((col: Collection) => (
                      <option key={col.id} value={col.id}>{col.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#9E9EA7] font-mono uppercase block mb-1">Artwork Statement & Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the conceptual themes, lighting study, and computational methodology..."
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white focus:border-[#D4AF37] outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[#9E9EA7] font-mono uppercase block mb-1">Curator's Exhibition Notes</label>
                <textarea
                  rows={2}
                  value={curatorNotes}
                  onChange={(e) => setCuratorNotes(e.target.value)}
                  placeholder="e.g. Exhibited at ARCVAULT Genesis Exhibition 2026."
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white focus:border-[#D4AF37] outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Financials & Royalties */}
          <div className="p-6 rounded-3xl glass-panel bg-[#0B0B10] border border-white/10 space-y-4">
            <h3 className="font-editorial text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              3. SMART CONTRACT & ECONOMICS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="text-[#9E9EA7] uppercase block mb-1">Acquisition Price (ETH)</label>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white focus:border-[#D4AF37] outline-none font-bold text-sm"
                />
              </div>

              <div>
                <label className="text-[#9E9EA7] uppercase block mb-1">Edition Scarcity (Total Supply)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={totalEditions}
                  onChange={(e) => setTotalEditions(e.target.value)}
                  className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-white focus:border-[#D4AF37] outline-none font-bold text-sm"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-[#9E9EA7]">
                <span>Creator Perpetual Royalty (EIP-2981):</span>
                <span className="text-[#D4AF37] font-bold">7.50%</span>
              </div>
              <div className="flex justify-between text-[#9E9EA7]">
                <span>Gas Sponsorship:</span>
                <span className="text-[#00F5D4] font-bold">Optimized ERC-721A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview & Action Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 space-y-6">
            <h3 className="font-editorial text-sm font-bold text-[#9E9EA7] uppercase tracking-wider">
              LIVE ON-CHAIN CARD PREVIEW
            </h3>

            {/* Live Rendered Card */}
            <div className="rounded-3xl overflow-hidden glass-card border border-[#D4AF37]/50 p-4 bg-black/90 shadow-2xl space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono uppercase bg-black/70 px-2.5 py-1 rounded text-white border border-white/10 backdrop-blur-md">
                    EDITION 1 / {totalEditions || 25}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-mono uppercase bg-black/70 px-2 py-0.5 rounded text-[#D4AF37] border border-white/10 backdrop-blur-md">
                    {medium}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-editorial text-xl font-bold text-white truncate">
                  {title || 'Untitled Masterpiece'}
                </h4>
                <p className="text-xs text-[#9E9EA7] line-clamp-2">
                  {description || 'Curated digital artwork on Ethereum ERC-721.'}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Acquisition</span>
                    <span className="font-display font-bold text-lg text-[#D4AF37]">{price || 1.0} ETH</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#00F5D4] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ERC-721 Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full btn-primary py-4 text-sm font-bold shadow-2xl flex items-center justify-center gap-2"
            >
              {wallet.connected ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>SIGN & DEPLOY TO SMART CONTRACT</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>CONNECT WALLET TO MINT</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-[#5E5E68]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Permanent IPFS Pinning + EIP-712 Signature</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
