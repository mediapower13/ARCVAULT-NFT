import React, { useState } from 'react';
import { ShieldCheck, ArrowUpRight, Check } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#050507] border-t border-white/10 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Col 1 & 2: Manifesto & Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8A6D1B] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#08080A] rounded-[6px] flex items-center justify-center font-editorial font-bold text-[#D4AF37] text-base">
                  ▲
                </div>
              </div>
              <span className="font-editorial text-xl font-bold tracking-[0.2em] text-[#F5F5F7]">
                ARCVAULT
              </span>
            </div>
            <p className="text-xs text-[#9E9EA7] leading-relaxed max-w-sm">
              ARCVAULT is a curated platform for museum-grade digital artworks and on-chain ownership.
              Minting, authenticating, collecting, and trading digital culture backed by cryptographic consensus.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-[#D4AF37] pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>ERC-721 Immutable Protocol • EIP-2981 Multi-Royalty</span>
            </div>
          </div>

          {/* Col 3: Curation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F5F7]">Curation</h4>
            <ul className="space-y-2 text-xs text-[#9E9EA7]">
              <li>
                <button onClick={() => navigate('explore')} className="hover:text-[#D4AF37] transition-colors">
                  Explore Exhibition
                </button>
              </li>
              <li>
                <button onClick={() => navigate('drops')} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <span>Curated Drops</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00F5D4]/20 text-[#00F5D4] font-mono">LIVE</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('collections')} className="hover:text-[#D4AF37] transition-colors">
                  Collections Monograph
                </button>
              </li>
              <li>
                <button onClick={() => navigate('creators')} className="hover:text-[#D4AF37] transition-colors">
                  Verified Creators
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F5F7]">Protocol</h4>
            <ul className="space-y-2 text-xs text-[#9E9EA7]">
              <li>
                <button onClick={() => navigate('studio')} className="hover:text-[#D4AF37] transition-colors">
                  Creator Studio & Minting
                </button>
              </li>
              <li>
                <button onClick={() => navigate('vault')} className="hover:text-[#D4AF37] transition-colors">
                  Collector Vault
                </button>
              </li>
              <li>
                <a
                  href="https://etherscan.io"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                >
                  <span>Smart Contract (Sepolia)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ipfs.tech"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                >
                  <span>IPFS Decentralized Storage</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Drop Alerts */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F5F7]">Drop Alerts</h4>
            <p className="text-xs text-[#9E9EA7]">
              Receive private salon invitations and early drop allowlist allocations.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="curator@vault.art"
                  required
                  className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-[#5E5E68] focus:border-[#D4AF37] outline-none font-sans"
                />
              </div>
              <button
                type="submit"
                disabled={subscribed}
                className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white text-xs font-display font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00F5D4]" />
                    <span>INVITATION ALLOCATED</span>
                  </>
                ) : (
                  <span>REQUEST SALON ACCESS</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5E5E68]">
          <p>© 2026 ARCVAULT Protocol. All rights reserved. Curated digital assets on Ethereum.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>NON-CUSTODIAL</span>
            <span>IMMUTABLE PROVENANCE</span>
            <span>EIP-2981 ROYALTY ENFORCED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
