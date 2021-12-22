pragma solidity ^0.5.16;

/**
 * Implements the registry for address => name mapping
 * This registry pattern contract is used by thedapps.com for personalizing the user experience
 * 
 * Pattern: Mapping Iteration
 **/

contract UserAddressRegistry {

    address   owner;

    // =======
    struct User {
        bytes32   name;
        uint      lastUpdated;
        uint      index;
    }

    // Manages the mapping between address & name
    mapping(address => User) public  addressMap;

    // Manages the list of addresses
    address[] public   addresses;

    modifier OwnerOnly() {
        if(msg.sender == owner) _;
        else revert();
    }

    constructor() public {
        owner = msg.sender;
    }

    // Registers the name
    function registerName(bytes32 name) public returns (bool){
        if(name == bytes32(0x0)){
            // owner wants to delete the registration
            removeFromAddresses(msg.sender);
            
            if(addressMap[msg.sender].name != bytes32(0x0)){
                delete(addressMap[msg.sender]);
            }
            
            return false;
        }

        if(addressMap[msg.sender].name == bytes32(0x0)){
            addresses.push(msg.sender);
        }
        addressMap[msg.sender].name = name;
        addressMap[msg.sender].lastUpdated = now;
        addressMap[msg.sender].index = addresses.length-1;
        return true;
    }

    // Only Owner can update the name 
    function updateName(address given, bytes32 name) public OwnerOnly  returns (bool){
        if(addressMap[given].name == bytes32(0x0)) return false;
        addressMap[given].name = name;
        addressMap[msg.sender].lastUpdated = now;
        return true;
    }

    // Owner can force delete
    function deleteName(address given) public OwnerOnly returns (bool){
        delete(addressMap[given]);
        removeFromAddresses(given);
        return true;
    }

    // Returns the count of registered names
    function  count() public view returns (uint){
        return addresses.length;
    }
  
    // Returns the address-name at the specified index
    function  getByIndex(uint index) public view returns (address, bytes32, uint, uint){
        if(index >= addresses.length) return  (address(0x0), bytes32("0x"), 0, 99);
        address addr = addresses[index];
        return (addr, addressMap[addr].name, addressMap[addr].lastUpdated, addressMap[addr].index);
    }

    // Returns the address-name by way of the address
    function  getByAddress(address addr) public view returns (address,bytes32,uint){
        return (addr, addressMap[addr].name, addressMap[addr].lastUpdated);
    }

    /**
    * Solidity does not provide an out of the box function to remove the 
    * element of an array and shrink it.
    **/
    function removeFromAddresses(address addr) private {

        uint index = addressMap[addr].index;
        delete(addresses[index]);

        // for(uint i = 0; i < addresses.length; i++) {
        //     if(addr == addresses[i]){
        //         // This simply zeroes out the element - length stays the same
        //         //delete(addresses[i]);
                
        //         // This while loop will shrink size of the array
        //         while (i < addresses.length - 1) {
        //             addresses[i] = addresses[i+1];
        //             i++;
        //         }
        //         addresses.length--;
        //         return;
        //     }
        // }
    }
}