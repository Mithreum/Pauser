import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { readENV } from "./scripts/utils";

const INFURA_KEY = readENV('INFURA_KEY');

const ETHERSCAN_API_KEY = readENV('ETHERSCAN_API_KEY');
const OPTIMISTIC = readENV('OPTIMISTIC');
const ARBISCAN_API_KEY = readENV('ARBISCAN_API_KEY');
const BASE_API_KEY = readENV('BASE_API_KEY');
const POLYGON_API_KEY = readENV('POLYGON_API_KEY');
const BSC_API_KEY = readENV("BSC_API_KEY");

const SK: string = readENV("SK");
const accounts = [SK];

const config: HardhatUserConfig = {
  networks: {
    bscTestnet:{
      url: "https://bsc-testnet-rpc.publicnode.com",
      accounts,
      chainId: 97
    },
    sepolia: {
      url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
      accounts,
      chainId: 11155111
    },
    avalanche: {
      url: `https://avalanche-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts,
      chainId: 43114
    },
    snowtrace: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts,
      chainId: 43113
    },
    arbitrum: {
      url: 'https://arb-pokt.nodies.app',
      accounts,
      chainId: 42161
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts,
      chainId: 10
    },
    optimismSepolia: { // Need Paris to verify
      url: "https://optimism-sepolia.blockpi.network/v1/rpc/public",
      accounts,
      chainId: 11155420
    },
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts,
      chainId: 421614
    },
    baseSepolia: {
      url: "https://base-sepolia.blockpi.network/v1/rpc/public",
      accounts,
      chainId: 84532
    },
    polygon: {
      url: "https://1rpc.io/matic", //`https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts,
      chainId: 137,
      gasMultiplier: 3
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology", //"https://polygon-amoy-bor-rpc.publicnode.com",
      accounts,
      chainId: 80002,
    },
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSC_API_KEY,
      avalanche: 'snowtrace',
      snowtrace: "snowtrace", // apiKey is not required, just set a placeholder
      sepolia: ETHERSCAN_API_KEY,
      arbitrum: ARBISCAN_API_KEY,
      arbitrumSepolia: ARBISCAN_API_KEY,
      baseSepolia: BASE_API_KEY,
      optimism: OPTIMISTIC,
      optimismSepolia: OPTIMISTIC,
      polygon: POLYGON_API_KEY,
      amoy: POLYGON_API_KEY
    },
    customChains: [
      {
        network:"bscTestnet",
        chainId: 97,
        urls:{
          apiURL: "https://api-testnet.bscscan.com/api",
          browserURL:"https://testnet.bscscan.com/"
        }
      },
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io"
        }
      },
      { // https://snowtrace.io/documentation/recipes/hardhat-verification
        network: 'avalanche',
        chainId: 43114,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan/api",
          browserURL: "https://snowtrace.io"
        }
      },
      { // https://snowtrace.io/documentation/recipes/hardhat-verification
        network: "snowtrace",
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://testnet.snowtrace.io"
        }
      },
      {
        network: 'arbitrum',
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io/"
        }
      },
      {
        network: 'optimism',
        chainId: 10,
        urls: {
          apiURL: 'https://api-optimistic.etherscan.io/api',
          browserURL: 'https://optimistic.etherscan.io/'
        }
      },
      { // https://docs.optimism.etherscan.io/v/optimism-sepolia-etherscan
        network: 'optimismSepolia',
        chainId: 11155420,
        urls: {
          apiURL: 'https://api-sepolia-optimistic.etherscan.io/api',
          browserURL: 'https://sepolia-optimism.etherscan.io/'
        }

      },
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io"
        }
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      },
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com/"
        }
      },
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com/"
        }
      }
    ]
  }
};

export default config;
