import "@nomicfoundation/hardhat-toolbox"
import "@vechain/sdk-hardhat-plugin"
import "@openzeppelin/hardhat-upgrades";
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

const accounts = ['0x2422eb37a0046d42e3c8d05c7d972de7fe1bb805e90b3a0dbc7d12b4d444c634']

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    vechain_testnet: {
      url: "https://testnet.vechain.org",
      accounts,

      // optionally use fee delegation to let someone else pay the gas fees
      // visit vechain.energy for a public fee delegation service
      delegator: {
        delegatorUrl: "https://sponsor-testnet.vechain.energy/by/90"
      },
      enableDelegation: true,
    },
    vechain_mainnet: {
      url: "https://mainnet.vechain.org",
      accounts
    },
  }
};
