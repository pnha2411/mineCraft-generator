import { useState } from 'react';
import { Header } from '@/components/Header';
import { Generator } from '@/components/Generator';
import { MintPanel } from '@/components/MintPanel';
import { ShareModal } from '@/components/ShareModal';
import { GeneratorConfig } from '@/lib/imageGenerator';

const Index = () => {
  const [generatedImage, setGeneratedImage] = useState<Blob | null>(null);
  const [imageConfig, setImageConfig] = useState<GeneratorConfig | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageGenerated = (imageBlob: Blob, config: GeneratorConfig) => {
    setGeneratedImage(imageBlob);
    setImageConfig(config);
    
    // Create preview URL for sharing
    const url = URL.createObjectURL(imageBlob);
    setImageUrl(url);
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-minecraft font-bold text-primary-foreground">
            Craft Your World
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-minecraft max-w-2xl mx-auto">
            Generate blocky Minecraft-style art with AI, mint as NFTs, and share your creations with the world! ⛏️✨
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Generator */}
          <div className="space-y-6">
            <Generator onImageGenerated={handleImageGenerated} />
          </div>

          {/* Right Column - Mint & Share */}
          <div className="space-y-6">
            <MintPanel imageBlob={generatedImage} config={imageConfig} />
            
            {generatedImage && (
              <div className="flex justify-center">
                <ShareModal
                  imageUrl={imageUrl}
                  nftName={imageConfig?.subject || 'Minecraft Creation'}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t-2 border-minecraft-cobblestone">
          <img
            src="/btcfistation.png"
            alt="BTCFi Station"
            className="mx-auto mb-2 w-12 h-12"
          />
          <p className="text-sm text-muted-foreground font-minecraft">
            Built with ⚡ Vite + React + Tailwind + RainbowKit + IPFS
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
