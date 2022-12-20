pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // import for using openzeppelin/contracts

contract Token is ERC20 { // for inheritance
    address private bankContract;

    modifier onlyBank() {
        require(msg.sender == bankContract, "Only the bank can mint new Tokens!");
        _; // ! what's this ?
    }

    // ERC20("Yields Token", "FREE") is like super of the ERC20 constructor
    constructor(address _bankAddess) ERC20("Yields Token", "FREE"){
        bankContract = _bankAddess;
    }

    function mint(address to1, uint256 amount1) public onlyBank{
        _mint(to1, amount1);
    }
}
