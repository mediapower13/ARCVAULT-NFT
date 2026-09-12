/**
 * Type-safe Environment Configuration for ARCVAULT
 * Supports Alchemy, Infura, WalletConnect Project IDs, IPFS Gateways, and Contract Addresses.
 * All variables include sensible defaults for immediate plug-and-play operation.
 */

const env = (import.meta as any).env || {};

export const ENV = {
  // App Metadata
  APP_NAME: env.VITE_APP_NAME || 'ARCVAULT',
  APP_DESCRIPTION: env.VITE_APP_DESCRIPTION || 'Curated Digital Art & On-Chain Ownership Platform',
  APP_URL: env.VITE_APP_URL || 'https://arcvault.art',

  // WalletConnect v2 Cloud Project ID (from https://cloud.walletconnect.com / Reown)
  WALLETCONNECT_PROJECT_ID: env.VITE_WALLETCONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f168fa48e6',

  // RPC Endpoints & API Keys (Alchemy / Infura / Public RPCs)
  ALCHEMY_API_KEY: env.VITE_ALCHEMY_API_KEY || '',
  INFURA_API_KEY: env.VITE_INFURA_API_KEY || '',
  
  RPC_URLS: {
    ETHEREUM: env.VITE_ETH_RPC_URL || 'https://eth.llamarpc.com',
    SEPOLIA: env.VITE_SEPOLIA_RPC_URL || 'https://rpc.sepolia.org',
    BASE: env.VITE_BASE_RPC_URL || 'https://mainnet.base.org',
    ARBITRUM: env.VITE_ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    POLYGON: env.VITE_POLYGON_RPC_URL || 'https://polygon-rpc.com'
  },

  // IPFS & Decentralized Storage Gateway (Pinata / Web3.Storage / Infura IPFS)
  PINATA_API_KEY: env.VITE_PINATA_API_KEY || '',
  PINATA_SECRET_KEY: env.VITE_PINATA_SECRET_KEY || '',
  IPFS_GATEWAY: env.VITE_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/',

  // Deployed Smart Contract Addresses
  CONTRACTS: {
    MAINNET_ERC721: env.VITE_CONTRACT_MAINNET || '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
    SEPOLIA_ERC721: env.VITE_CONTRACT_SEPOLIA || '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
    BASE_ERC721: env.VITE_CONTRACT_BASE || '0x19fB234901CaD730f06B6282E2E675fC5E48bB82',
    ROYALTY_PERCENTAGE: Number(env.VITE_ROYALTY_PERCENTAGE || 7.5) // EIP-2981 standard
  }
};
