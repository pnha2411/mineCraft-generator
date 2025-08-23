// Block art procedural image generator for Minecraft and Pokemon styles
export interface GeneratorConfig {
  size: number;
  artStyle: 'minecraft' | 'pokemon';
  palette: 'classic' | 'nether' | 'end' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic';
  style: 'flat' | 'isometric';
  subject: string;
  seed?: number;
}

export interface BlockColor {
  name: string;
  color: string;
  shades: {
    light: string;
    base: string;
    dark: string;
  };
}

const MINECRAFT_PALETTES = {
  classic: [
    { name: 'grass', color: '#5F7C3B', shades: { light: '#7A9B4D', base: '#5F7C3B', dark: '#4A6129' } },
    { name: 'dirt', color: '#8B5A2B', shades: { light: '#A67033', base: '#8B5A2B', dark: '#6B441F' } },
    { name: 'stone', color: '#7F7F7F', shades: { light: '#999999', base: '#7F7F7F', dark: '#5F5F5F' } },
    { name: 'wood', color: '#9C7853', shades: { light: '#B8906B', base: '#9C7853', dark: '#7A5A3F' } },
    { name: 'leaves', color: '#4F7942', shades: { light: '#639154', base: '#4F7942', dark: '#3D5C32' } },
    { name: 'cobblestone', color: '#6B6B6B', shades: { light: '#808080', base: '#6B6B6B', dark: '#505050' } },
    { name: 'water', color: '#4F76E1', shades: { light: '#6B8EF5', base: '#4F76E1', dark: '#3B5AAB' } },
    { name: 'sand', color: '#DBD3A0', shades: { light: '#F0E9B8', base: '#DBD3A0', dark: '#C4BD89' } }
  ],
  nether: [
    { name: 'netherrack', color: '#723A3A', shades: { light: '#8B4848', base: '#723A3A', dark: '#5A2B2B' } },
    { name: 'lava', color: '#FF6B00', shades: { light: '#FF8533', base: '#FF6B00', dark: '#CC5500' } },
    { name: 'soul_sand', color: '#4B3A28', shades: { light: '#5F4A35', base: '#4B3A28', dark: '#382C1E' } },
    { name: 'obsidian', color: '#1A0A1A', shades: { light: '#2B1A2B', base: '#1A0A1A', dark: '#0F050F' } },
    { name: 'nether_brick', color: '#2D1B1B', shades: { light: '#3D2626', base: '#2D1B1B', dark: '#1F1212' } }
  ],
  end: [
    { name: 'end_stone', color: '#E0E09C', shades: { light: '#F0F0B8', base: '#E0E09C', dark: '#C4C489' } },
    { name: 'purpur', color: '#A96F9C', shades: { light: '#C285B8', base: '#A96F9C', dark: '#8B5A80' } },
    { name: 'void', color: '#000000', shades: { light: '#1A1A1A', base: '#000000', dark: '#000000' } },
    { name: 'chorus', color: '#6B3F6B', shades: { light: '#804F80', base: '#6B3F6B', dark: '#4F2F4F' } }
  ]
};

