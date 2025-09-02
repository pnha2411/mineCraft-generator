import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Download, ExternalLink, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  imageUrl?: string;
  txHash?: string;
  tokenURI?: string;
  nftName?: string;
}

export const ShareModal = ({ imageUrl, txHash, tokenURI, nftName }: ShareModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = window.location.href;
  const twitterText = `Just minted a Minecraft-style NFT "${nftName}" with Minecraft NFT Forge! 🎮⛏️✨`;
  const telegramText = `Check out my new Minecraft-style NFT: "${nftName}" 🎮⛏️`;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${nftName || 'minecraft-nft'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded!');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareToTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(telegramText)}`;
    window.open(url, '_blank');
  };

  if (!imageUrl && !txHash) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-minecraft">
          <Share2 className="w-4 h-4 mr-2" />
          Share NFT
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md border-2 border-minecraft-cobblestone shadow-block-lg bg-card">
        <DialogHeader>
          <DialogTitle className="font-minecraft text-lg">Share Your Creation</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Preview */}
          {imageUrl && (
            <div className="text-center">
              <div className="inline-block border-2 border-minecraft-cobblestone shadow-block bg-minecraft-wood/20 p-2">
                <img 
                  src={imageUrl}
                  alt={nftName || 'NFT'}
                  className="pixelated w-32 h-32 object-cover"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <p className="mt-2 font-minecraft font-semibold">{nftName}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={shareToTwitter}
                variant="outline"
                className="border-2 border-minecraft-stone shadow-block text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
                Twitter
              </Button>
              
              <Button
                onClick={shareToTelegram}
                variant="outline"
                className="border-2 border-minecraft-stone shadow-block text-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Telegram
              </Button>
            </div>

            {imageUrl && (
              <Button
                onClick={downloadImage}
                variant="outline"
                className="w-full border-2 border-minecraft-stone shadow-block"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            )}

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="font-mono text-xs border-2 border-minecraft-stone"
                />
                <Button
                  onClick={() => copyToClipboard(shareUrl, 'Link')}
                  size="sm"
                  variant="outline"
                  className="border-2 border-minecraft-stone"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {txHash && (
              <div className="pt-3 border-t-2 border-minecraft-stone space-y-2">
                <div className="text-sm font-minecraft font-semibold">Transaction Details:</div>
                <div className="flex gap-2">
                  <Input
                    value={`https://chainscan-galileo.0g.ai/tx/${txHash}`}
                    readOnly
                    className="font-mono text-xs border-2 border-minecraft-stone"
                  />
                  <Button
                    onClick={() => copyToClipboard(`https://chainscan-galileo.0g.ai/tx/${txHash}`, 'Transaction link')}
                    size="sm"
                    variant="outline"
                    className="border-2 border-minecraft-stone"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => window.open(`https://chainscan-galileo.0g.ai/tx/${txHash}`, '_blank')}
                    size="sm"
                    variant="outline"
                    className="border-2 border-minecraft-stone"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {tokenURI && (
              <div className="text-xs text-muted-foreground text-center font-minecraft">
                <a 
                  href={tokenURI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center justify-center gap-1"
                >
                  View metadata on IPFS
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};