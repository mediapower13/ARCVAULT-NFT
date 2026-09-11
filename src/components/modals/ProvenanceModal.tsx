import React, { useState } from 'react';
import { NFTArtwork } from '../../types';
import { X, Check, Copy, Shield, FileCode, HardDrive, ExternalLink } from 'lucide-react';

interface ProvenanceModalProps {
  artwork: NFTArtwork | null;
  onClose: () => void;
}

export const ProvenanceModal: React.FC<ProvenanceModalProps> = ({ artwork, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!artwork) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const rawMetadata = {
    name: artwork.title,
    description: artwork.description,
    image: artwork.ipfsHash,
    external_url: `https://arcvault.art/artwork/${artwork.id}`,
    edition: artwork.edition,
    attributes: artwork.attributes,
    compiler: 'ARCVAULT Protocol v2.4 (Solidity 0.8.24)',
    standard: 'ERC-721 + EIP-2981 Multi-Receiver Royalty',
    royalty_recipient: artwork.contractAddress,
    royalty_fraction: '750 (7.5%)',
    sha256_fingerprint: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel p-6 md:p-8 bg-[#0B0B0F]/95 border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-editorial font-bold text-[#F5F5F7]">
                CRYPTOGRAPHIC PROVENANCE & METADATA
              </h3>
              <p className="text-xs text-[#9E9EA7]">
                Verified immutable ledger records for Token #{artwork.tokenId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#9E9EA7] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto space-y-6 my-4 pr-1">
          {/* Hashes & Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#9E9EA7]">
              On-Chain Cryptographic Proofs
            </h4>

            {/* IPFS CID */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9E9EA7] flex items-center gap-1.5 font-mono">
                  <HardDrive className="w-3.5 h-3.5 text-[#D4AF37]" />
                  IPFS Decentralized Storage Hash
                </span>
                <button
                  onClick={() => copyToClipboard(artwork.ipfsHash, 'ipfs')}
                  className="flex items-center gap-1 text-[11px] text-[#D4AF37] hover:underline font-mono"
                >
                  {copiedKey === 'ipfs' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'ipfs' ? 'Copied' : 'Copy CID'}
                </button>
              </div>
              <div className="font-mono text-xs text-[#F5F5F7] break-all bg-white/5 p-2 rounded">
                {artwork.ipfsHash}
              </div>
            </div>

            {/* Smart Contract */}
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9E9EA7] flex items-center gap-1.5 font-mono">
                  <FileCode className="w-3.5 h-3.5 text-[#00F5D4]" />
                  Verified Smart Contract (ERC-721)
                </span>
                <button
                  onClick={() => copyToClipboard(artwork.contractAddress, 'contract')}
                  className="flex items-center gap-1 text-[11px] text-[#D4AF37] hover:underline font-mono"
                >
                  {copiedKey === 'contract' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'contract' ? 'Copied' : 'Copy Address'}
                </button>
              </div>
              <div className="font-mono text-xs text-[#F5F5F7] break-all bg-white/5 p-2 rounded">
                {artwork.contractAddress}
              </div>
            </div>
          </div>

          {/* Raw JSON Spec */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#9E9EA7]">
                EIP-721 Master Metadata JSON
              </h4>
              <button
                onClick={() => copyToClipboard(JSON.stringify(rawMetadata, null, 2), 'json')}
                className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline font-mono"
              >
                {copiedKey === 'json' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedKey === 'json' ? 'Copied JSON' : 'Copy JSON'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-black/70 border border-white/10 text-xs font-mono text-[#00F5D4] overflow-x-auto leading-relaxed max-h-60">
              {JSON.stringify(rawMetadata, null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#9E9EA7] flex-shrink-0">
          <span>Decentralized Proof: Verified by Ethereum Consensus</span>
          <button
            onClick={onClose}
            className="btn-secondary py-2 px-4 text-xs"
          >
            Close Provenance Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
