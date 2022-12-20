// const { artifacts } = require("hardhat"); 
const secret = require("./environment/secrets.json");

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle") // so that we can use hardhat-waffle

const ALCHEMY_API_KEY = "KEY";
const GOERLI_PRIVATE_KEY = "YOUR GOERLI PRIVATE KEY";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths:{
    sources: "./blockchain/contracts",
    tests: "./blockchain/test",
    cache: "./blockchain/cache",
    artifacts: "./blockchain/artifacts", // json repre. of smart contracts => so we can export smart contracts
  },
  networks: { // where we store our network info.
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${GOERLI_PRIVATE_KEY}`]
    },
  },
};
