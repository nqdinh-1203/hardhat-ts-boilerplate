import { ethers } from "hardhat";
import addressContract from "../../constants/config.json";

// test Demo
async function test1() {
  const addressDemo = addressContract.localhost.Demo;
  console.log(addressDemo);

  const demo = (await ethers.getContractFactory("Demo")).attach(addressDemo);

  console.log(await demo.getNumber());
  console.log(await demo.getOwner());
}

// test Demo Upgradeable
async function test2() {
  const addressDemo = addressContract.localhost.DemoUpgradeable;
  console.log(addressDemo);

  const demo = (await ethers.getContractFactory("DemoUpgradeable")).attach(addressDemo);

  console.log(await demo.getNumber());
  console.log(await demo.getOwner());
}

// test Demo Upgradeable Ver2
async function test3() {
  const addressDemo = addressContract.localhost.DemoUpgradeableV2;
  console.log(addressDemo);

  const demo = (await ethers.getContractFactory("DemoUpgradeableV2")).attach(addressDemo);

  await demo.increaseNumber();
  console.log(await demo.getNumber());
  console.log(await demo.getOwner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
test3().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
