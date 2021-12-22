// Caution test: use always call(...) for view function or it can create async/await issues when testing
require('chai').use(require('chai-as-promised')).should();

var ContractFactory = artifacts.require("./ContractFactory.sol");
var ChildContract = artifacts.require("./ChildContract.sol");

contract('ContractFactory', function(accounts) {
  var contractFactory;
  var childContract;

  it("should assert modify owner acc 1 to 3 and then 1 cannot modify it again", async function() {
    contractFactory = await ContractFactory.deployed();
    // lets transfer ownership
    await contractFactory.purchase("0x1000000000000000000000000000000000000000000000000000000000000000",{value:100, from:accounts[1]});
    await contractFactory.purchase("0x2000000000000000000000000000000000000000000000000000000000000000",{value:100, from:accounts[2]});
    
    printOwners(contractFactory);
    // get the child contract address for John Wayne i.e., index=0
    result = await contractFactory.getChildContractAddress.call(0);
    
    console.log("John Wayne - Asset Address=", result);
    childContract = await ChildContract.at(result);

    result = await childContract.transferOwnership(accounts[3],"0x4000000000000000000000000000000000000000000000000000000000000000",{from:accounts[1]});
    owner_addr = await childContract.owner.call();
    assert.equal(owner_addr, accounts[3], "issue owner should equal accounts[3]");
    printOwners(contractFactory);
  });

  it("should assert owner acc 3 can modify the owner", async function() {
    result = await childContract.transferOwnership(accounts[4],"0x4000000000000000000000000000000000000000000000000000000000000000",{from:accounts[3]});
    owner_addr = await childContract.owner.call();
    assert.equal(owner_addr, accounts[4], "issue owner should equal accounts[3]");
  });

  it("should assert owner acc 1 cannot anymore modify the owner", async function() {
    // r = await childContract.transferOwnership(accounts[4],"0x5000000000000000000000000000000000000000000000000000000000000000",{from:accounts[1]});
    // John Wayne tries to sell the asset again
    ERROR_MSG = "Returned error: VM Exception while processing transaction: revert";
    await childContract.transferOwnership(accounts[4],"0x5000000000000000000000000000000000000000000000000000000000000000",
      {from:accounts[1]}).should.be.rejectedWith(ERROR_MSG);
  });
});

async function  printOwners(contractFactory){
  console.log("printOwners:")
    // var ctr = 0;
    for(i=0; i < 5; i++){
      result = await contractFactory.getInfo.call(i);
      // var name = web3.utils.toAscii(result[2]);
      // name = name.replace(/\0/g, '');
      var name = result[2];
      console.log(result[0].toNumber(), '---', result[1],'----' , name);
      // console.log(name);
        
    }
}
