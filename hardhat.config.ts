import { HardhatUserConfig } from 'hardhat/types'
import "@nomicfoundation/hardhat-toolbox";
import '@openzeppelin/hardhat-upgrades';
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import 'hardhat-abi-exporter'

import * as dotenv from 'dotenv'

dotenv.config()

const ALCHEMY_API_KEY = "GMGOq5IweL2FmHvrCa2v_H8ISKknDtUu";
export const archivedDeploymentPath = './deployments/archive';

let real_accounts = [
  process.env.DEPLOYER_KEY as string,
  process.env.OWNER_KEY as string,
];

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    // goerli: {
    //   url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`]
    // },
    // mumbai: {
    //   url: "https://polygon-mumbai.g.alchemy.com/v2/isVMJIz7j1q9D5e7_simS8hRUByh1PLn",
    //   accounts: [`${process.env.PRIVATE_KEY}`]
    // },
    localhost: {
      url: "http://localhost:8545",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
      ],
      chainId: 31337
    },
    testnetcogi: {
      url: `https://testnet.cogi.technology`,
      tags: ['test', 'use_root'],
      accounts: real_accounts,
      chainId: 5555,
      gasPrice: 100000000000,
    },
  },
  etherscan: {
    apiKey: `${process.env.POLYGONSCAN_API_KEY}`,
    customChains: [
      {
        network: 'testnetcogi',
        chainId: 5555,
        urls: {
          apiURL: 'https://testnet-admin.cogiscan.io/api',
          browserURL: 'https://testnet-admin.cogiscan.io',
        },
      },
      {
        network: 'cogi',
        chainId: 76923,
        urls: {
          apiURL: 'http://admin.cogiscan.io/api',
          browserURL: 'http://admin.cogiscan.io',
        },
      },
    ],
  },

  abiExporter: {
    path: './build/contracts',
    runOnCompile: true,
    clear: true,
    flat: true,
    except: [],
    spacing: 2,
    pretty: true,
  },

  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      31337: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    user: {
      default: 1
    }
  },

  external: {
    contracts: [
      {
        artifacts: [archivedDeploymentPath],
      },
    ],
  },
};

export default config;