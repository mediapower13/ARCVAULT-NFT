import { Creator, NFTArtwork, Collection, CuratedDrop } from '../types';

export const ETH_PRICE_USD = 3450.00;

export const mockCreators: Creator[] = [
  {
    id: 'creator-alexander-reed',
    name: 'Alexander Reed',
    handle: '@alexanderreed',
    avatar: '/creators/alexander_reed.jpg',
    bio: 'Pioneering computational architect and digital sculptor exploring spatial voids, brutalist monoliths, and the physics of ethereal light on Ethereum.',
    statement: 'My work examines the collision between structural permanence and digital ephemeralism. Through algorithmic synthesis, each form seeks to ground the immaterial.',
    location: 'London / Berlin',
    verified: true,
    totalVolume: 184.5,
    floorPrice: 0.85,
    joinedDate: 'February 2024',
    featuredArtworksCount: 14,
    twitter: 'https://twitter.com/alexanderreed',
    instagram: 'https://instagram.com/alexanderreed.art',
    etherscan: 'https://etherscan.io/address/0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A'
  },
  {
    id: 'creator-daniel-okafor',
    name: 'Daniel Okafor',
    handle: '@danielokafor',
    avatar: '/creators/daniel_okafor.jpg',
    bio: 'Avant-garde digital architect and kinetic sculptor. Winner of the 2025 Digital Salon Biennale, focusing on fluid obsidian chrome dynamics.',
    statement: 'Form is never static; void is never empty. In every kinetic iteration lies a dialogue between tension and release within pure mathematical dimensions.',
    location: 'Lagos / New York',
    verified: true,
    totalVolume: 242.8,
    floorPrice: 1.20,
    joinedDate: 'November 2023',
    featuredArtworksCount: 19,
    twitter: 'https://twitter.com/danielokafor',
    instagram: 'https://instagram.com/okafor.atelier',
    etherscan: 'https://etherscan.io/address/0x73a812D9eBc29B120c8aF460cE518104E90B0C21'
  },
  {
    id: 'creator-elena-rostova',
    name: 'Elena Rostova',
    handle: '@elenarostova',
    avatar: '/creators/elena_rostova.jpg',
    bio: 'Generative artist and systems theorist. Constructing algorithmic vortices, quantum symmetries, and neoclassical digital fusion.',
    statement: 'I compose autonomous generative algorithms that mimic organic crystallization and celestial entropy, preserving computational artifacts on-chain.',
    location: 'Stockholm / Tokyo',
    verified: true,
    totalVolume: 310.2,
    floorPrice: 1.45,
    joinedDate: 'August 2023',
    featuredArtworksCount: 22,
    twitter: 'https://twitter.com/elenarostova',
    instagram: 'https://instagram.com/elena.generative',
    etherscan: 'https://etherscan.io/address/0x19fB234901CaD730f06B6282E2E675fC5E48bB82'
  }
];

