import {ethers} from "hardhat";
import {readENV} from './utils';

 // npx hardhat run ./scripts/deployPauser.ts --network ....

async function main() {

    const _network = readENV("NETWORK");
    const ContractName: string = "Pauser";

    console.log(`Deploying ${ContractName} on ${_network}...`);

    const factory = await ethers.getContractFactory(ContractName);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    console.log(`Successfully deployed the ${ContractName} to:`, contract.target);

    console.log("npx hardhat verify --network",_network, contract.target);

}

main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
