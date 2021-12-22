/**
 * Tests the name registry contract
 */
var NameRegistry = artifacts.require("./NameRegistry.sol");

module.exports = function (callback) {

    var nameRegistry;
    var checking_name = "0x1000000000000000000000000000000000000000000000000000000000000000"; //CheckingAccountFactory
    var saving_name = "0x1000000000000000000000000000000000000000000000000000000000000000"; //SavingAccountFactory

    NameRegistry.deployed().then(function (instance) {
        nameRegistry = instance;
        
        //1. Add version 1 of contracts
        
        nameRegistry.registerName (checking_name,generateRandomAddress(), 1);
        nameRegistry.registerName (saving_name, generateRandomAddress(), 1);

        //2. Print the names & information on console
        printRegistry(nameRegistry);

        //3. Update to version 2 - update the address for the contract
        return nameRegistry.registerName(checking_name, generateRandomAddress(), 2);
    }).then(function(result){
        //4. Print the names & information on console
        printRegistry(nameRegistry);
    });
}

function printRegistry(nameRegistry) {
    nameRegistry.getContractInfo(checking_name).then(function(result){
        console.log(checking_name, result[0],' version=', result[1].toNumber());
        return nameRegistry.getContractInfo(saving_name)
    }).then(function(result){
        // console.log(result)
        console.log(saving_name, result[0],' version=', result[1].toNumber());
        console.log('------------------------------------------');
    });
}

// For testing this function generates random 20 byte strings
function generateRandomAddress() {
    var text = "";
    var possible = "0123456789abcde0123456789abcde0123456789abcde0123456789abcde";

    for (var i = 0; i < 40; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return '0x'+text;
}