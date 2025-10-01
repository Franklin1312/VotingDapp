require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.30",
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY], // your wallet private key
      chainId: 11155111, // Sepolia chain id
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.API_KEY, // your Etherscan API key
    },
  },
  sourcify: {
    enabled: false,
  },
};
