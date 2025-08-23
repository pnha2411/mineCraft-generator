import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet, polygon, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Minecraft NFT Generator',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [sepolia, mainnet, polygon, base],
  ssr: false, // Using Vite, not Next.js
});

export const CONTRACT_ADDRESS = '0x742d35Cc6645C0532F97c51A77dF3ad6d4f6e0e6' as const; // Placeholder
export const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "string", "name": "tokenURI", "type": "string" }
    ],
    "name": "mintWithTokenURI",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "tokenURI",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const;