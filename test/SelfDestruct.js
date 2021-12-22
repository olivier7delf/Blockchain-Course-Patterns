// to test require() function:
// npm install --save-dev chai
// npm install --save-dev chai-as-promised  
require('chai').use(require('chai-as-promised')).should();

var SelfDestruct = artifacts.require("./SelfDestruct.sol");

contract('SelfDestruct', function(accounts) {

  var newValue = "Some Value";
  it("should have someValue = NOT-SET-YET ", function() {
    return SelfDestruct.deployed().then(function(instance) {
      selfDestruct = instance; 
      return selfDestruct.someValue.call();
    }).then(function(result) {
      assert.equal(result, "NOT-SET-YET", "someValue is not equal to 'NOT-SET-YET'");
    });
  });

  it("should set someValue = 'Some Value' ", function() {
      //2. Set the value
    return selfDestruct.setValue(newValue).then(function(result) {
      return selfDestruct.someValue.call();
    }).then(function(result) {
      assert.equal(result, newValue, `NEW: someValue is not equal to ${newValue}`);
    });
  });

  it("should detroy the contract and get an error when calling someValue function", async function() {
    await selfDestruct.killContract();
    const ERROR_MSG = "Returned values aren't valid";
    var someValue = await selfDestruct.someValue.call().should.be.rejectedWith(ERROR_MSG);
  });
});
