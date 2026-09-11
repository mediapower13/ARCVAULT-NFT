export type BlockchainNetwork = 'Ethereum' | 'Sepolia' | 'Base' | 'Arbitrum';

export type ArtworkMedium = 'Generative Code' | 'Architectural 3D' | 'Digital Sculpture' | 'Algorithmic' | 'Audiovisual' | 'Minimalist 3D';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  statement: string;
  location: string;
  verified: boolean;
  totalVolume: number; // in ETH
  floorPrice: number; // in ETH
  joinedDate: string;
  featuredArtworksCount: number;
  twitter?: string;
  instagram?: string;
  etherscan?: string;
}

export interface ProvenanceRecord {
  id: string;
  event: 'Minted' | 'Listed' | 'Transferred' | 'Sale' | 'Bid Placed';
  from: string;
  to?: string;
  price?: number; // in ETH
  date: string;
  txHash: string;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  rarity_score?: number;
}

export interface NFTArtwork {
  id: string;
  tokenId: string;
  title: string;
  subtitle?: string;
  creatorId: string;
  creator: Creator;
  collectionId: string;
  collectionName: string;
  image: string;
  edition: {
    current: number;
    total: number;
  };
  price: number; // in ETH
  fiatPriceUSD: number;
  medium: ArtworkMedium;
  createdYear: number;
  dimensions?: string;
  fileSize?: string;
  ipfsHash: string;
  contractAddress: string;
  blockchain: BlockchainNetwork;
  description: string;
  curatorNotes: string;
  highestBid?: number;
  auctionEndsAt?: string; // ISO string if active auction
  isCuratedDrop?: boolean;
  isFeatured?: boolean;
  isLiveAuction?: boolean;
  attributes: NFTAttribute[];
  provenance: ProvenanceRecord[];
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  curatorStatement: string;
  creatorId: string;
  creator: Creator;
  coverImage: string;
  avatarImage: string;
  floorPrice: number;
  totalVolume: number;
  totalItems: number;
  ownersCount: number;
  contractAddress: string;
  createdAt: string;
  verified: boolean;
}

export interface DropPhase {
  name: string;
  price: number;
  maxPerWallet: number;
  startsAt: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface CuratedDrop {
  id: string;
  title: string;
  tagline: string;
  curatorStatement: string;
  creator: Creator;
  coverImage: string;
  audioPreview?: string;
  releaseDate: string;
  totalEditions: number;
  mintedEditions: number;
  mintPrice: number;
  contractAddress: string;
  phases: DropPhase[];
  highlights: string[];
  featuredArtworkIds: string[];
  status: 'live' | 'upcoming' | 'concluded';
}

export interface UserWallet {
  address: string;
  shortAddress: string;
  balanceETH: number;
  balanceUSD: number;
  network: BlockchainNetwork;
  connected: boolean;
  walletType: 'MetaMask' | 'Coinbase' | 'Phantom' | 'WalletConnect' | null;
  collectedNFTs: NFTArtwork[];
  createdNFTs: NFTArtwork[];
  activeBids: {
    artworkId: string;
    artworkTitle: string;
    amount: number;
    date: string;
    status: 'leading' | 'outbid' | 'accepted';
  }[];
  transactionHistory: {
    id: string;
    type: 'Mint' | 'Purchase' | 'Bid' | 'List' | 'Transfer';
    title: string;
    amount?: number;
    txHash: string;
    date: string;
    status: 'confirmed' | 'pending';
  }[];
}
