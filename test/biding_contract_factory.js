const {time,} = require('@openzeppelin/test-helpers');
const { assert } = require('chai');

require('chai').use(require('chai-as-promised')).should();

var BidingContractFactory = artifacts.require("./BidingContractFactory.sol");
var BidingContract = artifacts.require("./BidingContract.sol");

contract('BidingContractFactory', function(accounts) {

  var  owner   = accounts[0];
  var  payer_1 = accounts[1];
  var  payer_2 = accounts[2];

  var ownerName = "0x1000000000000000000000000000000000000000000000000000000000000000";
  var otherName = "0x2000000000000000000000000000000000000000000000000000000000000000"; // no impact

  var bidingContractFactory;
  var ERROR_MSG;

  it("should accept p1 & P2 to create child auctions", async function() {
    // p1 is the highest bidder, then p2 bid more and become the highest bidder
    bidingContractFactory = await BidingContractFactory.deployed()
    var amt_p1 = 2;
    await bidingContractFactory.addChild("pc", 20, web3.utils.toWei(web3.utils.toBN(1), 'Ether'), {from:payer_1, value:web3.utils.toWei(web3.utils.toBN(amt_p1), 'Ether')});
    await bidingContractFactory.addChild("mac", 25, web3.utils.toWei(web3.utils.toBN(2), 'Ether'), {from:payer_2, value:web3.utils.toWei(web3.utils.toBN(amt_p1), 'Ether')});
    
    // placeBid(otherName, {from:payer_1, value:web3.utils.toWei(web3.utils.toBN(1), 'Ether')});
    // await bidingContractFactory.placeBid(otherName, {from:payer_2, value:web3.utils.toWei(web3.utils.toBN(2), 'Ether')});
    result = await  bidingContractFactory.getBalanceContract.call();
    var balance = web3.utils.fromWei(result,"Ether");
    assert.equal(balance, amt_p1+amt_p1, "issue the balance of the factory contract should equal " + amt_p1+amt_p1 + "ethers");


    result = await bidingContractFactory.getChildContractAddress.call(0);
    console.log("p1 - auction biding Address=", result);
    var childContract1 = await BidingContract.at(result);
    owner_addr = await childContract1.owner.call();
    assert.equal(owner_addr, accounts[1], "issue owner should equal p1: accounts[1]");

    result = await bidingContractFactory.getChildContractAddress.call(1);
    console.log("p2 - auction biding Address=", result);
    var childContract2 = await BidingContract.at(result);
    owner_addr = await childContract2.owner.call();
    assert.equal(owner_addr, accounts[2], "issue owner should equal p2: accounts[2]");
  });

  it("should refuse to create an auction and get an error because of the low price paid", async function() {
    ERROR_MSG = "Returned error: VM Exception while processing transaction: revert you have to pay more to create an auction";
    await bidingContractFactory.addChild("pc", 20, web3.utils.toWei(web3.utils.toBN(1), 'Ether'),
       {from:payer_1, value:10}).should.be.rejectedWith(ERROR_MSG);;
  });

  // it("should refuse to refund P2 but accept to refund P1", async function() {
  //   ERROR_MSG = "Returned error: VM Exception while processing transaction: revert the highestBidder cannot claimBidAmount !";
  //   await bidingContract.claimBidAmount({from: payer_2}).should.be.rejectedWith(ERROR_MSG);

  //   var balance_p1_initial = await web3.eth.getBalance(payer_1);
  //   await bidingContract.claimBidAmount({from: payer_1});
  //   var balance_p1_after = await web3.eth.getBalance(payer_1);
  //   var balance_diff_p1 = web3.utils.fromWei(web3.utils.toBN(balance_p1_after-balance_p1_initial), "ether");
  //   assert.equal(Math.round(1000*(balance_diff_p1))/1000, 1, "should equal the bid: 1 ether");
  // });

  // it ("should auction state be running and then ended", async function() {
  //   result = await bidingContract.auctionState.call();
  //   assert.equal(result.toNumber(), 0, "auctionState should be equal to 0, meaning the auction is Running");

  //   ERROR_MSG = "Returned error: VM Exception while processing transaction: revert block.timestamp is NOT >= deadline !";
  //   await bidingContract.bidEnd({from: owner}).should.be.rejectedWith(ERROR_MSG);
  //   await time.increase(21); // 21s is from deployed arguments
  //   await bidingContract.bidEnd({from: owner});
  //   result = await bidingContract.auctionState.call();
    
  //   assert.equal(result.toNumber(), 1, "auctionState should be equal to 1, meaning the auction is ended");

  // });

  // it ("should verify destructContract can only be used by owner, when the 2 deadlines are past", async function() {
  //   ERROR_MSG = "Returned error: VM Exception while processing transaction: revert only the owner can do it !";
  //   await bidingContract.destructContract({from: payer_1}).should.be.rejectedWith(ERROR_MSG);

  //   ERROR_MSG = "Returned error: VM Exception while processing transaction: revert timestamp has not past the deadline+withdrawalTime";
  //   await bidingContract.destructContract({from: owner}).should.be.rejectedWith(ERROR_MSG);

  //   await time.increase(150); // 150s is from SC original params
  //   await bidingContract.destructContract({from: owner});


  //   smartContractCode = await web3.eth.getCode(bidingContract.address);
  //   assert.equal(smartContractCode, "0x", "the contract's bytecodeode should be empty because the instance has been destroyed")
  // })
});