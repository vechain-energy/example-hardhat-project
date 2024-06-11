import { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";
import type { MyToken } from "../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const [deployer] = await hre.getUnnamedAccounts()
    await hre.deployments.deploy("MyToken", {
        contract: "MyToken",
        log: true,
        from: deployer,
        proxy: {
            proxyContract: "UUPS",
            execute: {
                init: {
                    methodName: "initialize",
                    args: [deployer],
                },
            },
        },
        libraries: {},
    });

    // read data from contract
    const contract = (await hre.ethers.getContract(
        "MyToken",
        deployer
    )) as MyToken;

    // get role identifier
    const ugpraderRole = await contract.DEFAULT_ADMIN_ROLE();

    // check role
    if (!(await contract.hasRole(ugpraderRole, deployer))) {
        console.log("Granting DEFAULT_ADMIN_ROLE");

        // execute a function of the deployed contract
        // .wait() waits for the receipts and throws if it reverts
        await (await contract.grantRole(ugpraderRole, deployer)).wait();
    } else {
        console.log("Already has DEFAULT_ADMIN_ROLE");
    }

    // access deployed address
    const MyToken = await hre.deployments.get("MyToken");
    console.log("MyToken is available at", MyToken.address);
};

func.id = "mytoken-upgradeable"; // name your deployment
func.tags = ["mytoken"]; // tag your deployment, to run certain tags only
func.dependencies = []; // build a dependency tree based on tags, to run deployments in a certain order

export default func;
