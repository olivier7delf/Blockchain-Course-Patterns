require('chai').use(require('chai-as-promised')).should();

var NameRegistry = artifacts.require("./NameRegistry.sol");


contract('ContractFactory', function(accounts) {

  var nameRegistry;
  var result;
  var checking_name = "0x1000000000000000000000000000000000000000000000000000000000000000"; //CheckingAccountFactory
  var saving_name = "0x2000000000000000000000000000000000000000000000000000000000000000"; //SavingAccountFactory

  var addr_1 = generateRandomAddress();
  var addr_2 = generateRandomAddress();
  var addr_3 = generateRandomAddress();

  it("should assert register name and saving", async function() {
    nameRegistry = await NameRegistry.deployed();

    //1. Add version 1 of contracts

    await nameRegistry.registerName (checking_name, addr_1, 1);
    await nameRegistry.registerName (saving_name, addr_2, 1);

    //2. Print the names & information on console
    // await printRegistry(nameRegistry, checking_name, saving_name);

    // assert
    result = await nameRegistry.getContractInfo.call(checking_name);
    var addr = result[0].toLowerCase();
    assert.equal(addr_1, addr, "issue the result should be the addr_1");

    // await nameRegistry.registerName(checking_name, addr_3, 2);
    // result2 = await nameRegistry.getContractInfo.call(checking_name);
    // assert.equal(addr_3, result2[0].toLowerCase(), "issue the result should be the addr_3" + addr_3);

  });

 it("change", async function() {
    //3. Update to version 2 - update the address for the contract
    await nameRegistry.registerName(checking_name, addr_3, 2);
    
    result = await nameRegistry.getContractInfo.call(checking_name);
    assert.equal(addr_3, result[0].toLowerCase(), "issue the result should be the addr_3" + addr_3);

  });
});

// async function printRegistry(nameRegistry, checking_name, saving_name) {
//   result = await nameRegistry.getContractInfo.call(checking_name);
//   console.log(checking_name, result[0],' version=', result[1].toNumber());
//   result = await nameRegistry.getContractInfo.call(saving_name);

//   console.log(saving_name, result[0],' version=', result[1].toNumber());
//   console.log('------------------------------------------');
// }

// For testing this function generates random 20 byte strings
function generateRandomAddress() {
  var text = "";
  var possible = "0123456789abcde0123456789abcde0123456789abcde0123456789abcde";

  for (var i = 0; i < 40; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return '0x'+text;
}