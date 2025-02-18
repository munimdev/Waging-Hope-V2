// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LAPhoenixNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 public constant MAX_SUPPLY = 800;
    uint256 public constant MINT_PRICE = 0.03 ether;
    string private constant BASE_URI = "https://gateway.lighthouse.storage/ipfs/bafybeiha2abpfkix2cytxw4x3t2yoywic5p6446d4n7jzut6yh65qtab6a/LAPhoenixNFT/";

    event NFTMinted(address indexed to, uint256 indexed tokenId);

    constructor() ERC721("LA Phoenix", "PHOENIX") Ownable(msg.sender) {}

    function mint(uint256 tokenId) public payable {
        require(msg.value >= MINT_PRICE, "Insufficient payment");
        require(tokenId > 0 && tokenId <= MAX_SUPPLY, "Invalid token ID");
        
        // Check if token already exists
        try this.ownerOf(tokenId) returns (address) {
            revert("Token already minted");
        } catch {
            _safeMint(msg.sender, tokenId);
            _setTokenURI(tokenId, string(abi.encodePacked(Strings.toString(tokenId), ".json")));
            emit NFTMinted(msg.sender, tokenId);
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return BASE_URI;
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