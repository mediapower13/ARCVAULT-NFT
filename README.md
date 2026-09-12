# ARCVAULT — Curated Digital Art & On-Chain Ownership Platform

> **Digital Works. Verified On-Chain.**
> A museum-grade, luxury digital art and NFT platform designed for high-end digital culture, immutable cryptographic provenance, and curated creator drops.

---

## ✨ Features

- **🏛️ Museum-Grade Editorial Aesthetic**: Obsidian dark themes, frosted glassmorphism, bespoke typography (`Cinzel`, `Syne`, `Plus Jakarta Sans`, `JetBrains Mono`), and high-definition generative & architectural 8K master artworks.
- **⚡ Universal Web3 Multi-Wallet Integration**: 
  - Connect via browser extensions: **MetaMask, Coinbase Wallet, Phantom, Rabby, Rainbow, Trust Wallet, Brave** (auto-detected).
  - Connect via mobile apps using **WalletConnect QR Code** scanner.
  - Switch across **Ethereum Mainnet, Sepolia, Base, Arbitrum One, and Polygon** with automatic chain switching (`wallet_switchEthereumChain`).
  - Real cryptographic signature prompts (`personal_sign`) on asset collection, bidding, and smart contract minting.
- **🎨 8 Curated Pages**:
  1. **Editorial Homepage**: Hero showcase, protocol statistics, live drop spotlight, and exhibition grid.
  2. **Explore & Marketplace**: Multi-facet medium filters (Generative Code, Architectural 3D, Digital Sculpture, Audiovisual, Minimalist 3D), live search, sort options, and Grid vs Cinema view modes.
  3. **NFT Detail Monograph**: High-resolution zoomable master view, curatorial notes, on-chain ERC-721 details, raw EIP-712 proof JSON, and chronological provenance history.
  4. **Curated Drops Launchpad**: Live drop console with multi-edition batch minting, live allocation progress, and celebratory unboxing reveals.
  5. **Collections Monograph**: Curated series index with floor price, 24h volume, owner count, and contract address lookups.
  6. **Creator Dossiers**: High-fashion artist monographs with manifestos, career volume, floor stats, and portfolio gallery.
  7. **Collector Vault**: Connected wallet portfolio, tabbed collected artworks, active bids, studio originals, and on-chain transaction ledger.
  8. **Creator Studio**: 5-step minting wizard to upload master media, generate IPFS metadata, configure 7.5% EIP-2981 perpetual royalties, and deploy to smart contracts with live card preview.
- **🎧 Ethereal Ambient Soundscape**: Web Audio API synthesized gallery drone soundscape toggled directly from the header.

---

## 🌐 Deploy Live

### Option 1: Deploy on Vercel (Recommended — 2 Minutes)

1. Go to [Vercel](https://vercel.com/new) and log in with your GitHub account.
2. Select the repository: **`mediapower13/ARCVAULT-NFT`**.
3. Framework Preset: **Vite** (detected automatically).
4. *(Optional)* Add Environment Variables from `.env.example` in the Project Settings.
5. Click **Deploy**. Your luxury platform will be live with an instant SSL URL (e.g., `https://arcvault-nft.vercel.app`)!

### Option 2: Deploy on Netlify

1. Go to [Netlify](https://app.netlify.com/start) and log in with GitHub.
2. Select **`mediapower13/ARCVAULT-NFT`**.
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Click **Deploy Site**.

### Option 3: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## 🔑 Environment Variables (`.env`)

Duplicate `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_APP_NAME` | Name of platform | `ARCVAULT` |
| `VITE_APP_URL` | Live production URL | `https://arcvault.art` |
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect v2 Cloud Project ID | `3a8170812b534d0ff9d794f168fa48e6` |
| `VITE_ALCHEMY_API_KEY` | Alchemy API Key for fast RPCs | *(Optional)* |
| `VITE_INFURA_API_KEY` | Infura API Key | *(Optional)* |
| `VITE_ETH_RPC_URL` | Ethereum Mainnet RPC | `https://eth.llamarpc.com` |
| `VITE_SEPOLIA_RPC_URL` | Sepolia Testnet RPC | `https://rpc.sepolia.org` |
| `VITE_BASE_RPC_URL` | Base Mainnet RPC | `https://mainnet.base.org` |
| `VITE_ARBITRUM_RPC_URL` | Arbitrum One RPC | `https://arb1.arbitrum.io/rpc` |
| `VITE_POLYGON_RPC_URL` | Polygon RPC | `https://polygon-rpc.com` |
| `VITE_PINATA_API_KEY` | Pinata IPFS API Key | *(Optional)* |
| `VITE_PINATA_SECRET_KEY` | Pinata IPFS Secret Key | *(Optional)* |
| `VITE_IPFS_GATEWAY` | IPFS Gateway Base URL | `https://gateway.pinata.cloud/ipfs/` |
| `VITE_CONTRACT_MAINNET` | Mainnet ERC-721 Contract Address | `0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A` |
| `VITE_CONTRACT_SEPOLIA` | Sepolia ERC-721 Contract Address | `0x73a812D9eBc29B120c8aF460cE518104E90B0C21` |
| `VITE_ROYALTY_PERCENTAGE` | Default Perpetual Creator Royalty (%) | `7.5` |

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/mediapower13/ARCVAULT-NFT.git
cd ARCVAULT-NFT

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit **`http://localhost:5173/`** in your browser.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Modern CSS System, Glassmorphism
- **Web3 Engine**: EIP-1193 Injected Extension Detection, EIP-6963, EIP-712 / Personal Sign, EIP-2981 Royalty Standard
- **Decentralized Storage**: IPFS Dec-Pinning Architecture

---

## 📄 License

MIT License © 2026 ARCVAULT Protocol.
