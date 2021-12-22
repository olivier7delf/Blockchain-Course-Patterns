pragma solidity ^0.5.16;

import "./BidingContract.sol";

contract BidingContractFactory {
    BidingContract[] public children;
    uint    public   initialPrice;
    address owner;
    uint public amtFactory;

    
    constructor(uint  price) public {
        initialPrice = price;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only the owner can do it! ");
        _;
    }

    function addChild(string memory _descriptionItem, uint _duration, uint _startingBid) public payable {
        require(msg.value >= initialPrice, "you have to pay more to create an auction");
        amtFactory += msg.value;
        BidingContract child = new BidingContract(_descriptionItem, _duration, _startingBid);
        child.transferOwnership(msg.sender);
        children.push(child);
    }

    function  getChildContractAddress(uint8 childIndex) public view returns (address){
        return address(children[childIndex]);
    }
    
    function getBalanceContract() public view returns(uint){ // balance in wei
        return address(this).balance;
    }
}