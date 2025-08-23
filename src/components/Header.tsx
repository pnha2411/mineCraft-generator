import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Pickaxe } from 'lucide-react';

export const Header = () => {
  return (
    <header className="w-full bg-gradient-minecraft border-b-4 border-minecraft-cobblestone p-4 shadow-block">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-minecraft-dirt border-2 border-minecraft-cobblestone shadow-block flex items-center justify-center">
            <Pickaxe className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-minecraft font-bold text-primary-foreground">
              Block Art NFT Forge
            </h1>
            <p className="text-sm text-primary-foreground/80 font-minecraft">
              Generate Minecraft & Pokemon → Mint → Share
            </p>
          </div>
        </div>
        
        <div className="bg-card/90 p-2 shadow-block border-2 border-minecraft-cobblestone">
          <ConnectButton 
            chainStatus="icon"
            accountStatus="avatar"
            showBalance={false}
          />
        </div>
      </div>
    </header>
  );
};