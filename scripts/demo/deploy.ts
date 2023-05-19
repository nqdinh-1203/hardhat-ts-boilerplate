import { ethers, hardhatArguments } from "hardhat";
import fs from 'fs';
import path from 'path';
import * as Config from "../config";

import * as dotenv from 'dotenv'
dotenv.config()

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const [deployer] = await ethers.getSigners();

  console.log("Deploying from address: ", deployer.address);

  // deploy contract
  const Demo = await ethers.getContractFactory("Demo");
  const demo = await Demo.deploy();
  await demo.deployed();

  // export address contract
  console.log("Demo Contract address: ", demo.address);
  Config.setConfig(network + '.Demo', demo.address);

  await Config.updateConfig();

  // export ABI and bytecode
  const contractBin = await ethers.provider.getCode(demo.address);
  const contractABI = demo.interface.format(ethers.utils.FormatTypes.json);

  fs.writeFileSync('./constants/Demo.bin', contractBin);
  fs.writeFileSync('./constants/Demo.abi.json', contractABI);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
