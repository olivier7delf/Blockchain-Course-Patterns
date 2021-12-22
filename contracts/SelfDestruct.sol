pragma solidity ^0.5.16;

contract SelfDestruct {

    address payable        owner;
    string  public  someValue = "NOT-SET-YET";

    modifier  OwnerOnly {
        if(msg.sender != owner){
            revert();
        } else {
            _;
        }
    }

    // Constructor
    constructor() public {
        owner = msg.sender;
    }

    // Sets the storage variable
    function  setValue(string memory value) public {
        someValue = value;
    }

    // This is where the contract is destroyed
    function  killContract() public OwnerOnly {
        // suicide(owner);
        // address  payable ownerB = payable owner;
        selfdestruct(owner);
    }

}


