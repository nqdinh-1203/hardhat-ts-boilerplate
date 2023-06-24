// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract DemoUpgradeableV2 is Initializable {
    int256 testNumber;
    address owner;

    // function initialize(int256 _num) external initializer {
    //     testNumber = _num;
    // }

    function getNumber() public view returns (int256) {
        return testNumber;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function setNumber(int256 number) public {
        testNumber = number;
    }

    function increaseNumber() public {
        testNumber++;
    }
}