export const mockArtworks: NFTArtwork[] = [
  {
    id: 'artwork-001',
    tokenId: '001',
    title: 'The Architecture of Light',
    subtitle: 'Study in Monumental Suspension No. 04',
    creatorId: 'creator-alexander-reed',
    creator: mockCreators[0],
    collectionId: 'col-monolithic-voids',
    collectionName: 'Monolithic Voids',
    image: '/artworks/architecture_of_light.jpg',
    edition: { current: 3, total: 25 },
    price: 1.85,
    fiatPriceUSD: 1.85 * ETH_PRICE_USD,
    medium: 'Architectural 3D',
    createdYear: 2026,
    dimensions: '7680 x 4320 px (8K Master)',
    fileSize: '42.8 MB (Lossless Master)',
    ipfsHash: 'ipfs://QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx',
    contractAddress: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
    blockchain: 'Ethereum',
    description: 'A monument of concrete and light suspended in an atmospheric void. The work studies how digital Brutalism achieves emotional weight through precise volumetric ray-tracing and geometric tension.',
    curatorNotes: 'Exhibited at ARCVAULT Genesis Exhibition. Included in the permanent digital catalog of the Institute for Computational Arts.',
    highestBid: 1.60,
    auctionEndsAt: new Date(Date.now() + 86400000 * 2.5).toISOString(),
    isCuratedDrop: true,
    isFeatured: true,
    isLiveAuction: true,
    attributes: [
      { trait_type: 'Medium', value: 'Architectural 3D Render', rarity_score: 95 },
      { trait_type: 'Atmosphere', value: 'Volumetric Dusk', rarity_score: 88 },
      { trait_type: 'Material', value: 'Brutalist Concrete', rarity_score: 92 },
      { trait_type: 'Edition Tier', value: 'Genesis 03/25', rarity_score: 98 }
    ],
    provenance: [
      {
        id: 'prov-1',
        event: 'Minted',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
        price: 0,
        date: '2026-03-01 14:22:08 UTC',
        txHash: '0x9a3e201bfa8295c9a2c358051e247854619ba0429f43a0d5c074e64f7b231da9'
      },
      {
        id: 'prov-2',
        event: 'Listed',
        from: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
        price: 1.85,
        date: '2026-03-05 09:15:33 UTC',
        txHash: '0x1c8b245a90e38102d8e4751f8934cba89716e3478952ac76b054238e55e09842'
      },
      {
        id: 'prov-3',
        event: 'Bid Placed',
        from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        price: 1.60,
        date: '2026-03-08 19:40:12 UTC',
        txHash: '0x7e44a980314b98c0d9510cb5587efc87428131e50882194d21e05d0458aa7932'
      }
    ]
  },
  {
    id: 'artwork-002',
    tokenId: '002',
    title: 'FORM / VOID No. 07',
    subtitle: 'Kinetic Liquid Chrome Sculpture',
    creatorId: 'creator-daniel-okafor',
    creator: mockCreators[1],
    collectionId: 'col-kinetic-matter',
    collectionName: 'Kinetic Matter',
    image: '/artworks/form_void_sculpture.jpg',
    edition: { current: 7, total: 50 },
    price: 1.25,
    fiatPriceUSD: 1.25 * ETH_PRICE_USD,
    medium: 'Digital Sculpture',
    createdYear: 2026,
    dimensions: '6000 x 4500 px',
    fileSize: '38.2 MB',
    ipfsHash: 'ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
    contractAddress: '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
    blockchain: 'Ethereum',
    description: 'An exploration of liquid obsidian chrome in suspension. The sculpture questions gravity and equilibrium, capturing an impossible kinetic moment frozen in hyper-polished titanium geometry.',
    curatorNotes: 'Featured in the London Contemporary Digital Art Pavilion 2026.',
    highestBid: 1.15,
    isCuratedDrop: true,
    isFeatured: true,
    isLiveAuction: false,
    attributes: [
      { trait_type: 'Material', value: 'Liquid Obsidian Chrome', rarity_score: 96 },
      { trait_type: 'Tension', value: 'Kinetic Dynamic', rarity_score: 90 },
      { trait_type: 'Space', value: 'Monochrome Void', rarity_score: 87 }
    ],
    provenance: [
      {
        id: 'prov-4',
        event: 'Minted',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
        price: 0,
        date: '2026-02-14 11:00:00 UTC',
        txHash: '0x33441a9801be98c0d9510cb5587efc87428131e50882194d21e05d0458aa7901'
      },
      {
        id: 'prov-5',
        event: 'Sale',
        from: '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
        to: '0x19fB234901CaD730f06B6282E2E675fC5E48bB82',
        price: 1.10,
        date: '2026-02-20 18:30:19 UTC',
        txHash: '0x8899a980314b98c0d9510cb5587efc87428131e50882194d21e05d0458aa7999'
      }
    ]
  },
  {
    id: 'artwork-003',
    tokenId: '003',
    title: 'Chronos Vortex & Quantum Filaments',
    subtitle: 'Generative Algorithm 024',
    creatorId: 'creator-elena-rostova',
    creator: mockCreators[2],
    collectionId: 'col-quantum-symmetries',
    collectionName: 'Quantum Symmetries',
    image: '/artworks/chronos_generative.jpg',
    edition: { current: 12, total: 30 },
    price: 2.10,
    fiatPriceUSD: 2.10 * ETH_PRICE_USD,
    medium: 'Generative Code',
    createdYear: 2026,
    dimensions: '8000 x 6000 px',
    fileSize: '51.4 MB',
    ipfsHash: 'ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    contractAddress: '0x19fB234901CaD730f06B6282E2E675fC5E48bB82',
    blockchain: 'Ethereum',
    description: 'An autonomous script modeling non-linear time and gravitational turbulence. Champagne gold filaments warp around a dark matter singularity, mapped with 10 million vector coordinates.',
    curatorNotes: 'Awarded Best Algorithmic Composition at the Tokyo Media Arts Festival.',
    highestBid: 1.95,
    auctionEndsAt: new Date(Date.now() + 86400000 * 4).toISOString(),
    isCuratedDrop: false,
    isFeatured: true,
    isLiveAuction: true,
    attributes: [
      { trait_type: 'Algorithm', value: 'Quantum Vortex V4', rarity_score: 99 },
      { trait_type: 'Color Harmony', value: 'Champagne Gold & Obsidian', rarity_score: 94 },
      { trait_type: 'Vector Nodes', value: '10,000,000', rarity_score: 91 }
    ],
    provenance: [
      {
        id: 'prov-6',
        event: 'Minted',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x19fB234901CaD730f06B6282E2E675fC5E48bB82',
        price: 0,
        date: '2026-01-18 16:45:00 UTC',
        txHash: '0xfa39a980314b98c0d9510cb5587efc87428131e50882194d21e05d0458aa1123'
      }
    ]
  },
  {
    id: 'artwork-004',
    tokenId: '004',
    title: 'The Last Horizon',
    subtitle: 'Edition 04 / 50',
    creatorId: 'creator-alexander-reed',
    creator: mockCreators[0],
    collectionId: 'col-monolithic-voids',
    collectionName: 'Monolithic Voids',
    image: '/artworks/the_last_horizon.jpg',
    edition: { current: 4, total: 50 },
    price: 0.85,
    fiatPriceUSD: 0.85 * ETH_PRICE_USD,
    medium: 'Minimalist 3D',
    createdYear: 2026,
    dimensions: '7680 x 4320 px',
    fileSize: '46.0 MB',
    ipfsHash: 'ipfs://QmRA3NWM82Zzy6vd7W6pvKn3pHnoBuKxT3oD5GCMDeMr35',
    contractAddress: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
    blockchain: 'Ethereum',
    description: 'An obsidian desert floor mirroring the cosmos. Solitary monolithic gates stand silently along the glowing event horizon line, inviting contemplation of digital eternity.',
    curatorNotes: 'Acquired by 14 international institutional collectors.',
    highestBid: 0.75,
    isCuratedDrop: false,
    isFeatured: true,
    isLiveAuction: false,
    attributes: [
      { trait_type: 'Horizon Glow', value: 'Solar Flare Amber', rarity_score: 89 },
      { trait_type: 'Terrain', value: 'Obsidian Mirror Plane', rarity_score: 93 },
      { trait_type: 'Structure Count', value: '7 Monoliths', rarity_score: 85 }
    ],
    provenance: [
      {
        id: 'prov-7',
        event: 'Minted',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
        price: 0,
        date: '2026-02-01 10:00:00 UTC',
        txHash: '0x12a9a980314b98c0d9510cb5587efc87428131e50882194d21e05d0458aa9988'
      },
      {
        id: 'prov-8',
        event: 'Sale',
        from: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
        to: '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
        price: 0.80,
        date: '2026-02-10 12:20:00 UTC',
        txHash: '0x77b8a980314b98c0d9510cb5587efc87428131e50882194d21e05d0458aa4433'
      },
      {
        id: 'prov-9',
        event: 'Sale',
        from: '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
        to: '0x19fB234901CaD730f06B6282E2E675fC5E48bB82',
        price: 0.85,
        date: '2026-02-28 17:15:00 UTC',
        txHash: '0x99cca980314b98c0d9510cb5587efc87428131e50882194d21e05d0458aa5511'
      }
    ]
  },
  {
    id: 'artwork-005',
    tokenId: '005',
    title: 'Neoclassical Synthesis 01',
    subtitle: 'Marble & Cybernetic Crystalline Fusion',
    creatorId: 'creator-daniel-okafor',
    creator: mockCreators[1],
    collectionId: 'col-kinetic-matter',
    collectionName: 'Kinetic Matter',
    image: '/artworks/neoclassical_synthesis.jpg',
    edition: { current: 1, total: 10 },
    price: 3.40,
    fiatPriceUSD: 3.40 * ETH_PRICE_USD,
    medium: 'Digital Sculpture',
    createdYear: 2026,
    dimensions: '6000 x 4500 px',
    fileSize: '49.8 MB',
    ipfsHash: 'ipfs://QmTP6xW3q1Kz2c6S5W1K5y9bB2N9X9nL4bB9Z1yP4rW9Xz',
    contractAddress: '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
    blockchain: 'Ethereum',
    description: 'A dialogue between antiquity and hyper-modernity. Classical Italian Carrara marble geometry dissolves into crystalline obsidian mineral shards and glowing gold algorithmic logic circuits.',
    curatorNotes: 'Premiered at the Venice Digital Architecture Biennale.',
    highestBid: 3.10,
    auctionEndsAt: new Date(Date.now() + 86400000 * 1.2).toISOString(),
    isCuratedDrop: false,
    isFeatured: true,
    isLiveAuction: true,
    attributes: [
      { trait_type: 'Medium', value: 'Carrara Marble & Obsidian', rarity_score: 99 },
      { trait_type: 'Circuitry', value: '24K Micro-Bus Gold', rarity_score: 97 },
      { trait_type: 'Edition Tier', value: '1 of 10 Masterpiece', rarity_score: 99 }
    ],
    provenance: [
      {
        id: 'prov-10',
        event: 'Minted',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
        price: 0,
        date: '2026-03-02 18:00:00 UTC',
        txHash: '0x55aa201bfa8295c9a2c358051e247854619ba0429f43a0d5c074e64f7b231abc'
      }
    ]
  },
  {
    id: 'artwork-006',
    tokenId: '006',
    title: 'Spatial Resonance & Violet Strata',
    subtitle: 'Audiovisual Tectonic Waveform',
    creatorId: 'creator-elena-rostova',
    creator: mockCreators[2],
    collectionId: 'col-quantum-symmetries',
    collectionName: 'Quantum Symmetries',
    image: '/artworks/spatial_acoustics.jpg',
    edition: { current: 15, total: 40 },
    price: 1.45,
    fiatPriceUSD: 1.45 * ETH_PRICE_USD,
    medium: 'Audiovisual',
    createdYear: 2026,
    dimensions: '7680 x 4320 px (Includes FLAC 24-bit/96kHz Audio)',
    fileSize: '78.5 MB Master Package',
    ipfsHash: 'ipfs://QmNV6s9h8B5z2m1L4k7j9x3cV5n8p1q4r2s6t9u3v7w8x9',
    contractAddress: '0x19fB234901CaD730f06B6282E2E675fC5E48bB82',
    blockchain: 'Ethereum',
    description: 'Translating sub-bass frequencies into crystalline geological topography. Sharp violet luminescent ridges emerge from deep slate matrices, responding dynamically to acoustic harmonics.',
    curatorNotes: 'Includes unlockable spatial audio files and stem multitracks on IPFS.',
    highestBid: 1.30,
    isCuratedDrop: true,
    isFeatured: false,
    isLiveAuction: false,
    attributes: [
      { trait_type: 'Harmonic Key', value: 'F# Minor Sub-Bass', rarity_score: 93 },
      { trait_type: 'Color Matrix', value: 'Luminescent Violet', rarity_score: 88 },
      { trait_type: 'Topography', value: 'Crystalline Faultline', rarity_score: 91 }
    ],
    provenance: [
      {
        id: 'prov-11',
        event: 'Minted',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x19fB234901CaD730f06B6282E2E675fC5E48bB82',
        price: 0,
        date: '2026-02-18 20:10:00 UTC',
        txHash: '0x88ee201bfa8295c9a2c358051e247854619ba0429f43a0d5c074e64f7b231fff'
      }
    ]
  }
];

