import { ethers, hardhatArguments } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
// import { getContract, ContractAddress } from '../utils/contract'
import hre from 'hardhat'
import * as Config from "../config";

import * as dotenv from 'dotenv'
dotenv.config()

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, network } = hre;

  const [deployer, owner] = await ethers.getSigners();

  
};

export default func;

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
func(hre).then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
