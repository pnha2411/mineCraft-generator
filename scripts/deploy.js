const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying MinecraftNFT contract...");

  // Get the ContractFactory and Signers
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("💰 Account balance:", ethers.utils.formatEther(balance), "ETH");

  // Deploy the contract
  const MinecraftNFT = await ethers.getContractFactory("MinecraftNFT");
  const minecraftNFT = await MinecraftNFT.deploy(deployer.address);

  await minecraftNFT.deployed();

  console.log("✅ MinecraftNFT deployed to:", minecraftNFT.address);
  console.log("🔧 Owner address:", deployer.address);

  // Verify deployment
  console.log("\n📋 Contract Deployment Summary:");
  console.log("Contract Address:", minecraftNFT.address);
  console.log("Network:", network.name);
  console.log("Block Number:", await ethers.provider.getBlockNumber());
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: minecraftNFT.address,
    ownerAddress: deployer.address,
    network: network.name,
    deploymentTime: new Date().toISOString(),
    blockNumber: await ethers.provider.getBlockNumber(),
  };

  console.log("\n🔗 Add this to your .env file:");
  console.log(`VITE_CONTRACT_ADDRESS=${minecraftNFT.address}`);

  console.log("\n⚠️  Don't forget to:");
  console.log("1. Update src/lib/wallet.ts with the new contract address");
  console.log("2. Verify the contract on Etherscan if deploying to mainnet");
  console.log("3. Test minting functionality");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });