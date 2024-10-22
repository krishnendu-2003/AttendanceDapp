require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    aiatestnet: {
      url: `https://aia-dataseed1-testnet.aiachain.org/`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
      chainId: 1320,
    },
  },
  etherscan: {
    apiKey: {
      aiatestnet: "your-etherscan-api-key",
    },
    customChains: [
      {
        network: "aiatestnet",
        chainId: 1320,
        urls: {
          apiURL: "https://testnet.aiascan.com/api",
          browserURL: "https://testnet.aiascan.com/tx/0x751ff77489fe107d532106c5fa37e580412efa7c512fe766e062b973ce4b1a97",
        },
      },
    ],
  },
};
