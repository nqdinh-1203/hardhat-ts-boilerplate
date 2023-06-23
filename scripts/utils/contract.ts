import { ethers } from 'hardhat'
import 'dotenv/config'

const deploy = async function (contractName: string, ...args: any[]) {
  const artifact = await ethers.getContractFactory(contractName)
  return artifact.deploy(...args)
}
const getContract = async function (contractName: string, address: string) {
  const artifact = await ethers.getContractFactory(contractName)
  return artifact.attach(address)
}
const ContractAddress = {
  registry: process.env.__ENS_REGISTRY__ as string,
  root: process.env.__ENS_ROOT__ as string,
  price_oracle: process.env.__ENS_EXPONENTIAL_PRICE_ORACLE__ as string,
  base_registrar: process.env.__ENS_BASE_REGISTRAR__ as string,
  reverse_registar: process.env.__ENS_REVERSE_REGISTRAR__ as string,
  namewrapper: process.env.__ENS_NAMEWRAPPER__ as string,
  static_metadata: process.env.__ENS_STATIC_METADATA__ as string,
  controller: process.env.__ENS_ETH_REGISTRAR_CONTROLLER__ as string,
  public_resolver: process.env.__ENS_PUBLIC_RESOLVER__ as string,
}

export { deploy, getContract, ContractAddress }
