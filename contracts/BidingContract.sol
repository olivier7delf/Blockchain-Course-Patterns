pragma solidity ^0.5.16;

contract BidingContract {
    //bytes32 public nameItem;
    // contract can be destructed by the owner if the bid is ended AND XX seconds after the deadline (!= end which result to the call of the function)
    address payable public owner;
    string public descriptionItem;
    uint public duration; // seconds
    uint public startingBid;
    uint public deadline; // timestamp
    uint public withdrawalTime = 120; //at least 120 seconds after the deadline to withdraw your money, or owner get all
    
    uint highestBid;
    address public addrHighestBidder;
    bytes32 nameHighestBidder; // caution, I decided the ADDRESS is the ID, name is a joke...
    
    struct Bidder {
        bytes32 nameBidder;
        uint amtBid;
    }
    
    mapping(address => Bidder) private biddersMap;
    
    enum State{Running, Ended}
    State public auctionState;
    
    event HighBidChanged(address _addr, bytes32 _nm, uint _newHighBid);
    event BidFailed(bytes32 _nameBidder, uint _amt);
    
    // constructor(bytes32 _nameItem, string memory _descriptionItem, uint _duration, uint _startingBid) public {
    constructor(string memory _descriptionItem, uint _duration, uint _startingBid) public {
        //nameItem = _nameItem;
        owner = msg.sender;
        descriptionItem = _descriptionItem;
        duration = _duration;
        startingBid = _startingBid;
        highestBid = _startingBid;
        
        deadline = block.timestamp + _duration;
        auctionState = State.Running;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "only the owner can do it !");
        _;
    }
    
    modifier beforeEnd(){
        require(block.timestamp < deadline, "block.timestamp is >= deadline !");
        _;
    }
    
    modifier afterEnd(){
        require(block.timestamp >= deadline, "block.timestamp is NOT >= deadline !");
        _;
    }
    
    modifier runningState(){
        require(auctionState == State.Running, "auctionState is not running !");
        _;
    }
    
    modifier endedState(){
        require(auctionState == State.Ended, "auctionState is not ended ! call BidEnd()");
        _;
    }
    
    function transferOwnership(address payable newOwner) payable public onlyOwner {
        owner = newOwner;
    }
    
    // Anyone can send ethers to bid
    function placeBid(bytes32 _name) public payable beforeEnd {
        
        if (msg.value > getHighBid()){
            highestBid = msg.value;
            addrHighestBidder = msg.sender;
            nameHighestBidder = _name;
            
            if (biddersMap[msg.sender].amtBid > 0){
                msg.sender.transfer(biddersMap[msg.sender].amtBid);
            }
            
            biddersMap[msg.sender].amtBid = msg.value;
            biddersMap[msg.sender].nameBidder = _name;
            
            emit HighBidChanged(msg.sender, _name, msg.value);
        }
        else {
            emit BidFailed(_name, msg.value);
            revert("you didn't bid enough !");
        }
        
    }
    
    // will return the current "High Bid"...in the start it will be equal to startBid
    function getHighBid() private view returns(uint){
        return highestBid;
    }
    
    // call by a bidder to get back his amount if he is not the winner
    // If a higher bid is received - the loser can claim their ether by calling the claimBidAmount() . 
    // This would check the if the caller is eligible for the ethers...
    // if it is then it would send the ethers to the caller otherwise throws an exception
    function claimBidAmount() public payable {
        require(msg.sender != addrHighestBidder, "the highestBidder cannot claimBidAmount !");
        require(biddersMap[msg.sender].amtBid > 0, "you dont have amt bid !");
        address payable recipient = msg.sender;
        recipient.transfer(biddersMap[recipient].amtBid);
        biddersMap[recipient].amtBid = 0;
    }
    
    // Owner call it to finish the auction bidding, he gets the highest bid in the same time. 
    function bidEnd() public onlyOwner runningState afterEnd {
        msg.sender.transfer(biddersMap[addrHighestBidder].amtBid);
        biddersMap[addrHighestBidder].amtBid = 0; // Avoid double gains ! not necessary with auctionState : double security
        auctionState = State.Ended;
    }
    
    // After some time, the owner destroy the contract, and get all money if participant didn t claimed it before
    function destructContract() public onlyOwner afterEnd endedState{
        require(block.timestamp > deadline + withdrawalTime, "timestamp has not past the deadline+withdrawalTime");
        selfdestruct(owner);
    }
    
    function getBalanceContract() public view returns(uint){ // balance in wei
        return address(this).balance;
    }
}