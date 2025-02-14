// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ImagineShalomNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 public constant MAX_SUPPLY = 500;
    uint256 public constant MINT_PRICE = 0.03 ether;
    string private _baseTokenURI;

    event NFTMinted(address indexed to, uint256 indexed tokenId);

    constructor(string memory baseURI) ERC721("Imagine Shalom", "SHALOM") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    function mint(uint256 tokenId) public payable {
        require(msg.value >= MINT_PRICE, "Insufficient payment");
        require(tokenId < MAX_SUPPLY, "Token ID exceeds max supply");
        
        // Check if token already exists
        try this.ownerOf(tokenId) returns (address) {
            revert("Token already minted");
        } catch {
            _safeMint(msg.sender, tokenId);
            emit NFTMinted(msg.sender, tokenId);
        }
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    // Required overrides
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 