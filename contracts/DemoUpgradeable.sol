// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract DemoUpgradeable is Initializable {
    int256 testNumber;

    function initialize() external initializer {
        testNumber = 0;
    }

    function getNumber() public view returns (int256) {
        return testNumber;
    }

    function setNumber(int256 number) public {
        testNumber = number;
    }
}