const POKEMON_PALETTES = {
  fire: [
    { name: 'flame_red', color: '#FF4500', shades: { light: '#FF6B33', base: '#FF4500', dark: '#CC3500' } },
    { name: 'ember_orange', color: '#FF8C00', shades: { light: '#FFB333', base: '#FF8C00', dark: '#CC7000' } },
    { name: 'coal_black', color: '#2F2F2F', shades: { light: '#4A4A4A', base: '#2F2F2F', dark: '#1A1A1A' } },
    { name: 'magma_yellow', color: '#FFD700', shades: { light: '#FFE433', base: '#FFD700', dark: '#CCAC00' } },
    { name: 'ash_gray', color: '#696969', shades: { light: '#808080', base: '#696969', dark: '#4F4F4F' } }
  ],
  water: [
    { name: 'ocean_blue', color: '#0066CC', shades: { light: '#3385E6', base: '#0066CC', dark: '#004499' } },
    { name: 'aqua_cyan', color: '#00CCFF', shades: { light: '#33D9FF', base: '#00CCFF', dark: '#0099CC' } },
    { name: 'pearl_white', color: '#F0F8FF', shades: { light: '#FFFFFF', base: '#F0F8FF', dark: '#D4E6FF' } },
    { name: 'deep_navy', color: '#191970', shades: { light: '#4169E1', base: '#191970', dark: '#0F0F47' } },
    { name: 'foam_green', color: '#98FB98', shades: { light: '#B8FFB8', base: '#98FB98', dark: '#7AE67A' } }
  ],
  grass: [
    { name: 'leaf_green', color: '#228B22', shades: { light: '#32CD32', base: '#228B22', dark: '#006400' } },
    { name: 'forest_dark', color: '#013220', shades: { light: '#228B22', base: '#013220', dark: '#001F14' } },
    { name: 'vine_lime', color: '#9ACD32', shades: { light: '#ADFF2F', base: '#9ACD32', dark: '#7BA428' } },
    { name: 'bark_brown', color: '#8B4513', shades: { light: '#D2691E', base: '#8B4513', dark: '#654321' } },
    { name: 'flower_pink', color: '#FFB6C1', shades: { light: '#FFCCCB', base: '#FFB6C1', dark: '#FF91A4' } }
  ],
  electric: [
    { name: 'lightning_yellow', color: '#FFFF00', shades: { light: '#FFFF66', base: '#FFFF00', dark: '#CCCC00' } },
    { name: 'spark_gold', color: '#FFD700', shades: { light: '#FFE55C', base: '#FFD700', dark: '#E6C200' } },
    { name: 'thunder_blue', color: '#1E90FF', shades: { light: '#87CEEB', base: '#1E90FF', dark: '#0000CD' } },
    { name: 'metal_silver', color: '#C0C0C0', shades: { light: '#E6E6FA', base: '#C0C0C0', dark: '#A9A9A9' } },
    { name: 'energy_purple', color: '#9370DB', shades: { light: '#BA55D3', base: '#9370DB', dark: '#663399' } }
  ],
  psychic: [
    { name: 'mystic_pink', color: '#FF1493', shades: { light: '#FF69B4', base: '#FF1493', dark: '#C71585' } },
    { name: 'mind_purple', color: '#8A2BE2', shades: { light: '#9932CC', base: '#8A2BE2', dark: '#4B0082' } },
    { name: 'aura_blue', color: '#4169E1', shades: { light: '#6495ED', base: '#4169E1', dark: '#0000CD' } },
    { name: 'cosmic_indigo', color: '#4B0082', shades: { light: '#663399', base: '#4B0082', dark: '#2F004F' } },
    { name: 'ethereal_white', color: '#F8F8FF', shades: { light: '#FFFFFF', base: '#F8F8FF', dark: '#E6E6FA' } }
  ]
};

const ALL_PALETTES = { ...MINECRAFT_PALETTES, ...POKEMON_PALETTES };

