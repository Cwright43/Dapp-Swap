// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory('Token')

  // Deploy Token 1
  let dapp = await Token.deploy('Dapp Token', 'DAPP', '1000000') // 1 million tokens
  await dapp.deployed()
  console.log(`Dapp Token deployed to: ${dapp.address}\n`)

  // Deploy Token 2
  const usd = await Token.deploy('USD Token', 'USD', '1000000') // 1 million tokens
  await usd.deployed()
  console.log(`USD Token deployed to: ${usd.address}\n`)


  // Deploy AMM, Appleswap, Aggregator
  const AMM = await hre.ethers.getContractFactory('AMM')
  const Aggregator = await hre.ethers.getContractFactory('Aggregator')

  const amm = await AMM.deploy(dapp.address, usd.address)
  const appleswap = await AMM.deploy(dapp.address, usd.address)
  const aggregator = await Aggregator.deploy(dapp.address, usd.address)

  console.log(`DApp Swap contract deployed to: ${amm.address}\n`)
  console.log(`AppleSwap contract deployed to: ${appleswap.address}\n`)
  console.log(`Aggregator contract deployed to: ${aggregator.address}\n`)

  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
