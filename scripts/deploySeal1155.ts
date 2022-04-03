// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const SealCollectionFactory = await ethers.getContractFactory("SealCollection1155");
  const sealCollectionContract = await SealCollectionFactory.deploy();

  await sealCollectionContract.deployed();

  console.log("Seal deployed to:", sealCollectionContract.address);
  const contracts = {
    sealCollectionAdress: sealCollectionContract.address,
  };

  fs.writeFile("./tasks/DeployedSealContracts.json", JSON.stringify(contracts), (err) => {
    if (err) throw err;
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
