// SPDX-License-Identifier: MIT
pragma solidity 0.8.30; 

contract voting{
    //structure
    struct Candidate{
        uint256 id;
        string name;
        uint256 no_of_votes;
    }

    Candidate[] public candidates;
    address public owner;
    //address of voters
    mapping(address => bool) public voters;
    //list of voters
    address[] public listofvoters;
    //voting status
    uint256 public votingstart;
    uint256 public votingend;
    //election status
    bool public electionStarted;

    //to check if owner
    modifier onlyOwner(){
        require(msg.sender == owner," You are not authorised to start election");
        _;
    }
    //to check if elecion is started
    modifier election_ongoing(){
        require(electionStarted,"no election yet");
        _;
    }

    constructor(){
        owner = msg.sender;
    }

    //start an election
    function start_election(
        string[] memory _candidates, 
        uint256 _voting_duration
    ) public onlyOwner{
        require(electionStarted == false,"Election is ongoing");
        delete candidates;
        resetAllVoterStatus();

        for(uint256 i = 0; i <_candidates.length;i++){
            candidates.push(
                Candidate({id : i, name:_candidates[i],no_of_votes:0})
            );
        }
        electionStarted= true;
        votingstart = block.timestamp;
        votingend = block.timestamp + (_voting_duration * 1 minutes);
    }

    //add new candidate
    function addCandidate(string memory _name) public onlyOwner election_ongoing{
        require(checkElectionperiod(),'Election period has ended');
        candidates.push(
            Candidate({id:candidates.length , name:_name,no_of_votes:0})
        );
    }
    //voter status
    function voterStatus(address _voter) public view election_ongoing returns (bool){
        if(voters[_voter] == true){
            return true;
        }
        return false;
    }
    //to vote
    function voteto(uint256 _id) public election_ongoing{
        require(checkElectionperiod(),"Election period has ended");
        //require(!voterStatus(msg.sender),"You have already voted");
        candidates[_id].no_of_votes++;
        // voters[msg.sender] = true;
        // listofvoters.push(msg.sender);
    }
    //get no of votes
    function retrieveVotes() public view returns(Candidate[] memory){
        return candidates;
    }

    //monitor election time
    function electionTimer() public view election_ongoing returns (uint256){
        if(block.timestamp >= votingend){
            return 0;
        }
        return (votingend - block.timestamp);
    }
    //  if election period is ongoing
    function checkElectionperiod() public returns (bool){
        if (electionTimer()>0){
            return true;
        }
        electionStarted=false;
        return false;
    }
    //reset all voters status
    function resetAllVoterStatus() public onlyOwner{
        for (uint256 i =0 ; i<listofvoters.length; i++){
            voters[listofvoters[i]] = false;
        }
        delete listofvoters;
    }
}