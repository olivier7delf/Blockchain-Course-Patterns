var SelfDestruct = artifacts.require("./SelfDestruct.sol");
var ContractFactory = artifacts.require("./ContractFactory.sol");
var NameRegistry = artifacts.require("./NameRegistry.sol");
var WithdrawalContract = artifacts.require("./WithdrawalContract.sol");

var UserAddressRegistry = artifacts.require("./UserAddressRegistry.sol");

var BidingContract = artifacts.require("./BidingContract.sol");

var BidingContractFactory = artifacts.require("./BidingContractFactory.sol");

module.exports = function(deployer) {

  deployer.deploy(SelfDestruct);
  // Pass the argument 
  deployer.deploy(ContractFactory,5,100);

  deployer.deploy(NameRegistry);

  deployer.deploy(UserAddressRegistry);

  deployer.deploy(WithdrawalContract);

  deployer.deploy(BidingContract, "pc", 20, 100000);

  deployer.deploy(BidingContractFactory, 100000);
};
