import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, network } from "hardhat";
import { SealCollection721 } from "../typechain/SealCollection721";


describe("Seal Collection erc721", function () {

  let sealCollectionContract: SealCollection721;
  const name = "Seal Collection erc721";
  const symbol = "SCN";
  let clean: any;
  let owner: SignerWithAddress;
  let tokenURI = "test URI";

  async function deployContract() {
    const SealCollectionFactory = await ethers.getContractFactory("SealCollection721")
    sealCollectionContract = await SealCollectionFactory.deploy(name, symbol);
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
    it("Should set name and symbol", async function () {
      expect(await sealCollectionContract.name()).to.equal(name);
      expect(await sealCollectionContract.symbol()).to.equal(symbol);
    });
  });

  describe("Burn", function () {
    it("Should burn token", async function () {
      await sealCollectionContract.safeMint(owner.address, tokenURI);
      await sealCollectionContract.burn(0)
      expect(await sealCollectionContract.balanceOf(owner.address)).to.equal(0);
    });
  });

  describe("Mint", function () {
    it("Should mint token for address", async function () {
      await sealCollectionContract.safeMint(owner.address, tokenURI);
      expect(await sealCollectionContract.balanceOf(owner.address)).to.equal(1);
      expect(await sealCollectionContract.ownerOf(0)).to.equal(owner.address);
      expect(await sealCollectionContract.tokenURI(0)).to.equal("test URI");
    });
  });
});
