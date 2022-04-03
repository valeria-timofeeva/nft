import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, network } from "hardhat";
import { SealCollection1155 } from "../typechain";

describe("Seal Collection erc1155", function () {

  let sealCollectionContract: SealCollection1155;
  let clean: any;
  let owner: SignerWithAddress;

  async function deployContract() {
    const SealCollectionFactory = await ethers.getContractFactory("SealCollection1155")
    sealCollectionContract = await SealCollectionFactory.deploy();
    await sealCollectionContract.deployed();
    console.log("Contract deployed with name: ${name}, symbol: ${symbol}");
  }

  before(async () => {
    [owner] = await ethers.getSigners();

    await deployContract();

    clean = await network.provider.request({
      method: "evm_snapshot",
      params: [],
    });
  });

  afterEach(async () => {
    await network.provider.request({
      method: "evm_revert",
      params: [clean],
    });
    clean = await network.provider.request({
      method: "evm_snapshot",
      params: [],
    });
  });

  describe("Deploy", function () {
    it("Should set owner", async function () {
      expect(await sealCollectionContract.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {

    it("Should mint token for address", async function () {
      await sealCollectionContract.mint(owner.address, 1, 1);
      expect(await sealCollectionContract.balanceOf(owner.address, 1)).to.equal(1);
    });
  });

  describe("Set token uri", function () {

    let tokenURI = "test URI";

    it("Should mint token for address", async function () {
      await sealCollectionContract.setURI(tokenURI);
      expect(await sealCollectionContract.uri(0)).to.equal(tokenURI);
    });
  });

  describe("Mint batch", function () {

    it("Should mint token for address", async function () {
      await sealCollectionContract.mintBatch(owner.address, [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]);

      for (let x = 1; x < 6; x++) {
        expect(await sealCollectionContract.balanceOf(owner.address, x)).to.equal(x);
      }
    });
  });
});
