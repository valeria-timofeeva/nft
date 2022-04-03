// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SealCollection1155 is ERC1155, Ownable {
    uint256 public constant PETER = 1;
    uint256 public constant ADAM = 2;
    uint256 public constant KATY = 3;
    uint256 public constant PUPI = 4;
    uint256 public constant BERG = 5;

    constructor()
        ERC1155(
            "https://gateway.pinata.cloud/ipfs/QmYc9eU8qz5AmGHVuD8E2Y4pKSD18nnTwLRtVxE4kZpxCW/tulen_{id}.json"
        )
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        _mint(account, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, "");
    }
}
