import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_TOKEN = import.meta.env.VITE_NFT_STORAGE_API_KEY || '';

export class IPFSUploader {
  private client: NFTStorage;

  constructor() {
    this.client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  }

  async uploadImage(imageBlob: Blob, filename: string): Promise<string> {
    try {
      const imageFile = new File([imageBlob], filename, { type: 'image/png' });
      const cid = await this.client.storeBlob(imageFile);
      return `https://nftstorage.link/ipfs/${cid}`;
    } catch (error) {
      console.error('Failed to upload image to IPFS:', error);
      throw new Error('Failed to upload image to IPFS');
    }
  }

  async uploadMetadata(metadata: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{ trait_type: string; value: string | number }>;
  }): Promise<string> {
    try {
      const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
        type: 'application/json',
      });
      const metadataFile = new File([metadataBlob], 'metadata.json', {
        type: 'application/json',
      });
      const cid = await this.client.storeBlob(metadataFile);
      return `https://nftstorage.link/ipfs/${cid}`;
    } catch (error) {
      console.error('Failed to upload metadata to IPFS:', error);
      throw new Error('Failed to upload metadata to IPFS');
    }
  }
}

export const ipfsUploader = new IPFSUploader();