export const mockCollections: Collection[] = [
  {
    id: 'col-monolithic-voids',
    name: 'Monolithic Voids',
    slug: 'monolithic-voids',
    tagline: 'Brutalist computational structures suspended in atmospheric light and mist.',
    curatorStatement: 'An ongoing investigation into the permanence of digital brutalism. Each artwork within Monolithic Voids interrogates architectural scale and shadow play within impossible digital geometries.',
    creatorId: 'creator-alexander-reed',
    creator: mockCreators[0],
    coverImage: '/artworks/architecture_of_light.jpg',
    avatarImage: '/artworks/the_last_horizon.jpg',
    floorPrice: 0.85,
    totalVolume: 124.6,
    totalItems: 25,
    ownersCount: 19,
    contractAddress: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
    createdAt: 'January 2026',
    verified: true
  },
  {
    id: 'col-kinetic-matter',
    name: 'Kinetic Matter',
    slug: 'kinetic-matter',
    tagline: 'Equilibrium, fluid obsidian chrome, and classical tension in zero-gravity.',
    curatorStatement: 'Kinetic Matter renders the fluidity of high-temperature titanium and obsidian alloy. The collection challenges conventional sculpture boundaries by harnessing real-time physics simulators.',
    creatorId: 'creator-daniel-okafor',
    creator: mockCreators[1],
    coverImage: '/artworks/form_void_sculpture.jpg',
    avatarImage: '/artworks/neoclassical_synthesis.jpg',
    floorPrice: 1.25,
    totalVolume: 188.4,
    totalItems: 50,
    ownersCount: 38,
    contractAddress: '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
    createdAt: 'December 2025',
    verified: true
  },
  {
    id: 'col-quantum-symmetries',
    name: 'Quantum Symmetries',
    slug: 'quantum-symmetries',
    tagline: 'Algorithmic compositions of non-linear time, gold filaments, and acoustic terrain.',
    curatorStatement: 'Mathematical beauty expressed through autonomous code. Quantum Symmetries fuses generative mathematics with celestial physics, delivering intricate computational tapestries.',
    creatorId: 'creator-elena-rostova',
    creator: mockCreators[2],
    coverImage: '/artworks/chronos_generative.jpg',
    avatarImage: '/artworks/spatial_acoustics.jpg',
    floorPrice: 1.45,
    totalVolume: 215.0,
    totalItems: 30,
    ownersCount: 26,
    contractAddress: '0x19fB234901CaD730f06B6282E2E675fC5E48bB82',
    createdAt: 'November 2025',
    verified: true
  }
];

