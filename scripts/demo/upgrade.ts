import { ethers, getNamedAccounts, hardhatArguments } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
// import { getContract, ContractAddress } from '../utils/contract'
import hre from 'hardhat'
import * as Config from "../config";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    await Config.initConfig();
    const demoV1Address: string = Config.getConfig().localhost.DemoUpgradeable;

    const { deployments, network, upgrades } = hre;
    const { upgradeProxy } = upgrades;
    // const [deployer, owner] = await ethers.getSigners();
    const { deployer, user } = await getNamedAccounts();

    console.log(`Deploying from address: ${deployer} at network: ${network.name}`);
    console.log(`User address: ${user}`);

    const DemoV2 = await ethers.getContractFactory("DemoUpgradeableV2", deployer);
    const demo = await upgradeProxy(demoV1Address, DemoV2);

    console.log("Demo Upgradeable V2 Contract address: ", demo.address);

    Config.setConfig(network.name + '.DemoUpgradeableV2', demo.address);
    await Config.updateConfig();
};

export default func;

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
func(hre).then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
