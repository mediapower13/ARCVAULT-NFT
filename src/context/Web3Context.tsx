import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserWallet,
  BlockchainNetwork,
  NFTArtwork,
  Collection,
  CuratedDrop,
  Creator,
  ProvenanceRecord
} from '../types';
import {
  mockArtworks,
  mockCollections,
  mockDrops,
  mockCreators,
  ETH_PRICE_USD
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  txHash?: string;
  timestamp: number;
}

export type WalletType =
  | 'MetaMask'
  | 'Coinbase'
  | 'Phantom'
  | 'Rabby'
  | 'Rainbow'
  | 'Injected'
  | 'WalletConnect'
  | 'Demo';

interface Web3ContextType {
  wallet: UserWallet;
  artworks: NFTArtwork[];
  collections: Collection[];
  drops: CuratedDrop[];
  creators: Creator[];
  toasts: ToastNotification[];
  isWalletModalOpen: boolean;
  isTxProcessing: boolean;
  activeTxDetails: { title: string; subtitle?: string; step: 'signature' | 'confirming' | 'success' } | null;
  openWalletModal: () => void;
  closeWalletModal: () => void;
  connectWallet: (type: WalletType) => Promise<boolean>;
  disconnectWallet: () => void;
  switchNetwork: (network: BlockchainNetwork) => Promise<void>;
  adjustBalance: (newBalance: number) => void;
  collectArtwork: (artworkId: string) => Promise<{ success: boolean; txHash?: string }>;
  placeBid: (artworkId: string, amount: number) => Promise<{ success: boolean; txHash?: string }>;
  mintDrop: (dropId: string, count: number) => Promise<{ success: boolean; txHash?: string; artworkIds?: string[] }>;
  createArtworkInStudio: (artworkData: {
    title: string;
    subtitle?: string;
    description: string;
    curatorNotes: string;
    price: number;
    medium: any;
    image: string;
    totalEditions: number;
    collectionId: string;
    attributes: { trait_type: string; value: string }[];
  }) => Promise<{ success: boolean; artworkId: string; txHash: string }>;
  dismissToast: (id: string) => void;
  isExtensionDetected: (type: WalletType) => boolean;
}

const CHAIN_IDS: { [key in BlockchainNetwork]: string } = {
  Ethereum: '0x1',
  Sepolia: '0xaa36a7',
  Base: '0x2105',
  Arbitrum: '0xa4b1',
  Polygon: '0x89'
};

const CHAIN_ID_TO_NETWORK: { [key: string]: BlockchainNetwork } = {
  '0x1': 'Ethereum',
  '0xaa36a7': 'Sepolia',
  '11155111': 'Sepolia',
  '0x2105': 'Base',
  '8453': 'Base',
  '0xa4b1': 'Arbitrum',
  '42161': 'Arbitrum',
  '0x89': 'Polygon',
  '137': 'Polygon'
};

const NETWORK_PARAMS: { [key in BlockchainNetwork]?: any } = {
  Sepolia: {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Test Network',
    nativeCurrency: { name: 'Sepolia ETH', symbol: 'SEP', decimals: 18 },
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io']
  },
  Base: {
    chainId: '0x2105',
    chainName: 'Base Mainnet',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.base.org'],
    blockExplorerUrls: ['https://basescan.org']
  },
  Arbitrum: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum One',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io']
  },
  Polygon: {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com']
  }
};

