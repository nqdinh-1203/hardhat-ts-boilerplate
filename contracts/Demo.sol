// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Demo {
    int256 testNumber;
    address owner;

    constructor(int256 _num) {
        testNumber = _num;
        owner = msg.sender;
    }

    function getNumber() public view returns (int256) {
        return testNumber;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    function setNumber(int256 number) public {
        testNumber = number;
    }
}
