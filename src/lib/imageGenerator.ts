// Minecraft-style procedural image generator
export interface GeneratorConfig {
  size: number;
  palette: 'classic' | 'nether' | 'end';
  style: 'flat' | 'isometric';
  subject: string;
  seed?: number;
}

export interface MinecraftColor {
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

export class MinecraftImageGenerator {
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
        
        if (this.config.style === 'isometric') {
          this.generateIsometric();
        } else {
          this.generateFlat();
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
    this.ctx.fillStyle = '#87CEEB'; // Sky blue background
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private generateFlat() {
    const palette = MINECRAFT_PALETTES[this.config.palette];
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
        let blockType: MinecraftColor;
        
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

  private generateIsometric() {
    const palette = MINECRAFT_PALETTES[this.config.palette];
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

  private drawBlock(x: number, y: number, size: number, blockType: MinecraftColor) {
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

  private drawIsometricBlock(x: number, y: number, size: number, blockType: MinecraftColor) {
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