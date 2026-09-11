import React from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { CheckCircle2, AlertCircle, Info, X, ExternalLink } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast, wallet } = useWeb3();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-[#00F5D4] flex-shrink-0" />;
            case 'error':
              return <AlertCircle className="w-5 h-5 text-[#FF5555] flex-shrink-0" />;
            case 'warning':
              return <AlertCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-[#9E9EA7] flex-shrink-0" />;
          }
        };

        const getBorder = () => {
          switch (toast.type) {
            case 'success':
              return 'border-[#00F5D4]/40 shadow-[0_0_20px_rgba(0,245,212,0.15)]';
            case 'error':
              return 'border-[#FF5555]/40 shadow-[0_0_20px_rgba(255,85,85,0.15)]';
            case 'warning':
              return 'border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.15)]';
            default:
              return 'border-white/10';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-xl bg-[#0E0E14]/95 backdrop-blur-xl border ${getBorder()} transition-all duration-300 animate-in slide-in-from-right`}
          >
            <div className="mt-0.5">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">{toast.title}</h4>
              <p className="text-xs text-[#9E9EA7] mt-0.5 leading-relaxed">{toast.message}</p>
              {toast.txHash && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#D4AF37] hover:underline cursor-pointer">
                  <span>Tx: {toast.txHash.substring(0, 10)}...{toast.txHash.substring(toast.txHash.length - 8)}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#5E5E68] hover:text-[#F5F5F7] transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
