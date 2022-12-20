Commands used by me - 
```
 1. npm i --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
 2. Ability to resolve json modules and esModules => in tsconfig.json => 
    "resolveJsonModule": true,
    "esModuleInterop": true
 3. npm i @openzeppelin/contracts => install smart contrants fom openzeppelin, which provides some free contracts
 4. require("@nomiclabs/hardhat-waffle") in hardhat.config.js
 5. npx hardhat run blockchain/scripts/deploy.js --network goerli (or run  npx hardhat run decentralized-bank/blockchain/scripts/deploy.js --network goerli (or whatever's name of that network))


```

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
