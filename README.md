# 🎮 Minecraft NFT Forge

A production-ready Minecraft-style NFT generator and minting dapp built with React, TypeScript, and blockchain integration.

## ✨ Features

- **🎨 Procedural Art Generation**: Create unique Minecraft-style blocky art with customizable palettes and styles
- **🔗 Wallet Integration**: Connect with any EVM wallet using RainbowKit
- **📦 IPFS Storage**: Upload images and metadata to IPFS via nft.storage
- **🪙 NFT Minting**: Mint ERC-721 tokens on Ethereum and compatible networks
- **📱 Responsive Design**: Beautiful UI that works on desktop and mobile
- **🎯 Share & Export**: Download images and share your creations on social media

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Blockchain**: wagmi, RainbowKit, viem
- **Storage**: IPFS via nft.storage
- **Smart Contract**: Solidity ERC-721 with OpenZeppelin
- **UI Components**: Radix UI primitives with custom Minecraft-themed styling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- An EVM wallet (MetaMask, etc.)
- NFT.Storage API key
- WalletConnect Project ID

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd minecraft-nft-dapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your API keys:
   ```env
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
   VITE_NFT_STORAGE_API_KEY=your_nft_storage_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🎯 How to Use

1. **Connect Wallet**: Click the connect button in the header
2. **Generate Art**: 
   - Choose a subject (castle, tree, house, etc.)
   - Select palette (Classic, Nether, End dimensions)
   - Pick style (Flat 2D or Isometric 3D)
   - Set resolution (256x256 to 1024x1024)
   - Click "Generate Block Art"
3. **Mint NFT**:
   - Enter a name for your NFT
   - Add description (optional)
   - Click "Mint NFT"
   - Confirm transaction in your wallet
4. **Share**: Use the share modal to download or share on social media

## 🏗️ Architecture

### Frontend Components

- `Header.tsx` - Wallet connection and branding
- `Generator.tsx` - Art generation controls and preview
- `MintPanel.tsx` - NFT minting interface with progress tracking
- `ShareModal.tsx` - Social sharing and download options

### Core Libraries

- `imageGenerator.ts` - Procedural Minecraft-style art generation
- `ipfs.ts` - IPFS upload functionality
- `wallet.ts` - Blockchain configuration and contract ABI

### Smart Contract

- `MinecraftNFT.sol` - ERC-721 contract with `mintWithTokenURI` function
- Deployed on Ethereum testnet/mainnet
- Supports batch minting and owner privileges

## 🎨 Design System

The app uses a custom Minecraft-inspired design system with:

- **Colors**: Earth tones (grass green, dirt brown, stone gray, sky blue)
- **Typography**: Monospace fonts with pixelated styling
- **Components**: Blocky shadows, sharp edges, no rounded corners
- **Animations**: Subtle hover effects with block-style transforms

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
├── lib/                # Utility libraries
├── pages/              # Page components
└── index.css           # Design system & styles

contracts/
└── MinecraftNFT.sol    # Smart contract

public/                 # Static assets
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Frontend Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy from `dist` folder

### Smart Contract Deployment

1. **Install Hardhat** (if adding contract deployment)
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
   ```

2. **Deploy contract**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. **Update contract address**
   - Copy deployed address to `src/lib/wallet.ts`
   - Update `.env` file

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID | Yes |
| `VITE_NFT_STORAGE_API_KEY` | nft.storage API key for IPFS | Yes |
| `VITE_IMAGE_API_PROVIDER` | AI image provider (openai/replicate) | No |
| `VITE_IMAGE_API_KEY` | AI image generation API key | No |
| `VITE_CONTRACT_ADDRESS` | Deployed NFT contract address | Yes |

## 🧪 Testing

The app includes basic integration tests for:

- Wallet connection functionality
- Image generation (multiple outputs)
- IPFS upload process
- Smart contract interaction

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🎮 About Minecraft Aesthetics

This dapp generates art inspired by Minecraft's iconic blocky, pixelated style:

- **Voxel-based**: Everything is made of blocks/cubes
- **Limited palette**: Uses Minecraft's signature color schemes
- **Isometric views**: Optional 3D perspective rendering
- **Pixelated textures**: Sharp, unsmoothed graphics for retro feel

## 🔗 Links

- [nft.storage](https://nft.storage/) - IPFS storage service
- [RainbowKit](https://www.rainbowkit.com/) - Wallet connection library  
- [wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [OpenZeppelin](https://openzeppelin.com/) - Smart contract library

---

Built with ❤️ for the Minecraft and NFT communities!