export const mockDrops: CuratedDrop[] = [
  {
    id: 'drop-architecture-light',
    title: 'THE ARCHITECTURE OF LIGHT',
    tagline: 'A limited curated digital series on the emotional weight of digital Brutalism.',
    curatorStatement: 'Alexander Reed presents his most ambitious computational series to date. 25 unique editions rendered across monumental 8K physical scale, verified on Ethereum ERC-721.',
    creator: mockCreators[0],
    coverImage: '/artworks/architecture_of_light.jpg',
    releaseDate: 'LIVE NOW — Closes in 48 Hours',
    totalEditions: 25,
    mintedEditions: 19,
    mintPrice: 0.85,
    contractAddress: '0x82f9A1394C01e0D642aFE5698b6a12C57B4A491A',
    phases: [
      { name: 'Allowlist Curators', price: 0.70, maxPerWallet: 1, startsAt: 'March 1, 2026', status: 'completed' },
      { name: 'Public Mint Tier', price: 0.85, maxPerWallet: 2, startsAt: 'March 5, 2026', status: 'active' },
      { name: 'Collector Exhibition Close', price: 1.20, maxPerWallet: 1, startsAt: 'March 15, 2026', status: 'upcoming' }
    ],
    highlights: [
      '8K Master Digital Files with Cryptographic Provenance Proof',
      'Exclusive Physical Archival Giclée Print signed by the artist',
      'Invitation to Private Collector Salon in London & Basel',
      'Direct Royalties locked to artist at 7.5% EIP-2981'
    ],
    featuredArtworkIds: ['artwork-001', 'artwork-004'],
    status: 'live'
  },
  {
    id: 'drop-form-void',
    title: 'FORM / VOID',
    tagline: '50 kinetic obsidian sculptures exploring zero-gravity physics and titanium fluids.',
    curatorStatement: 'Daniel Okafor dissects the boundaries of virtual mass. Form / Void delivers 50 unique kinetic simulations packaged with interactive 3D WebGL runtime tokens.',
    creator: mockCreators[1],
    coverImage: '/artworks/form_void_sculpture.jpg',
    releaseDate: 'September 24, 2026',
    totalEditions: 50,
    mintedEditions: 0,
    mintPrice: 1.20,
    contractAddress: '0x73a812D9eBc29B120c8aF460cE518104E90B0C21',
    phases: [
      { name: 'Vault Allowlist', price: 0.95, maxPerWallet: 1, startsAt: 'September 20, 2026', status: 'upcoming' },
      { name: 'Public Curation Release', price: 1.20, maxPerWallet: 2, startsAt: 'September 24, 2026', status: 'upcoming' }
    ],
    highlights: [
      'Interactive 3D WebGL Token Container',
      'Real-time simulation responsive to Ethereum block timestamps',
      'Proof of Authenticity on Arweave + IPFS dual decentralized storage'
    ],
    featuredArtworkIds: ['artwork-002', 'artwork-005'],
    status: 'upcoming'
  }
];
