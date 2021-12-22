require('chai').use(require('chai-as-promised')).should();

var UserAddressRegistry = artifacts.require("./UserAddressRegistry.sol");

contract('UserAddressRegistry', function(accounts) {
  var addressRegistry;
  var countValue;

  emptyName = "0x0000000000000000000000000000000000000000000000000000000000000000";
  // cindy = web3.utils.padLeft(web3.utils.asciiToHex("cindy"),64);
  cindy = "0x1000000000000000000000000000000000000000000000000000000000000000";
  cindyBis = "0x1100000000000000000000000000000000000000000000000000000000000000"; // new address
  george = "0x2000000000000000000000000000000000000000000000000000000000000000";
  jackie = "0x3000000000000000000000000000000000000000000000000000000000000000";

  it("should assert that we registered, in the right order, 3 users", async function() {
    addressRegistry = await UserAddressRegistry.deployed();
    
    // Register users
    await addressRegistry.registerName(cindy,{from:accounts[2]});
    await addressRegistry.registerName(george,{from:accounts[1]});
    await addressRegistry.registerName(jackie,{from:accounts[0]});

    result = await addressRegistry.count.call();
    countValue = result.toNumber();
    console.log("Count=", result);
    await printNames(addressRegistry, countValue);

    var v_cindy = await addressRegistry.getByIndex.call(0);
    var v_george = await addressRegistry.getByIndex.call(1);
    var v_jackie = await addressRegistry.getByIndex.call(2);

    assert.equal(v_cindy[1], cindy, "issue the result should be cindy addr : " + cindy);
    assert.equal(v_george[1], george, "issue the result should be george addr : " + george);
    assert.equal(v_jackie[1], jackie, "issue the result should be jackie addr : " + jackie);
  });

  it("should assert that cindy name can be modify with the contract owner", async function() {
    // Modify user name : Cindy
    await addressRegistry.updateName(accounts[2],cindyBis,{from:accounts[0]});
    await printNames(addressRegistry, countValue);

    var v_cindy = await addressRegistry.getByIndex.call(0);
    assert.equal(cindyBis, v_cindy[1], "issue the result should be cindyBis addr : " + cindyBis);
  });

  it("should assert that cindyBis name cannot be modify with the contract NOT owner", async function() {
    const ERROR_MSG = "Returned error: VM Exception while processing transaction: revert";
    await addressRegistry.updateName(accounts[2],cindy,{from:accounts[2]}).should.be.rejectedWith(ERROR_MSG);

    result = await addressRegistry.count.call(); // logs
    await printNames(addressRegistry, result.toNumber()); // logs
  });
  
  it("should assert george has been delete by himself", async function() {
    var valll = await addressRegistry.registerName(emptyName,{from:accounts[1]});
    var empty_george = await addressRegistry.getByAddress.call(accounts[1]);
    var empty_george_by_index = await addressRegistry.getByIndex.call(1);

    result = await addressRegistry.count.call(); // logs
    await printNames(addressRegistry, result.toNumber()); // logs

    assert.equal(empty_george[1], emptyName, "by addr, issue the result should be empty_george addr : " + emptyName);
    assert.equal(empty_george_by_index[1], emptyName, "by index, issue the result should be empty_george addr : " + emptyName);

    // Test it didnt affect other users: Cindy
    var x_cindy = await addressRegistry.getByAddress.call(accounts[2]);
    var y_cindy = await addressRegistry.getByIndex.call(0);
    assert.equal(x_cindy[1], cindyBis, "using addr, issue the result should be cindyBis addr : " + cindyBis);
    assert.equal(y_cindy[1], cindyBis, "using index, issue the result should be cindyBis addr : " + cindyBis);

  });

  it("should assert Cindy has been delete by contract owner", async function() {

    // // Delete Cindy
    console.log("should delete cindy:", accounts[2]);
    await addressRegistry.deleteName(accounts[2], {from:accounts[0]});
    var empty_cindy = await addressRegistry.getByAddress.call(accounts[2]);
    var empty_cindy_by_index = await addressRegistry.getByIndex.call(0);

    result = await addressRegistry.count.call();// logs
    await printNames(addressRegistry, result.toNumber()) // logs

    assert.equal(emptyName, empty_cindy[1], "issue the result should be empty_cindy addr : " + emptyName);
    assert.equal(emptyName, empty_cindy_by_index[1], "by index, issue the result should be empty_cindy addr : " + emptyName);

  });
});

async function  printNames(addressRegistry, count){
    for(i=0; i < count; i++){
        result = await addressRegistry.getByIndex.call(i);
        var name = result[1];
        console.log(result[0],'----',name,'---', new Date(result[2].toNumber()*1000), '-- index --', result[3].toNumber());
    }
}