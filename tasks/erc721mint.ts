import { task } from "hardhat/config";

const contractInfo = require('./DeployedSealContracts721.json');

task("mintSeal721", "Mint nft")
    .addParam("address", "Address to")
    .addParam("uri", "Token uri")
    .setAction(async (taskArgs, hre) => {
        let instance = await hre.ethers.getContractAt("SealCollection721", contractInfo.sealCollectionAddress);
        let tx = await instance.safeMint(taskArgs.address, taskArgs.uri);
        tx.wait();

        console.log("Transaction minted: ", tx);
    });

module.exports = {};