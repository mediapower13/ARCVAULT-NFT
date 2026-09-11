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
  connectWallet: (type: 'MetaMask' | 'Coinbase' | 'Phantom' | 'WalletConnect') => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (network: BlockchainNetwork) => void;
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
}

const DEFAULT_WALLET: UserWallet = {
  address: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
  shortAddress: '0x82f9...491A',
  balanceETH: 6.85,
  balanceUSD: 6.85 * ETH_PRICE_USD,
  network: 'Ethereum',
  connected: false,
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

  const addToast = (toast: Omit<ToastNotification, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastNotification = {
      ...toast,
      id,
      timestamp: Date.now()
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 6000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openWalletModal = () => setIsWalletModalOpen(true);
  const closeWalletModal = () => setIsWalletModalOpen(false);

  const connectWallet = async (type: 'MetaMask' | 'Coinbase' | 'Phantom' | 'WalletConnect') => {
    setIsTxProcessing(true);
    setActiveTxDetails({
      title: `Connecting to ${type}`,
      subtitle: 'Requesting account authorization & signature...',
      step: 'signature'
    });

    await new Promise((resolve) => setTimeout(resolve, 900));

    const address = '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A';
    setWallet((prev) => ({
      ...prev,
      connected: true,
      walletType: type,
      address,
      shortAddress: `${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      balanceETH: prev.balanceETH > 0 ? prev.balanceETH : 6.85,
      balanceUSD: (prev.balanceETH > 0 ? prev.balanceETH : 6.85) * ETH_PRICE_USD
    }));

    setIsTxProcessing(false);
    setActiveTxDetails(null);
    closeWalletModal();

    addToast({
      type: 'success',
      title: 'Wallet Connected',
      message: `Successfully connected with ${type} on ${wallet.network}`
    });
  };

  const disconnectWallet = () => {
    setWallet((prev) => ({
      ...prev,
      connected: false,
      walletType: null
    }));
    addToast({
      type: 'info',
      title: 'Wallet Disconnected',
      message: 'Your Web3 session has been securely ended.'
    });
  };

  const switchNetwork = (network: BlockchainNetwork) => {
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
        message: `You need ${artwork.price} ETH, but current balance is ${wallet.balanceETH.toFixed(2)} ETH.`
      });
      return { success: false };
    }

    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    setIsTxProcessing(true);
    setActiveTxDetails({
      title: `Collecting "${artwork.title}"`,
      subtitle: `Signing ERC-721 transfer transaction of ${artwork.price} ETH...`,
      step: 'signature'
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setActiveTxDetails({
      title: 'Confirming On-Chain',
      subtitle: `Broadcasting transaction to ${wallet.network} node mempool...`,
      step: 'confirming'
    });

    await new Promise((resolve) => setTimeout(resolve, 1400));

    // Update wallet balance
    const newBalance = wallet.balanceETH - artwork.price;
    const provRecord: ProvenanceRecord = {
      id: `prov-${Date.now()}`,
      event: 'Sale',
      from: artwork.creator.etherscan?.split('/address/')[1] || '0xCreatorAddress',
      to: wallet.address,
      price: artwork.price,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      txHash
    };

    // Update artwork provenance
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

    // Update wallet state
    setWallet((prev) => ({
      ...prev,
      balanceETH: Number(newBalance.toFixed(3)),
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

    // Trigger celebration confetti
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
      subtitle: `Creating cryptographically signed auction bid offer...`,
      step: 'signature'
    });

    await new Promise((resolve) => setTimeout(resolve, 900));

    setActiveTxDetails({
      title: 'Verifying Signature',
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
      message: `You are now the highest bidder at ${amount} ETH!`,
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
      subtitle: `Executing ERC-721 Batch Mint (${totalCost.toFixed(2)} ETH)...`,
      step: 'signature'
    });

    await new Promise((resolve) => setTimeout(resolve, 1100));

    setActiveTxDetails({
      title: 'Generating Smart Contract Token ID',
      subtitle: `Securing metadata to IPFS & generating cryptographic proof...`,
      step: 'confirming'
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update drop supply
    const newMintedCount = Math.min(drop.totalEditions, drop.mintedEditions + count);
    setDrops((prev) =>
      prev.map((d) => (d.id === dropId ? { ...d, mintedEditions: newMintedCount } : d))
    );

    // Create minted artwork in user inventory
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

    const newBalance = wallet.balanceETH - totalCost;
    setWallet((prev) => ({
      ...prev,
      balanceETH: Number(newBalance.toFixed(3)),
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

    // Confetti!
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
      subtitle: 'Uploading metadata & media to IPFS node pinning service...',
      step: 'signature'
    });

    await new Promise((resolve) => setTimeout(resolve, 1100));

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
        dismissToast
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
