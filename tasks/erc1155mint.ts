import { task } from "hardhat/config";

const contractInfo = require('./DeployedSealContracts1155.json');

task("mintSeal1155", "Mint nft")
    .addParam("account", "Target address")
    .addParam("tokenid", "Token id")
    .addParam("amount", "Tokens amount")
    .setAction(async (taskArgs, hre) => {
        let instance = await hre.ethers.getContractAt("SealCollection1155", contractInfo.sealCollectionAddress);
        let tx = await instance.mint(taskArgs.account, taskArgs.tokenid, taskArgs.amount);
        tx.wait();

        console.log("Transaction minted: ", tx);
    });

module.exports = {};