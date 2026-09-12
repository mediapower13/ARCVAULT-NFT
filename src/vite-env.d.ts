/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_APP_DESCRIPTION?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string;
  readonly VITE_ALCHEMY_API_KEY?: string;
  readonly VITE_INFURA_API_KEY?: string;
  readonly VITE_ETH_RPC_URL?: string;
  readonly VITE_SEPOLIA_RPC_URL?: string;
  readonly VITE_BASE_RPC_URL?: string;
  readonly VITE_ARBITRUM_RPC_URL?: string;
  readonly VITE_POLYGON_RPC_URL?: string;
  readonly VITE_PINATA_API_KEY?: string;
  readonly VITE_PINATA_SECRET_KEY?: string;
  readonly VITE_IPFS_GATEWAY?: string;
  readonly VITE_CONTRACT_MAINNET?: string;
  readonly VITE_CONTRACT_SEPOLIA?: string;
  readonly VITE_CONTRACT_BASE?: string;
  readonly VITE_ROYALTY_PERCENTAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
