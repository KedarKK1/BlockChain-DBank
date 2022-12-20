const fs = require("fs");

async function main() {

  const BankContract = await ethers.getContractFactory("Bank");
  const bank = await BankContract.deploy();
  await bank.deployed();
  console.log(`Bank Contract was deployed to: ${bank.address}`);

  const TokenContract = await ethers.getContractFactory("Bank");
  const token = await TokenContract.deploy();
  await token.deployed();
  console.log(`Token Contract was deployed to: ${token.address}`);

  let addresses = {"bankcontract": bank.address, "tokencontract": token.address};
  let addressesJSON = JSON.stringify(addresses);
  fs.writeFileSync("environment/contract-address.json", addressesJSON);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
