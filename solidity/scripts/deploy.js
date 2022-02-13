const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contracts with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());

  const Dwittos = await hre.ethers.getContractFactory('Dwittos');
  const dwittos = await Dwittos.deploy();
  await dwittos.deployed();

  const Dwitter = await hre.ethers.getContractFactory('Dwitter');
  const dwitter = await Dwitter.deploy(dwittos.address);
  await dwitter.deployed();

  const Faucet = await hre.ethers.getContractFactory('Faucet');
  const faucet = await Faucet.deploy();
  await faucet.deployed();

  console.log('\n Dwittos address -> ', dwittos.address);
  console.log('\n Dwitter address -> ', dwitter.address);
  console.log('\n Faucet address  -> ', dwitter.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();