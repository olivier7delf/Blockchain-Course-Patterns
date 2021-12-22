/**
 * Tests the contract SelfDestruct
 */
var SelfDestruct = artifacts.require("./SelfDestruct.sol");

module.exports = function(callback) {
    
    var  selfDestruct;
    //1. Get the deployed contract instance
    console.log("starting 1");
    return SelfDestruct.deployed().then(function(instance){
        selfDestruct = instance; 
        return selfDestruct.someValue.call();
    }).then(function(result){
        console.log("Initial Value=", result); 
        //2. Set the value
        return selfDestruct.setValue("Some Value");
        //CAUTION put a then after setting ! or async await...
    }).then(function(result){
        console.log("setValue done: Some Value");
        //3. Get the value
    //     return selfDestruct;
    // }).then(function(result){
        return selfDestruct.someValue.call();
    }).then(function(result){
        console.log("selfDestruct.someValue.call() done");
        //4. Print the received value to console
        console.log("Value=", result);
        //5. Call kill
        return selfDestruct.killContract();
    }).then(function(result){
        console.log("Contract Destroyed");
        // This call will throw an excepion as contract is destroyed
        return selfDestruct.someValue.call();
        
    }).then(function(result){
        console.log("Value contract destroyed=", result);
        // This call will throw an excepion as contract is destroyed
        // return selfDestruct.setValue("NEW Value");
    });
    
}

console.log("END");