export class BlockArtGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: GeneratorConfig;

  constructor(config: GeneratorConfig) {
    this.config = config;
    this.canvas = document.createElement('canvas');
    this.canvas.width = config.size;
    this.canvas.height = config.size;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false; // Keep it pixelated
  }

  generate(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        this.clearCanvas();
        
        if (this.config.artStyle === 'pokemon') {
          this.generatePokemonArt();
        } else {
          this.generateMinecraftArt();
        }
        
        this.canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate image blob'));
          }
        }, 'image/png');
      } catch (error) {
        reject(error);
      }
    });
  }

  private clearCanvas() {
    const bgColor = this.config.artStyle === 'pokemon' ? '#E6F3FF' : '#87CEEB';
    this.ctx.fillStyle = bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private generateMinecraftArt() {
    if (this.config.style === 'isometric') {
      this.generateMinecraftIsometric();
    } else {
      this.generateMinecraftFlat();
    }
  }

  private generatePokemonArt() {
    if (this.config.style === 'isometric') {
      this.generatePokemonIsometric();
    } else {
      this.generatePokemonFlat();
    }
  }

  private generateMinecraftFlat() {
    const palette = ALL_PALETTES[this.config.palette as keyof typeof ALL_PALETTES];
    const blockSize = Math.floor(this.config.size / 16);
    const seed = this.config.seed || Date.now();
    
    // Simple seeded random function
    let rng = seed;
    const random = () => {
      rng = (rng * 9301 + 49297) % 233280;
      return rng / 233280;
    };

    // Generate a simple terrain-like pattern
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const noise = random();
        let blockType: BlockColor;
        
        // Generate different block types based on position and noise
        if (y < 4 && noise > 0.3) { // Sky area - occasional clouds
          continue; // Keep sky background
        } else if (y >= 12) { // Bottom area - stone/dirt
          blockType = random() > 0.5 ? palette[1] : palette[2]; // dirt or stone
        } else if (y >= 8) { // Middle area - mainly dirt
          blockType = palette[1]; // dirt
        } else { // Top area - grass and trees
          blockType = random() > 0.7 ? palette[4] : palette[0]; // leaves or grass
        }
        
        if (blockType) {
          this.drawBlock(x * blockSize, y * blockSize, blockSize, blockType);
        }
      }
    }
  }

  private generatePokemonFlat() {
    const palette = ALL_PALETTES[this.config.palette as keyof typeof ALL_PALETTES];
    const blockSize = Math.floor(this.config.size / 16);
    const seed = this.config.seed || Date.now();
    
    let rng = seed;
    const random = () => {
      rng = (rng * 9301 + 49297) % 233280;
      return rng / 233280;
    };

    // Generate Pokemon-style patterns with more organic shapes
    const centerX = 8;
    const centerY = 8;
    
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const noise = random();
        let blockType: BlockColor | null = null;
        
        // Create circular/organic patterns typical of Pokemon designs
        if (distFromCenter < 3 && noise > 0.2) {
          blockType = palette[0]; // Primary color in center
        } else if (distFromCenter < 5 && noise > 0.4) {
          blockType = palette[1]; // Secondary color
        } else if (distFromCenter < 7 && noise > 0.6) {
          blockType = palette[2]; // Tertiary color
        } else if (noise > 0.8) {
          blockType = palette[3]; // Accent spots
        }
        
        if (blockType) {
          this.drawBlock(x * blockSize, y * blockSize, blockSize, blockType);
        }
      }
    }
  }

  private generateMinecraftIsometric() {
    const palette = ALL_PALETTES[this.config.palette as keyof typeof ALL_PALETTES];
    const blockSize = Math.floor(this.config.size / 20);
    const seed = this.config.seed || Date.now();
    
    let rng = seed;
    const random = () => {
      rng = (rng * 9301 + 49297) % 233280;
      return rng / 233280;
    };

    // Generate a 3D-looking isometric scene
    for (let z = 0; z < 8; z++) {
      for (let x = 0; x < 8; x++) {
        const height = Math.floor(random() * 4) + 1;
        
        for (let y = 0; y < height; y++) {
          const blockType = y === height - 1 ? palette[0] : palette[1]; // grass on top, dirt below
          const screenX = (x - z) * blockSize + this.config.size / 2;
          const screenY = (x + z) * blockSize / 2 + y * blockSize / 2 + this.config.size / 4;
          
          this.drawIsometricBlock(screenX, screenY, blockSize, blockType);
        }
      }
    }
  }

  private generatePokemonIsometric() {
    const palette = ALL_PALETTES[this.config.palette as keyof typeof ALL_PALETTES];
    const blockSize = Math.floor(this.config.size / 16);
    const seed = this.config.seed || Date.now();
    
    let rng = seed;
    const random = () => {
      rng = (rng * 9301 + 49297) % 233280;
      return rng / 233280;
    };

    // Generate Pokemon-inspired 3D shapes
    for (let z = 0; z < 6; z++) {
      for (let x = 0; x < 6; x++) {
        const distFromCenter = Math.sqrt((x - 3) ** 2 + (z - 3) ** 2);
        if (distFromCenter < 3) {
          const height = Math.max(1, 4 - Math.floor(distFromCenter));
          
          for (let y = 0; y < height; y++) {
            const colorIndex = y === height - 1 ? 0 : Math.min(Math.floor(distFromCenter), palette.length - 1);
            const blockType = palette[colorIndex];
            const screenX = (x - z) * blockSize + this.config.size / 2;
            const screenY = (x + z) * blockSize / 2 + y * blockSize / 2 + this.config.size / 3;
            
            this.drawIsometricBlock(screenX, screenY, blockSize, blockType);
          }
        }
      }
    }
  }

  private drawBlock(x: number, y: number, size: number, blockType: BlockColor) {
    // Draw main block face
    this.ctx.fillStyle = blockType.shades.base;
    this.ctx.fillRect(x, y, size, size);
    
    // Add simple shading
    this.ctx.fillStyle = blockType.shades.light;
    this.ctx.fillRect(x, y, size, 2); // Top highlight
    this.ctx.fillRect(x, y, 2, size); // Left highlight
    
    this.ctx.fillStyle = blockType.shades.dark;
    this.ctx.fillRect(x, y + size - 2, size, 2); // Bottom shadow
    this.ctx.fillRect(x + size - 2, y, 2, size); // Right shadow
  }

  private drawIsometricBlock(x: number, y: number, size: number, blockType: BlockColor) {
    const halfSize = size / 2;
    
    // Draw top face (diamond shape)
    this.ctx.fillStyle = blockType.shades.light;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - halfSize);
    this.ctx.lineTo(x + halfSize, y - halfSize * 2);
    this.ctx.lineTo(x + size, y - halfSize);
    this.ctx.lineTo(x + halfSize, y);
    this.ctx.closePath();
    this.ctx.fill();
    
    // Draw left face
    this.ctx.fillStyle = blockType.shades.base;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - halfSize);
    this.ctx.lineTo(x + halfSize, y);
    this.ctx.lineTo(x + halfSize, y + halfSize);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.fill();
    
    // Draw right face
    this.ctx.fillStyle = blockType.shades.dark;
    this.ctx.beginPath();
    this.ctx.moveTo(x + halfSize, y);
    this.ctx.lineTo(x + size, y - halfSize);
    this.ctx.lineTo(x + size, y);
    this.ctx.lineTo(x + halfSize, y + halfSize);
    this.ctx.closePath();
    this.ctx.fill();
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}