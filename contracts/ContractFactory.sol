pragma solidity ^0.5.16;

import "./ChildContract.sol";

/**
 * This contract creates multiple child contracts.
 **/
contract ContractFactory {
    // Maintains all the child contracts
    ChildContract[] public children;
    // Price of the asset
    uint8    public   initialPrice;

    // Constructor
    // Creates the child contracts
    constructor(uint8  numParts, uint8   price) public {
        for(uint8 i = 0; i < numParts; i++){
            // address payable this_add = payable(address(this));
            children.push(new ChildContract(i, address(this), "***"));
        }
        initialPrice = price;
    }

    // Anyone can pay the price and purchase the asset
    function  purchase(bytes32 name) payable public {

        if(msg.value < initialPrice) revert();

        // Look for available asset i.e., one that is not sold yet
        for(uint8 i = 0; i < children.length; i++){
            // Check if contract factoy is the owner
            if(children[i].isOwner(address(this))){
                children[i].transferOwnership(msg.sender, name);
                return;
            }
        }
    }

    // Returns the information about the child contract at specified index
    function  getInfo(uint8 childIndex) public view returns(uint8, address, bytes32){
        // Simply return the values
        return (children[childIndex].identity(),children[childIndex].owner(),children[childIndex].name());
    }

    // Returns the child contract address
    function  getChildContractAddress(uint8 childIndex) public view returns (address){
        return address(children[childIndex]);
    }

    // Returns name of the owner based on the child index
    function  getOwnerName(uint8 childIndex) public view returns(bytes32){
        bytes32  namer = children[childIndex].name();
        return namer;
    }
    // Returns the count of the children
    function  getChildrenCount() public view returns (uint){
        return children.length;
    }
}