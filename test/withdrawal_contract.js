require('chai').use(require('chai-as-promised')).should();

var WithdrawalContract = artifacts.require("./WithdrawalContract.sol");

contract('WithdrawalContract', function(accounts) {

  var  owner   = accounts[0];
  var  payer_1 = accounts[1];
  var  payer_2 = accounts[2];

  var withdrawalContract;

  it("should set money in the smart contract", async function() {
    withdrawalContract = await WithdrawalContract.deployed()

    // Payer 1 & 2 sends 1 ETH
    var balance_ini = await web3.eth.getBalance(payer_1)
    await withdrawalContract.pay({from:payer_1, value:web3.utils.toWei(web3.utils.toBN(1), 'Ether')});
    var balance_then = await web3.eth.getBalance(payer_1)
    console.log("pay 1 diff", balance_ini-balance_then); // can visualize gas price here ! about: 0,00016 ether here
    // Payer 2 sends 1 ETH
    await withdrawalContract.pay({from:payer_2, value:web3.utils.toWei(web3.utils.toBN(1), 'Ether')});
    console.log("pay 2",);
    // Get Balance of ethers in Withdrawal contract
    result = await  withdrawalContract.getBalance.call();

    //return withdrawalContract.balance();
  
    // Expecte to be 2 ETH
    var balance = web3.utils.fromWei(result,"Ether");
    console.log("balance", balance);
    console.log('Balance#1 =',balance, " Ethers")
    assert.equal(balance, 2, "issue the balance should equal 2 " );
  });

  it("should decrease amount in smart contract to 1", async function() {

    // Payer 1 withdraws
    await withdrawalContract.withdraw({from:payer_1});
    result = await withdrawalContract.getBalance.call();

    // Expecte to be 1 ETH
    var balance = web3.utils.fromWei(result,"Ether");
    assert.equal(balance, 1, "issue the balance should equal 1 " );
  });

  it("should decrease amount in smart contract to 0", async function() {
    // Payer 2 withdraws
    await withdrawalContract.withdraw({from:payer_2});
    result = await withdrawalContract.getBalance.call();
    
    // Expect 0 Ether
    var balance = web3.utils.fromWei(result,"Ether");
    assert.equal(balance, 0, "issue the balance should equal 0 " );
    
  });

  it("should throw an error because there is no more money in SC", async function() {
    // Payer 2 withdraws
    const ERROR_MSG = "Returned error: VM Exception while processing transaction: revert";
    await withdrawalContract.withdraw({from:payer_2}).should.be.rejectedWith(ERROR_MSG);
    result = await withdrawalContract.getBalance.call();
    
    // Expect 0 Ether
    var balance = web3.utils.fromWei(result,"Ether");
    assert.equal(balance, 0, "issue the balance should equal 0 " );
  });
});