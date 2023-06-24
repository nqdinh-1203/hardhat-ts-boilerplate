import { ethers, getNamedAccounts, hardhatArguments } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
// import { getContract, ContractAddress } from '../utils/contract'
import hre from 'hardhat'
import * as Config from "../config";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    await Config.initConfig();

    const { deployments, network, upgrades } = hre;
    const { deployProxy } = upgrades;
    // const [deployer, owner] = await ethers.getSigners();
    const { deployer, user } = await getNamedAccounts();

    console.log(`Deploying from address: ${deployer} at network: ${network.name}`);
    console.log(`Owner address: ${user}`);

    const Demo = await ethers.getContractFactory("DemoUpgradeable", deployer);
    const demo = await deployProxy(Demo, [100], { initializer: "initialize" });

    console.log("Demo Upgradeable Contract address: ", demo.address);

    Config.setConfig(network.name + '.DemoUpgradeable', demo.address);
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