const DEFAULT_WALLET: UserWallet = {
  address: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
  shortAddress: '0x82f9...491A',
  balanceETH: 6.85,
  balanceUSD: 6.85 * ETH_PRICE_USD,
  network: 'Ethereum',
  connected: false,
  isRealProvider: false,
  walletType: null,
  collectedNFTs: [],
  createdNFTs: [],
  activeBids: [],
  transactionHistory: [
    {
      id: 'tx-init-1',
      type: 'Mint',
      title: 'Monolithic Voids Genesis Contract',
      txHash: '0x9a3e201bfa8295c9a2c358051e247854619ba0429f43a0d5c074e64f7b231da9',
      date: '2026-03-01 14:22:08 UTC',
      status: 'confirmed'
    }
  ]
};

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<UserWallet>(() => {
    const saved = localStorage.getItem('arcvault_wallet');
    return saved ? JSON.parse(saved) : DEFAULT_WALLET;
  });

  const [artworks, setArtworks] = useState<NFTArtwork[]>(() => {
    const saved = localStorage.getItem('arcvault_artworks');
    return saved ? JSON.parse(saved) : mockArtworks;
  });

  const [collections] = useState<Collection[]>(mockCollections);
  const [drops, setDrops] = useState<CuratedDrop[]>(() => {
    const saved = localStorage.getItem('arcvault_drops');
    return saved ? JSON.parse(saved) : mockDrops;
  });

  const [creators] = useState<Creator[]>(mockCreators);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isTxProcessing, setIsTxProcessing] = useState(false);
  const [activeTxDetails, setActiveTxDetails] = useState<{
    title: string;
    subtitle?: string;
    step: 'signature' | 'confirming' | 'success';
  } | null>(null);

  // Helper to detect specific provider
  const getProvider = (type: WalletType): any => {
    if (typeof window === 'undefined') return null;
    const anyWindow = window as any;

    if (type === 'Coinbase') {
      return anyWindow.coinbaseWalletExtension || (anyWindow.ethereum?.isCoinbaseWallet ? anyWindow.ethereum : null);
    }
    if (type === 'Phantom') {
      return anyWindow.phantom?.ethereum || anyWindow.phantom?.solana || (anyWindow.ethereum?.isPhantom ? anyWindow.ethereum : null);
    }
    if (type === 'Rabby') {
      return anyWindow.ethereum?.isRabby ? anyWindow.ethereum : null;
    }
    if (type === 'Rainbow') {
      return anyWindow.ethereum?.isRainbow ? anyWindow.ethereum : null;
    }
    if (type === 'MetaMask') {
      if (anyWindow.ethereum?.providers) {
        return anyWindow.ethereum.providers.find((p: any) => p.isMetaMask) || anyWindow.ethereum;
      }
      return anyWindow.ethereum?.isMetaMask ? anyWindow.ethereum : anyWindow.ethereum;
    }
    if (type === 'Injected') {
      return anyWindow.ethereum;
    }
    return anyWindow.ethereum || null;
  };

  const isExtensionDetected = (type: WalletType): boolean => {
    if (typeof window === 'undefined') return false;
    const anyWindow = window as any;
    if (type === 'MetaMask') return !!(anyWindow.ethereum?.isMetaMask || anyWindow.ethereum);
    if (type === 'Coinbase') return !!(anyWindow.coinbaseWalletExtension || anyWindow.ethereum?.isCoinbaseWallet);
    if (type === 'Phantom') return !!(anyWindow.phantom?.ethereum || anyWindow.phantom?.solana || anyWindow.ethereum?.isPhantom);
    if (type === 'Rabby') return !!anyWindow.ethereum?.isRabby;
    if (type === 'Rainbow') return !!anyWindow.ethereum?.isRainbow;
    if (type === 'Injected') return !!anyWindow.ethereum;
    return false;
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('arcvault_wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('arcvault_artworks', JSON.stringify(artworks));
  }, [artworks]);

  useEffect(() => {
    localStorage.setItem('arcvault_drops', JSON.stringify(drops));
  }, [drops]);

  // Handle provider events (account change, network change)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ethereum = (window as any).ethereum;

    if (ethereum && wallet.connected && wallet.isRealProvider) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          const address = accounts[0];
          const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
          let balanceETH = wallet.balanceETH;
          try {
            const balHex = await ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] });
            balanceETH = Number((parseInt(balHex, 16) / 1e18).toFixed(4));
          } catch (e) {}

          setWallet((prev) => ({
            ...prev,
            address,
            shortAddress,
            balanceETH: balanceETH > 0 ? balanceETH : prev.balanceETH,
            balanceUSD: (balanceETH > 0 ? balanceETH : prev.balanceETH) * ETH_PRICE_USD
          }));

          addToast({
            type: 'info',
            title: 'Account Switched',
            message: `Active address changed to ${shortAddress}`
          });
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        const net = CHAIN_ID_TO_NETWORK[chainIdHex.toLowerCase()] || 'Ethereum';
        setWallet((prev) => ({
          ...prev,
          network: net,
          chainId: chainIdHex
        }));
        addToast({
          type: 'info',
          title: 'Network Updated',
          message: `Wallet switched to ${net}`
        });
      };

      ethereum.on?.('accountsChanged', handleAccountsChanged);
      ethereum.on?.('chainChanged', handleChainChanged);

      return () => {
        ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
        ethereum.removeListener?.('chainChanged', handleChainChanged);
      };
    }
  }, [wallet.connected, wallet.isRealProvider]);

  const addToast = (toast: Omit<ToastNotification, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastNotification = {
      ...toast,
      id,
      timestamp: Date.now()
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      dismissToast(id);
    }, 6000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openWalletModal = () => setIsWalletModalOpen(true);
  const closeWalletModal = () => setIsWalletModalOpen(false);

  // Connect to Extension or Demo
  const connectWallet = async (type: WalletType): Promise<boolean> => {
    setIsTxProcessing(true);
    setActiveTxDetails({
      title: `Connecting to ${type}`,
      subtitle: 'Requesting permission from your browser extension / app...',
      step: 'signature'
    });

    try {
      const provider = getProvider(type);

      if (type !== 'Demo' && type !== 'WalletConnect' && provider) {
        // Real Injected Extension Connection (MetaMask, Coinbase, Phantom, Rabby, etc.)
        const accounts: string[] = await provider.request({ method: 'eth_requestAccounts' });

        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts authorized');
        }

        const address = accounts[0];
        const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

        // Fetch chain ID
        let currentNet: BlockchainNetwork = 'Ethereum';
        try {
          const chainIdHex = await provider.request({ method: 'eth_chainId' });
          if (CHAIN_ID_TO_NETWORK[chainIdHex.toLowerCase()]) {
            currentNet = CHAIN_ID_TO_NETWORK[chainIdHex.toLowerCase()];
          }
        } catch (e) {}

        // Fetch actual ETH balance
        let balanceETH = 4.5;
        try {
          const balHex = await provider.request({ method: 'eth_getBalance', params: [address, 'latest'] });
          const parsed = parseInt(balHex, 16) / 1e18;
          if (!isNaN(parsed) && parsed > 0) {
            balanceETH = Number(parsed.toFixed(4));
          }
        } catch (e) {}

        setWallet((prev) => ({
          ...prev,
          connected: true,
          isRealProvider: true,
          walletType: type,
          address,
          shortAddress,
          network: currentNet,
          balanceETH,
          balanceUSD: Number((balanceETH * ETH_PRICE_USD).toFixed(2))
        }));

        setIsTxProcessing(false);
        setActiveTxDetails(null);
        closeWalletModal();

        addToast({
          type: 'success',
          title: `${type} Connected`,
          message: `Verified on-chain session established with ${shortAddress}`
        });

        return true;
      } else {
        // Demo Vault Session / Simulation Mode or WalletConnect QR
        await new Promise((resolve) => setTimeout(resolve, 800));

        const demoAddress = '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A';
        setWallet((prev) => ({
          ...prev,
          connected: true,
          isRealProvider: false,
          walletType: type,
          address: demoAddress,
          shortAddress: '0x82f9...491A',
          balanceETH: prev.balanceETH > 0 ? prev.balanceETH : 6.85,
          balanceUSD: (prev.balanceETH > 0 ? prev.balanceETH : 6.85) * ETH_PRICE_USD
        }));

        setIsTxProcessing(false);
        setActiveTxDetails(null);
        closeWalletModal();

        addToast({
          type: 'success',
          title: `${type === 'Demo' ? 'Vault Session Active' : `${type} Connected`}`,
          message: 'Ready to mint, collect, and bid on ARCVAULT.'
        });

        return true;
      }
    } catch (err: any) {
      console.warn('Wallet connection cancelled or failed', err);
      setIsTxProcessing(false);
      setActiveTxDetails(null);

      // Fallback: If user rejects or has no extension, notify and offer simulation
      addToast({
        type: 'warning',
        title: 'Connection Notice',
        message: err.message || 'Extension connection cancelled. You can also connect via Simulated Vault.'
      });
      return false;
    }
  };

  const disconnectWallet = () => {
    setWallet((prev) => ({
      ...prev,
      connected: false,
      isRealProvider: false,
      walletType: null
    }));
    addToast({
      type: 'info',
      title: 'Wallet Disconnected',
      message: 'Your Web3 keypair session has been securely closed.'
    });
  };

  // Switch network with real extension request
  const switchNetwork = async (network: BlockchainNetwork) => {
    const targetChainId = CHAIN_IDS[network];

    if (wallet.isRealProvider && typeof window !== 'undefined' && (window as any).ethereum) {
      const provider = (window as any).ethereum;
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: targetChainId }]
        });
      } catch (switchError: any) {
        // Error 4902 indicates chain hasn't been added to wallet yet
        if (switchError.code === 4902 && NETWORK_PARAMS[network]) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [NETWORK_PARAMS[network]]
            });
          } catch (addError) {
            console.error('Failed to add chain', addError);
          }
        }
      }
    }

    setWallet((prev) => ({
      ...prev,
      network
    }));

    addToast({
      type: 'info',
      title: 'Network Switched',
      message: `Active blockchain set to ${network}`
    });
  };

  const adjustBalance = (newBalance: number) => {
    setWallet((prev) => ({
      ...prev,
      balanceETH: Math.max(0, newBalance),
      balanceUSD: Math.max(0, newBalance) * ETH_PRICE_USD
    }));
  };

  // Cryptographic Signature Request Helper
  const requestCryptographicSignature = async (message: string): Promise<boolean> => {
    if (wallet.isRealProvider && typeof window !== 'undefined' && (window as any).ethereum) {
      const provider = (window as any).ethereum;
      try {
        const msgHex = '0x' + Array.from(new TextEncoder().encode(message))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        await provider.request({
          method: 'personal_sign',
          params: [msgHex, wallet.address]
        });
        return true;
      } catch (err) {
        console.warn('Signature rejected by user', err);
        addToast({
          type: 'warning',
          title: 'Signature Rejected',
          message: 'The cryptographic transaction was cancelled in your wallet.'
        });
        return false;
      }
    } else {
      // Simulated signature delay
      await new Promise((resolve) => setTimeout(resolve, 900));
      return true;
    }
  };

  // 1. Instant Buy / Collect Artwork
  const collectArtwork = async (artworkId: string): Promise<{ success: boolean; txHash?: string }> => {
    const artwork = artworks.find((a) => a.id === artworkId);
    if (!artwork) return { success: false };

    if (!wallet.connected) {
      openWalletModal();
      return { success: false };
    }

    if (wallet.balanceETH < artwork.price) {
      addToast({
        type: 'error',
        title: 'Insufficient Funds',
        message: `You need ${artwork.price} ETH, but current balance is ${wallet.balanceETH.toFixed(3)} ETH.`
      });
      return { success: false };
    }

    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    setIsTxProcessing(true);
    setActiveTxDetails({
      title: `Collecting "${artwork.title}"`,
      subtitle: `Please sign the ERC-721 acquisition of ${artwork.price} ETH in ${wallet.walletType || 'your wallet'}...`,
      step: 'signature'
    });

    const signMsg = `ARCVAULT Protocol Acquisition\nArtwork: ${artwork.title}\nToken ID: #${artwork.tokenId}\nPrice: ${artwork.price} ETH\nRecipient: ${wallet.address}\nTimestamp: ${new Date().toISOString()}`;
    const signed = await requestCryptographicSignature(signMsg);

    if (!signed) {
      setIsTxProcessing(false);
      setActiveTxDetails(null);
      return { success: false };
    }

    setActiveTxDetails({
      title: 'Confirming On-Chain',
      subtitle: `Broadcasting transaction to ${wallet.network} node mempool...`,
      step: 'confirming'
    });

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const newBalance = Math.max(0, wallet.balanceETH - artwork.price);
    const provRecord: ProvenanceRecord = {
      id: `prov-${Date.now()}`,
      event: 'Sale',
      from: artwork.creator.etherscan?.split('/address/')[1] || '0xCreatorAddress',
      to: wallet.address,
      price: artwork.price,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      txHash
    };

    setArtworks((prev) =>
      prev.map((item) => {
        if (item.id === artworkId) {
          return {
            ...item,
            provenance: [provRecord, ...item.provenance]
          };
        }
        return item;
      })
    );

    setWallet((prev) => ({
      ...prev,
      balanceETH: Number(newBalance.toFixed(4)),
      balanceUSD: Number((newBalance * ETH_PRICE_USD).toFixed(2)),
      collectedNFTs: [artwork, ...prev.collectedNFTs.filter((n) => n.id !== artwork.id)],
      transactionHistory: [
        {
          id: `tx-${Date.now()}`,
          type: 'Purchase',
          title: `Collected: ${artwork.title}`,
          amount: artwork.price,
          txHash,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          status: 'confirmed'
        },
        ...prev.transactionHistory
      ]
    }));

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFF6D6', '#FFFFFF', '#00F5D4']
    });

    setIsTxProcessing(false);
    setActiveTxDetails(null);

    addToast({
      type: 'success',
      title: 'Acquisition Confirmed',
      message: `"${artwork.title}" is now permanently secured in your vault.`,
      txHash
    });

    return { success: true, txHash };
  };

  // 2. Place Bid
  const placeBid = async (artworkId: string, amount: number): Promise<{ success: boolean; txHash?: string }> => {
    const artwork = artworks.find((a) => a.id === artworkId);
    if (!artwork) return { success: false };

    if (!wallet.connected) {
      openWalletModal();
      return { success: false };
    }

    if (amount <= (artwork.highestBid || artwork.price)) {
      addToast({
        type: 'warning',
        title: 'Bid Too Low',
        message: `Your bid must exceed current highest bid of ${(artwork.highestBid || artwork.price)} ETH.`
      });
      return { success: false };
    }

    if (wallet.balanceETH < amount) {
      addToast({
        type: 'error',
        title: 'Insufficient Funds',
        message: `Your wallet holds ${wallet.balanceETH} ETH, but bid is ${amount} ETH.`
      });
      return { success: false };
    }

    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    setIsTxProcessing(true);
    setActiveTxDetails({
      title: `Submitting Bid: ${amount} ETH`,
      subtitle: `Please sign the auction bid offer in ${wallet.walletType || 'your wallet'}...`,
      step: 'signature'
    });

    const signMsg = `ARCVAULT Protocol Auction Bid\nArtwork: ${artwork.title}\nBid Amount: ${amount} ETH\nBidder: ${wallet.address}\nTimestamp: ${new Date().toISOString()}`;
    const signed = await requestCryptographicSignature(signMsg);

    if (!signed) {
      setIsTxProcessing(false);
      setActiveTxDetails(null);
      return { success: false };
    }

    setActiveTxDetails({
      title: 'Registering On-Chain',
      subtitle: 'Registering bid on ARCVAULT Orderbook...',
      step: 'confirming'
    });

    await new Promise((resolve) => setTimeout(resolve, 1100));

    const provRecord: ProvenanceRecord = {
      id: `prov-bid-${Date.now()}`,
      event: 'Bid Placed',
      from: wallet.address,
      price: amount,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      txHash
    };

    setArtworks((prev) =>
      prev.map((item) => {
        if (item.id === artworkId) {
          return {
            ...item,
            highestBid: amount,
            provenance: [provRecord, ...item.provenance]
          };
        }
        return item;
      })
    );

    setWallet((prev) => ({
      ...prev,
      activeBids: [
        {
          artworkId,
          artworkTitle: artwork.title,
          amount,
          date: new Date().toISOString(),
          status: 'leading'
        },
        ...prev.activeBids.filter((b) => b.artworkId !== artworkId)
      ],
      transactionHistory: [
        {
          id: `tx-${Date.now()}`,
          type: 'Bid',
          title: `Bid ${amount} ETH on ${artwork.title}`,
          amount,
          txHash,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          status: 'confirmed'
        },
        ...prev.transactionHistory
      ]
    }));

    setIsTxProcessing(false);
    setActiveTxDetails(null);

    addToast({
      type: 'success',
      title: 'Bid Placed Successfully',
      message: `You are now the leading bidder at ${amount} ETH!`,
      txHash
    });

    return { success: true, txHash };
  };

  // 3. Mint Drop Editions
  const mintDrop = async (
    dropId: string,
    count: number
  ): Promise<{ success: boolean; txHash?: string; artworkIds?: string[] }> => {
    const drop = drops.find((d) => d.id === dropId);
    if (!drop) return { success: false };

    if (!wallet.connected) {
      openWalletModal();
      return { success: false };
    }

    const totalCost = drop.mintPrice * count;
    if (wallet.balanceETH < totalCost) {
      addToast({
        type: 'error',
        title: 'Insufficient ETH',
        message: `Minting ${count} edition(s) costs ${totalCost.toFixed(2)} ETH. Your balance: ${wallet.balanceETH.toFixed(2)} ETH.`
      });
      return { success: false };
    }

    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    setIsTxProcessing(true);
    setActiveTxDetails({
      title: `Minting ${count} Edition(s) of "${drop.title}"`,
      subtitle: `Please sign the ERC-721 Batch Mint in ${wallet.walletType || 'your wallet'}...`,
      step: 'signature'
    });

    const signMsg = `ARCVAULT Protocol Drop Mint\nDrop: ${drop.title}\nQuantity: ${count}\nTotal: ${totalCost.toFixed(2)} ETH\nMinter: ${wallet.address}\nTimestamp: ${new Date().toISOString()}`;
    const signed = await requestCryptographicSignature(signMsg);

    if (!signed) {
      setIsTxProcessing(false);
      setActiveTxDetails(null);
      return { success: false };
    }

    setActiveTxDetails({
      title: 'Generating Smart Contract Token ID',
      subtitle: `Securing metadata to IPFS & generating cryptographic proof...`,
      step: 'confirming'
    });

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const newMintedCount = Math.min(drop.totalEditions, drop.mintedEditions + count);
    setDrops((prev) =>
      prev.map((d) => (d.id === dropId ? { ...d, mintedEditions: newMintedCount } : d))
    );

    const mintedArtworks: NFTArtwork[] = [];
    for (let i = 0; i < count; i++) {
      const editionNum = drop.mintedEditions + i + 1;
      const newArt: NFTArtwork = {
        id: `minted-${drop.id}-${editionNum}-${Date.now()}`,
        tokenId: `0${editionNum}`.slice(-3),
        title: `${drop.title} #${editionNum}`,
        subtitle: `Curated Drop Edition ${editionNum}/${drop.totalEditions}`,
        creatorId: drop.creator.id,
        creator: drop.creator,
        collectionId: 'col-curated-drops',
        collectionName: drop.title,
        image: drop.coverImage,
        edition: { current: editionNum, total: drop.totalEditions },
        price: drop.mintPrice,
        fiatPriceUSD: drop.mintPrice * ETH_PRICE_USD,
        medium: 'Architectural 3D',
        createdYear: 2026,
        dimensions: '7680 x 4320 px (8K Raw Master)',
        fileSize: '48.2 MB',
        ipfsHash: `ipfs://Qm${Array.from({ length: 44 }, () => Math.floor(Math.random() * 36).toString(36)).join('')}`,
        contractAddress: drop.contractAddress,
        blockchain: wallet.network,
        description: drop.tagline,
        curatorNotes: drop.curatorStatement,
        isCuratedDrop: true,
        attributes: [
          { trait_type: 'Drop', value: drop.title, rarity_score: 95 },
          { trait_type: 'Mint Phase', value: 'Public Release', rarity_score: 90 },
          { trait_type: 'Edition Number', value: `#${editionNum}`, rarity_score: 99 }
        ],
        provenance: [
          {
            id: `prov-mint-${Date.now()}-${i}`,
            event: 'Minted',
            from: '0x0000000000000000000000000000000000000000',
            to: wallet.address,
            price: drop.mintPrice,
            date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
            txHash
          }
        ]
      };
      mintedArtworks.push(newArt);
    }

    const newBalance = Math.max(0, wallet.balanceETH - totalCost);
    setWallet((prev) => ({
      ...prev,
      balanceETH: Number(newBalance.toFixed(4)),
      balanceUSD: Number((newBalance * ETH_PRICE_USD).toFixed(2)),
      collectedNFTs: [...mintedArtworks, ...prev.collectedNFTs],
      transactionHistory: [
        {
          id: `tx-mint-${Date.now()}`,
          type: 'Mint',
          title: `Minted ${count}x ${drop.title}`,
          amount: totalCost,
          txHash,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          status: 'confirmed'
        },
        ...prev.transactionHistory
      ]
    }));

    setArtworks((prev) => [...mintedArtworks, ...prev]);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#00F5D4', '#FFF', '#9B51E0']
    });

    setIsTxProcessing(false);
    setActiveTxDetails(null);

    addToast({
      type: 'success',
      title: 'Mint Complete!',
      message: `You successfully minted ${count} edition(s) of ${drop.title}.`,
      txHash
    });

    return { success: true, txHash, artworkIds: mintedArtworks.map((m) => m.id) };
  };

  // 4. Creator Studio: Mint Custom Artwork
  const createArtworkInStudio = async (artworkData: {
    title: string;
    subtitle?: string;
    description: string;
    curatorNotes: string;
    price: number;
    medium: any;
    image: string;
    totalEditions: number;
    collectionId: string;
    attributes: { trait_type: string; value: string }[];
  }): Promise<{ success: boolean; artworkId: string; txHash: string }> => {
    if (!wallet.connected) {
      openWalletModal();
      return { success: false, artworkId: '', txHash: '' };
    }

    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newArtId = `art-custom-${Date.now()}`;
    const ipfsHash = `ipfs://Qm${Array.from({ length: 44 }, () => Math.floor(Math.random() * 36).toString(36)).join('')}`;

    setIsTxProcessing(true);
    setActiveTxDetails({
      title: `Deploying "${artworkData.title}" on-chain`,
      subtitle: `Please sign the ERC-721 Deployment in ${wallet.walletType || 'your wallet'}...`,
      step: 'signature'
    });

    const signMsg = `ARCVAULT Protocol Contract Deployment\nTitle: ${artworkData.title}\nEditions: ${artworkData.totalEditions}\nPrice: ${artworkData.price} ETH\nCreator: ${wallet.address}\nTimestamp: ${new Date().toISOString()}`;
    const signed = await requestCryptographicSignature(signMsg);

    if (!signed) {
      setIsTxProcessing(false);
      setActiveTxDetails(null);
      return { success: false, artworkId: '', txHash: '' };
    }

    setActiveTxDetails({
      title: 'Writing to Smart Contract',
      subtitle: 'Registering ERC-721 token & EIP-2981 royalty splitter...',
      step: 'confirming'
    });

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const selectedCollection = collections.find((c) => c.id === artworkData.collectionId);

    const userCreator: Creator = {
      id: 'creator-user',
      name: 'Vault Creator Studio',
      handle: `@${wallet.shortAddress.replace('...', '_')}`,
      avatar: '/creators/alexander_reed.jpg',
      bio: 'Verified independent artist & digital master on ARCVAULT.',
      statement: 'Pioneering digital fine art on Ethereum.',
      location: 'Global / On-Chain',
      verified: true,
      totalVolume: 12.5,
      floorPrice: artworkData.price,
      joinedDate: 'March 2026',
      featuredArtworksCount: 1,
      etherscan: `https://etherscan.io/address/${wallet.address}`
    };

    const newArtwork: NFTArtwork = {
      id: newArtId,
      tokenId: `0${Math.floor(Math.random() * 900 + 100)}`,
      title: artworkData.title,
      subtitle: artworkData.subtitle || 'Contemporary Digital Work',
      creatorId: 'creator-user',
      creator: userCreator,
      collectionId: artworkData.collectionId,
      collectionName: selectedCollection ? selectedCollection.name : 'Independent Creations',
      image: artworkData.image,
      edition: { current: 1, total: artworkData.totalEditions },
      price: artworkData.price,
      fiatPriceUSD: artworkData.price * ETH_PRICE_USD,
      medium: artworkData.medium,
      createdYear: 2026,
      dimensions: '4000 x 4000 px High-Res',
      fileSize: '35 MB Lossless Master',
      ipfsHash,
      contractAddress: wallet.address,
      blockchain: wallet.network,
      description: artworkData.description,
      curatorNotes: artworkData.curatorNotes,
      attributes: artworkData.attributes.map((a) => ({ ...a, rarity_score: 90 })),
      provenance: [
        {
          id: `prov-${Date.now()}`,
          event: 'Minted',
          from: '0x0000000000000000000000000000000000000000',
          to: wallet.address,
          price: 0,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          txHash
        },
        {
          id: `prov-list-${Date.now()}`,
          event: 'Listed',
          from: wallet.address,
          price: artworkData.price,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          txHash
        }
      ]
    };

    setArtworks((prev) => [newArtwork, ...prev]);

    setWallet((prev) => ({
      ...prev,
      createdNFTs: [newArtwork, ...prev.createdNFTs],
      transactionHistory: [
        {
          id: `tx-create-${Date.now()}`,
          type: 'Mint',
          title: `Created & Listed: ${newArtwork.title}`,
          amount: newArtwork.price,
          txHash,
          date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          status: 'confirmed'
        },
        ...prev.transactionHistory
      ]
    }));

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#FFFFFF', '#00F5D4']
    });

    setIsTxProcessing(false);
    setActiveTxDetails(null);

    addToast({
      type: 'success',
      title: 'Artwork Minted & Listed',
      message: `"${newArtwork.title}" is now live on the ARCVAULT marketplace.`,
      txHash
    });

    return { success: true, artworkId: newArtId, txHash };
  };

  return (
    <Web3Context.Provider
      value={{
        wallet,
        artworks,
        collections,
        drops,
        creators,
        toasts,
        isWalletModalOpen,
        isTxProcessing,
        activeTxDetails,
        openWalletModal,
        closeWalletModal,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        adjustBalance,
        collectArtwork,
        placeBid,
        mintDrop,
        createArtworkInStudio,
        dismissToast,
        isExtensionDetected
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
