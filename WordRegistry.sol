// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WordRegistry {
    address public owner;
    string[] public words;

    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can add words.");
        _;
    }

    function addWord(string memory newWord) public onlyOwner {
        words.push(newWord);
    }

    function getWordCount() public view returns (uint256) {
        return words.length;
    }

    function getWord(uint256 index) public view returns (string memory) {
        require(index < words.length, "Index out of bounds.");
        return words[index];
    }
}
