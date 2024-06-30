// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleCounter{
    uint256 private counter; 
    address private owner; 

    constructor() {
        counter = 0;
        owner = msg.sender;
    }

    function increment() public payable{
        require(owner == msg.sender, "You are not authorized");
        counter += 1;
    }

    function decrement() public payable{
        require(owner == msg.sender, "You are not authorized");
        counter -= 1;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }

    function setValue(uint256 _num) public payable{
        require(owner == msg.sender, "You are not authorized");
        counter = 0;
        counter = _num;
    }
}
// 0x6dd36640bcba8ff51e522616c15f52b43eb2a6ab