import React from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { Loader2, KeyRound, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const TransactionModal: React.FC = () => {
  const { isTxProcessing, activeTxDetails, wallet } = useWeb3();

  if (!isTxProcessing || !activeTxDetails) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel p-8 bg-[#0D0D12] border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] text-center overflow-hidden">
        {/* Animated Radial Pulse */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#00F5D4]/10 rounded-full blur-3xl animate-pulse" />

        {/* Step Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
          {activeTxDetails.step === 'signature' && (
            <KeyRound className="w-9 h-9 text-[#D4AF37] animate-bounce" />
          )}
          {activeTxDetails.step === 'confirming' && (
            <Loader2 className="w-9 h-9 text-[#00F5D4] animate-spin" />
          )}
          {activeTxDetails.step === 'success' && (
            <Sparkles className="w-9 h-9 text-[#D4AF37]" />
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-editorial font-bold text-[#F5F5F7] tracking-wide mb-2">
          {activeTxDetails.title}
        </h3>
        <p className="text-sm text-[#9E9EA7] leading-relaxed mb-6">
          {activeTxDetails.subtitle || 'Please review and authorize the transaction on your keypair provider.'}
        </p>

        {/* Progress Tracker */}
        <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5 text-left text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[#9E9EA7]">Network</span>
            <span className="text-[#F5F5F7] font-semibold">{wallet.network}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#9E9EA7]">Gas Estimate</span>
            <span className="text-[#D4AF37]">~0.0014 ETH ($4.83)</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-[#9E9EA7]">Status</span>
            <span className="text-[#00F5D4] flex items-center gap-1.5 font-bold">
              <span className="pulse-dot" />
              {activeTxDetails.step === 'signature' ? 'Waiting for Signature' : 'Broadcasting Tx...'}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#5E5E68]">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>EIP-712 Typed Data Verification</span>
        </div>
      </div>
    </div>
  );
};
