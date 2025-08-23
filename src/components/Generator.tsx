import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2, Download, Palette } from 'lucide-react';
import { BlockArtGenerator, GeneratorConfig } from '@/lib/imageGenerator';
import { toast } from 'sonner';

interface GeneratorProps {
  onImageGenerated: (imageBlob: Blob, config: GeneratorConfig) => void;
}

export const Generator = ({ onImageGenerated }: GeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState<GeneratorConfig>({
    size: 512,
    artStyle: 'minecraft',
    palette: 'classic',
    style: 'flat',
    subject: 'castle'
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const generateImage = useCallback(async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const generator = new BlockArtGenerator(config);
      const imageBlob = await generator.generate();
      
      // Create preview URL
      const url = URL.createObjectURL(imageBlob);
      setPreviewUrl(url);
      
      onImageGenerated(imageBlob, config);
      const artType = config.artStyle === 'pokemon' ? 'Pokemon' : 'Minecraft';
      toast.success(`✨ ${artType} block art generated!`);
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Generation failed. Try again!');
    } finally {
      setIsGenerating(false);
    }
  }, [config, isGenerating, onImageGenerated]);

  const downloadImage = useCallback(() => {
    if (!previewUrl) return;
    
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `${config.artStyle}-${config.subject}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [previewUrl, config.subject, config.artStyle]);

  const getAvailablePalettes = () => {
    if (config.artStyle === 'pokemon') {
      return [
        { value: 'fire', label: '🔥 Fire Type' },
        { value: 'water', label: '💧 Water Type' },
        { value: 'grass', label: '🌱 Grass Type' },
        { value: 'electric', label: '⚡ Electric Type' },
        { value: 'psychic', label: '🔮 Psychic Type' }
      ];
    } else {
      return [
        { value: 'classic', label: '🌱 Classic (Overworld)' },
        { value: 'nether', label: '🔥 Nether' },
        { value: 'end', label: '🌌 The End' }
      ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card className="p-6 border-2 border-minecraft-cobblestone shadow-block bg-minecraft-wood/20">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-minecraft font-bold">Craft Your World</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label className="font-minecraft text-sm font-semibold">Art Style</Label>
            <Select 
              value={config.artStyle} 
              onValueChange={(value: 'minecraft' | 'pokemon') => {
                const newPalette = value === 'pokemon' ? 'fire' : 'classic';
                setConfig(prev => ({ ...prev, artStyle: value, palette: newPalette as any }));
              }}
            >
              <SelectTrigger className="font-minecraft border-2 border-minecraft-stone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minecraft">⛏️ Minecraft</SelectItem>
                <SelectItem value="pokemon">⚡ Pokemon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="font-minecraft text-sm font-semibold">
              Subject
            </Label>
            <Input
              id="subject"
              value={config.subject}
              onChange={(e) => setConfig(prev => ({ ...prev, subject: e.target.value }))}
              placeholder={config.artStyle === 'pokemon' ? 'Pikachu, Charizard...' : 'castle, tree, house...'}
              className="font-minecraft border-2 border-minecraft-stone"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-minecraft text-sm font-semibold">Palette</Label>
            <Select 
              value={config.palette} 
              onValueChange={(value) => 
                setConfig(prev => ({ ...prev, palette: value as any }))
              }
            >
              <SelectTrigger className="font-minecraft border-2 border-minecraft-stone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getAvailablePalettes().map(palette => (
                  <SelectItem key={palette.value} value={palette.value}>
                    {palette.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-minecraft text-sm font-semibold">Style</Label>
            <Select 
              value={config.style} 
              onValueChange={(value: 'flat' | 'isometric') => 
                setConfig(prev => ({ ...prev, style: value }))
              }
            >
              <SelectTrigger className="font-minecraft border-2 border-minecraft-stone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">📐 Flat (2D)</SelectItem>
                <SelectItem value="isometric">🎯 Isometric (3D)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-minecraft text-sm font-semibold">Size</Label>
            <Select 
              value={config.size.toString()} 
              onValueChange={(value) => 
                setConfig(prev => ({ ...prev, size: parseInt(value) }))
              }
            >
              <SelectTrigger className="font-minecraft border-2 border-minecraft-stone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256">256x256</SelectItem>
                <SelectItem value="512">512x512</SelectItem>
                <SelectItem value="1024">1024x1024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button 
            onClick={generateImage}
            disabled={isGenerating}
            className="btn-minecraft flex-1"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? 'Crafting...' : `Generate ${config.artStyle === 'pokemon' ? 'Pokemon' : 'Minecraft'} Art`}
          </Button>
          
          {previewUrl && (
            <Button 
              onClick={downloadImage}
              variant="secondary"
              className="border-2 border-minecraft-cobblestone shadow-block"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </Card>

      {/* Preview */}
      {previewUrl && (
        <Card className="p-6 border-2 border-minecraft-cobblestone shadow-block bg-minecraft-stone/10">
          <h3 className="text-lg font-minecraft font-bold mb-4 text-center">
            Your {config.artStyle === 'pokemon' ? 'Pokemon' : 'Blocky'} Creation
          </h3>
          <div className="flex justify-center">
            <div className="border-4 border-minecraft-cobblestone shadow-block-lg bg-minecraft-wood/20 p-2">
              <img 
                src={previewUrl}
                alt={`Generated ${config.artStyle} art`}
                className="pixelated max-w-full h-auto rounded-none"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};