import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { CuratedDrop, DropPhase } from '../types';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  Check,
  Layers,
  Calendar,
  Gift,
  Flame,
  Minus,
  Plus
} from 'lucide-react';

interface DropsPageProps {
  navigate: (route: string, id?: string) => void;
}

export const DropsPage: React.FC<DropsPageProps> = ({ navigate }) => {
  const { drops, wallet, mintDrop, openWalletModal } = useWeb3();
  const [mintQuantity, setMintQuantity] = useState<{ [dropId: string]: number }>({
    'drop-architecture-light': 1,
    'drop-form-void': 1
  });

  const handleQuantityChange = (dropId: string, delta: number) => {
    setMintQuantity((prev) => {
      const current = prev[dropId] || 1;
      const updated = Math.max(1, Math.min(3, current + delta));
      return { ...prev, [dropId]: updated };
    });
  };

  const handleMint = async (drop: CuratedDrop) => {
    if (!wallet.connected) {
      openWalletModal();
      return;
    }
    const count = mintQuantity[drop.id] || 1;
    await mintDrop(drop.id, count);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 text-left">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
          EXCLUSIVE ON-CHAIN LAUNCHPAD
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] tracking-tight">
          CURATED DROPS
        </h1>
        <p className="text-xs sm:text-sm text-[#9E9EA7] max-w-xl leading-relaxed">
          Limited-edition digital series directly released by curated artists.
          Mint authenticated ERC-721 tokens with verifiable provenance and physical archival entitlements.
        </p>
      </div>

      {/* Drops Roster */}
      <div className="space-y-16">
        {drops.map((drop: CuratedDrop) => {
          const isLive = drop.status === 'live';
          const count = mintQuantity[drop.id] || 1;
          const totalCost = (drop.mintPrice * count).toFixed(2);
          const percentMinted = ((drop.mintedEditions / drop.totalEditions) * 100).toFixed(0);

          return (
            <div
              key={drop.id}
              className={`relative rounded-3xl overflow-hidden glass-panel border ${
                isLive ? 'border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.12)]' : 'border-white/10'
              } bg-[#0A0A0E] p-6 sm:p-10 md:p-12`}
            >
              {/* Corner Ambient Glow for Live Drop */}
              {isLive && (
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Drop Visual Showcase */}
                <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 group">
                  <img
                    src={drop.coverImage}
                    alt={drop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Status Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    {isLive ? (
                      <span className="badge-live backdrop-blur-md">
                        <span className="pulse-dot" /> LIVE PUBLIC MINT
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 border border-white/20 text-white backdrop-blur-md flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> UPCOMING RELEASE
                      </span>
                    )}

                    <span className="text-xs font-mono text-white bg-black/70 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                      {drop.totalEditions} EDITIONS
                    </span>
                  </div>

                  {/* Bottom Artist Strip */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                      <img
                        src={drop.creator.avatar}
                        alt={drop.creator.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-white">{drop.creator.name}</span>
                    </div>
                  </div>
                </div>

                {/* Drop Action & Mint Console */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                      {isLive ? 'ACTIVE SERIES' : 'SCHEDULED DROP'}
                    </span>
                    <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-[#F5F5F7] tracking-tight mt-1">
                      {drop.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#9E9EA7] leading-relaxed mt-2">
                      {drop.curatorStatement}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                      Curatorial Inclusions
                    </span>
                    {drop.highlights.map((h: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#9E9EA7]">
                        <Check className="w-3.5 h-3.5 text-[#00F5D4] flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Phases Table */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-[#9E9EA7] uppercase tracking-wider">
                      Minting Schedule & Tiers
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {drop.phases.map((phase: DropPhase, pidx: number) => (
                        <div
                          key={pidx}
                          className={`p-3 rounded-xl border text-xs ${
                            phase.status === 'active'
                              ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white'
                              : 'bg-black/40 border-white/5 text-[#5E5E68]'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span>{phase.name}</span>
                            <span className="text-[#D4AF37]">{phase.price} ETH</span>
                          </div>
                          <div className="text-[11px] text-[#9E9EA7] mt-0.5">
                            Max {phase.maxPerWallet} per wallet • {phase.startsAt}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Progress Bar (if live) */}
                  {isLive && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#9E9EA7]">Total Allocated Editions</span>
                        <span className="text-[#D4AF37] font-bold">
                          {drop.mintedEditions} / {drop.totalEditions} ({percentMinted}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF6D6] to-[#00F5D4] rounded-full transition-all duration-1000"
                          style={{ width: `${percentMinted}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Mint Interaction Console */}
                  {isLive ? (
                    <div className="p-5 rounded-2xl bg-[#12121A] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Select Quantity</span>
                          <div className="flex items-center gap-3 mt-1">
                            <button
                              onClick={() => handleQuantityChange(drop.id, -1)}
                              disabled={count <= 1}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono text-base font-bold text-white w-6 text-center">{count}</span>
                            <button
                              onClick={() => handleQuantityChange(drop.id, 1)}
                              disabled={count >= 2}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs text-[#5E5E68]">(Max 2)</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-mono text-[#5E5E68] uppercase block">Total Cost</span>
                          <span className="font-display font-extrabold text-2xl text-[#D4AF37]">
                            {totalCost} ETH
                          </span>
                          <span className="text-[11px] text-[#9E9EA7] font-mono block">
                            ≈ ${(parseFloat(totalCost) * 3450).toLocaleString()} USD
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleMint(drop)}
                        className="w-full btn-primary py-4 text-sm font-bold shadow-xl"
                      >
                        {wallet.connected ? (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>MINT {count} EDITION(S) ON-CHAIN</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            <span>CONNECT WALLET TO MINT</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    /* Upcoming drop countdown teaser */
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-mono text-[#D4AF37] uppercase">Opening On</span>
                        <h4 className="font-editorial text-lg font-bold text-white">{drop.releaseDate}</h4>
                      </div>
                      <button
                        onClick={() => alert(`You will be notified for the ${drop.title} allowlist!`)}
                        className="btn-secondary text-xs"
                      >
                        Remind Me
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
