import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Loader2, Coins, Upload, CheckCircle, ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/wallet';
import { ipfsUploader } from '@/lib/ipfs';
import { GeneratorConfig } from '@/lib/imageGenerator';
import { toast } from 'sonner';

interface MintPanelProps {
  imageBlob: Blob | null;
  config: GeneratorConfig | null;
}

interface MintingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export const MintPanel = ({ imageBlob, config }: MintPanelProps) => {
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [mintingProgress, setMintingProgress] = useState(0);
  const [txHash, setTxHash] = useState<string>('');
  const [tokenURI, setTokenURI] = useState<string>('');
  
  const [nftMetadata, setNftMetadata] = useState({
    name: '',
    description: '',
  });

  const [mintingSteps, setMintingSteps] = useState<MintingStep[]>([
    { id: 1, title: 'Upload Image', description: 'Storing your art on IPFS', completed: false, current: false },
    { id: 2, title: 'Create Metadata', description: 'Generating NFT metadata', completed: false, current: false },
    { id: 3, title: 'Mint NFT', description: 'Creating your NFT on blockchain', completed: false, current: false },
    { id: 4, title: 'Complete', description: 'Your NFT is ready!', completed: false, current: false }
  ]);

  const { writeContract, data: hash, isError, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const updateStep = (stepId: number, completed: boolean, current: boolean = false) => {
    setMintingSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, completed, current }
        : { ...step, current: false }
    ));
  };

  const handleMint = async () => {
    if (!imageBlob || !config || !address) {
      toast.error('Missing required data for minting');
      return;
    }

    if (!nftMetadata.name.trim()) {
      toast.error('Please enter a name for your NFT');
      return;
    }

    setIsMinting(true);
    setMintingProgress(0);

    try {
      // Step 1: Upload image to IPFS
      updateStep(1, false, true);
      setMintingProgress(25);
      
      const imageUrl = await ipfsUploader.uploadImage(
        imageBlob, 
        `${nftMetadata.name.replace(/\s+/g, '-').toLowerCase()}.png`
      );
      
      updateStep(1, true);
      toast.success('Image uploaded to IPFS!');

      // Step 2: Create and upload metadata
      updateStep(2, false, true);
      setMintingProgress(50);
      
      const metadata = {
        name: nftMetadata.name,
        description: nftMetadata.description || `A Minecraft-style ${config.subject} generated with ${config.palette} palette in ${config.style} style.`,
        image: imageUrl,
        attributes: [
          { trait_type: 'Subject', value: config.subject },
          { trait_type: 'Palette', value: config.palette },
          { trait_type: 'Style', value: config.style },
          { trait_type: 'Size', value: config.size },
          { trait_type: 'Generator', value: 'Minecraft NFT Forge' },
        ],
      };

      const metadataUri = await ipfsUploader.uploadMetadata(metadata);
      setTokenURI(metadataUri);
      
      updateStep(2, true);
      toast.success('Metadata created!');

      // Step 3: Mint NFT
      updateStep(3, false, true);
      setMintingProgress(75);
      
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintWithTokenURI',
        args: [address, metadataUri],
      } as any); // Temporary fix for wagmi typing issues

      // Transaction submitted, wait for confirmation
      if (hash) {
        setTxHash(hash);
        updateStep(3, true);
        updateStep(4, true);
        setMintingProgress(100);
        toast.success('🎉 NFT minted successfully!');
      }
      
    } catch (error) {
      console.error('Minting failed:', error);
      toast.error('Minting failed. Please try again.');
      setMintingSteps(prev => prev.map(step => ({ ...step, current: false })));
    } finally {
      setIsMinting(false);
    }
  };

  // Handle transaction confirmation
  if (isSuccess && hash && !txHash) {
    setTxHash(hash);
    updateStep(3, true);
    updateStep(4, true);
    setMintingProgress(100);
    toast.success('🎉 NFT minted successfully!');
  }

  if (isError && error) {
    toast.error(`Transaction failed: ${error.message}`);
  }

  const canMint = imageBlob && config && address && nftMetadata.name.trim();

  return (
    <Card className="p-6 border-2 border-minecraft-cobblestone shadow-block bg-minecraft-emerald/10">
      <div className="flex items-center gap-2 mb-6">
        <Coins className="w-6 h-6 text-minecraft-emerald" />
        <h2 className="text-xl font-minecraft font-bold">Mint Your NFT</h2>
      </div>

      {!address ? (
        <div className="text-center py-8">
          <p className="font-minecraft text-muted-foreground mb-4">
            Connect your wallet to mint NFTs
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* NFT Metadata Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="nft-name" className="font-minecraft text-sm font-semibold">
                NFT Name *
              </Label>
              <Input
                id="nft-name"
                value={nftMetadata.name}
                onChange={(e) => setNftMetadata(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My Blocky Castle"
                className="font-minecraft border-2 border-minecraft-stone"
              />
            </div>

            <div>
              <Label htmlFor="nft-description" className="font-minecraft text-sm font-semibold">
                Description (Optional)  
              </Label>
              <Textarea
                id="nft-description"
                value={nftMetadata.description}
                onChange={(e) => setNftMetadata(prev => ({ ...prev, description: e.target.value }))}
                placeholder="A beautiful Minecraft-style creation..."
                className="font-minecraft border-2 border-minecraft-stone resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Minting Progress */}
          {(isMinting || isConfirming) && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-minecraft">
                  <span>Minting Progress</span>
                  <span>{mintingProgress}%</span>
                </div>
                <Progress value={mintingProgress} className="h-2" />
              </div>

              <div className="space-y-2">
                {mintingSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 border-2 font-minecraft text-sm ${
                      step.completed
                        ? 'bg-success/20 border-success'
                        : step.current
                        ? 'bg-warning/20 border-warning'
                        : 'bg-muted/20 border-muted'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : step.current ? (
                      <Loader2 className="w-4 h-4 animate-spin text-warning" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted" />
                    )}
                    <div>
                      <div className="font-semibold">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success State */}
          {(txHash || hash) && mintingSteps[3].completed && (
            <div className="bg-success/20 border-2 border-success p-4 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-minecraft font-bold">NFT Minted Successfully!</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-minecraft">Transaction:</span>
                  <a 
                    href={`https://etherscan.io/tx/${txHash || hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline flex items-center gap-1 font-mono"
                  >
                    {(txHash || hash)?.slice(0, 10)}...{(txHash || hash)?.slice(-8)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                
                {tokenURI && (
                  <div className="flex items-center gap-2">
                    <span className="font-minecraft">Metadata:</span>
                    <a 
                      href={tokenURI}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline flex items-center gap-1 font-mono text-xs"
                    >
                      View on IPFS
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mint Button */}
          <Button
            onClick={handleMint}
            disabled={!canMint || isMinting || isConfirming}
            className="w-full btn-minecraft"
          >
            {isMinting || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isMinting ? 'Minting...' : 'Confirming...'}
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Mint NFT
              </>
            )}
          </Button>

          {!imageBlob && (
            <p className="text-center text-sm text-muted-foreground font-minecraft">
              Generate an image first to enable minting
            </p>
          )}
        </div>
      )}
    </Card>
  );
};