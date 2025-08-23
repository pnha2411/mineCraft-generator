const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MinecraftNFT", function () {
  let minecraftNFT;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    const MinecraftNFT = await ethers.getContractFactory("MinecraftNFT");
    minecraftNFT = await MinecraftNFT.deploy(owner.address);
    await minecraftNFT.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await minecraftNFT.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await minecraftNFT.name()).to.equal("MinecraftNFT");
      expect(await minecraftNFT.symbol()).to.equal("MCNFT");
    });

    it("Should start with token counter at 1", async function () {
      expect(await minecraftNFT.getCurrentTokenId()).to.equal(1);
    });
  });

  describe("Minting", function () {
    const tokenURI = "ipfs://QmTest123/metadata.json";

    it("Should mint NFT with tokenURI", async function () {
      await minecraftNFT.mintWithTokenURI(addr1.address, tokenURI);
      
      expect(await minecraftNFT.ownerOf(1)).to.equal(addr1.address);
      expect(await minecraftNFT.tokenURI(1)).to.equal(tokenURI);
      expect(await minecraftNFT.getCurrentTokenId()).to.equal(2);
    });

    it("Should increment token counter", async function () {
      await minecraftNFT.mintWithTokenURI(addr1.address, tokenURI);
      await minecraftNFT.mintWithTokenURI(addr2.address, tokenURI);
      
      expect(await minecraftNFT.getCurrentTokenId()).to.equal(3);
      expect(await minecraftNFT.totalSupply()).to.equal(2);
    });

    it("Should emit NFTMinted event", async function () {
      await expect(minecraftNFT.mintWithTokenURI(addr1.address, tokenURI))
        .to.emit(minecraftNFT, "NFTMinted")
        .withArgs(addr1.address, 1, tokenURI);
    });
  });

  describe("Owner Functions", function () {
    const tokenURI = "ipfs://QmTest123/metadata.json";

    it("Should allow owner to mint", async function () {
      await minecraftNFT.ownerMint(addr1.address, tokenURI);
      
      expect(await minecraftNFT.ownerOf(1)).to.equal(addr1.address);
      expect(await minecraftNFT.tokenURI(1)).to.equal(tokenURI);
    });

    it("Should not allow non-owner to call ownerMint", async function () {
      await expect(
        minecraftNFT.connect(addr1).ownerMint(addr2.address, tokenURI)
      ).to.be.revertedWithCustomError(minecraftNFT, "OwnableUnauthorizedAccount");
    });
  });

  describe("View Functions", function () {
    it("Should return correct total supply", async function () {
      expect(await minecraftNFT.totalSupply()).to.equal(0);
      
      await minecraftNFT.mintWithTokenURI(addr1.address, "test1");
      expect(await minecraftNFT.totalSupply()).to.equal(1);
      
      await minecraftNFT.mintWithTokenURI(addr2.address, "test2");
      expect(await minecraftNFT.totalSupply()).to.equal(2);
    });
  });
});