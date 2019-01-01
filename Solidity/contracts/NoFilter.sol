pragma solidity >=0.4.23;

contract NoFilter {
    
    //post related variables
    uint postNumber; // keeps track of posts so that every one is unique
    mapping (uint => address) postOwners; //Keeps track of who owns a specific post
    mapping (uint => uint) upvotes; // keeps track of a posts vote counter
    mapping (uint => uint) downvotes; // keeps track of a posts vote counter
    mapping (address => mapping(uint => uint)) voters; //keeps track of a users voting history, helps to prevent vote spamming from a single account
    
    //comment related variables
    mapping (uint => uint) commentCounter; // keeps track of posts so that every one is unique
    mapping (uint => mapping(uint => address)) commentOwner; //Keeps track of who owns a specific post
    mapping (uint => mapping(uint => uint)) commentUpVotes; // keeps track of a posts vote counter
    mapping (uint => mapping(uint => uint)) commentDownVotes; // keeps track of a posts vote counter
    mapping (address => mapping(uint => mapping(uint => uint))) commentVoters; //keeps track of a users voting history, helps to prevent vote spamming from a single account
    
    //Donation System
    mapping (address => uint) balances;
    mapping (uint => uint) postEarnings;
    //mapping (uint => mapping(uint => uint)) commentEarnings;
    
    //username System
    mapping (bytes32 => bool) usernamesTaken;
    mapping (address => bytes32) usernames;
    
    constructor () public {
        postNumber = 0;
    }
    
    //Invoked when the post has been created, so that the dApp can access the content
    event PostContent (
        address indexed author,
        uint indexed id,
        bytes tags,
        uint postTimestamp, //used to generate private post unique key
        bytes title,
        bytes text
    );
    
    //create a new post, done by storing data in the logs. data can be in any form as long as it is byte data. This means data can be compressed
    function CreatePost(bytes title, bytes text, bytes tags) public {
        
        //check that the data is correct
        require(title.length > 0, "Invalid title");
        require(text.length > 0, "Invalid text");
        require(tags.length > 0, "Invalid tags");
        
        uint postId = postNumber;
        //init the mapping and set the owner as the sender
        postOwners[postId] = msg.sender;
        
        //init votes so that the owner has upvoted by default.
        upvotes[postId] = 1;
        voters[msg.sender][postId] = 1;
        
        //posts are stored in logs, it allows to reduce post invocation cost
        emit PostContent(msg.sender, postId, tags, now, title, text);
        
        postNumber = postId + 1;
    }
    
    //get the owner of a post
    function getOwner(uint postId) public view returns (address) {
        return postOwners[postId];
    }
    
    //upvote a post 
    function UpvotePost(uint postId) public {
        require(postId >= 0, "votes is not for a valid post");
        require(postId < postNumber, "votes is for a non existent post");
        
        uint knownType = voters[msg.sender][postId];
        require(knownType != 1, "Upvote already done");
        if (knownType == 2) {
            downvotes[postId] -= 1;
        }
        voters[msg.sender][postId] = 1;
        upvotes[postId] += 1;
    }
    
    //downvote a post 
    function DownvotePost(uint postId) public {
        require(postId >= 0, "votes is not for a valid post");
        require(postId < postNumber, "votes is for a non existent post");

        uint knownType = voters[msg.sender][postId];
        require(knownType != 2, "downvote already done");
        if (knownType == 1) {
            upvotes[postId] -= 1;
        }
        voters[msg.sender][postId] = 2;
        downvotes[postId] += 1;
    }
    
    //get the vote data
    function getUpVotes(uint postId) public view returns (uint) {
        return upvotes[postId];
    }

    //get the vote data
    function getDownVotes(uint postId) public view returns (uint) {
        return downvotes[postId];
    }
    
    //get the voter data
    function getVoterData(uint postId, address voter) public view returns (uint) {
        return voters[voter][postId];
    }

    /////////// Comment functionality

    //stores a log comment on the blockchain when commented
    event CommentCreated (
        address indexed commenter,
        uint indexed postId,
        bytes comment,
        uint parentComment,
		uint commentTimestamp,
		uint commentId
    );
    
    function PostComment(bytes text, uint postId, uint parentComment) public {
        require(postId >= 0, "comment is not for a valid post");
        require(postId < postNumber, "comment is for a non existent post");
        require(text.length > 0, "comment comment is empty");
		
		//update comment related variables
        uint commentId = commentCounter[postId];
		
		//emit to the blockchain
        emit CommentCreated(msg.sender, postId, text, parentComment, now, commentId);
        

        commentOwner[postId][commentId] = msg.sender;
        
        //deal with upvote data
        commentUpVotes[postId][commentId] = 1;
        commentVoters[msg.sender][postId][commentId] = 1;
        
        //increment counter when done
        commentCounter[postId] = commentId + 1;
    }
    
    //upvote a post 
    function UpvoteComment(uint postId, uint commendId) public {
        require(postId >= 0, "votes is not for a valid post");
        require(postId < postNumber, "votes is for a non existent post");
        
        require(commendId >= 0, "comment id is not valid");
        require(commendId <= commentCounter[postId], "comment id is non existent");
        require(commentVoters[msg.sender][postId][commendId] != 1, "Upvote already done");

        if (commentVoters[msg.sender][postId][commendId] == 2) {
            commentDownVotes[postId][commendId] -= 1;
        }

        commentVoters[msg.sender][postId][commendId] = 1;
        commentUpVotes[postId][commendId] += 1;
    }
    
    //downvote a post 
    function DownvoteComment(uint postId, uint commendId) public {
        require(postId >= 0, "votes is not for a valid post");
        require(postId < postNumber, "votes is for a non existent post");
        
        require(commendId >= 0, "comment id is not valid");
        require(commendId <= commentCounter[postId], "comment id is non existent");
        require(commentVoters[msg.sender][postId][commendId] != 2, "Upvote already done");
        
        if (commentVoters[msg.sender][postId][commendId] == 1) {
            commentUpVotes[postId][commendId] -= 1;
        }

        commentVoters[msg.sender][postId][commendId] = 2;
        commentDownVotes[postId][commendId] += 1;
    }
    
    //get the comment vote data
    function getCommentUpVotes(uint postId, uint commendId) public view returns (uint) {
        return commentUpVotes[postId][commendId];
    }

    //get the comment vote data
    function getCommentDownVotes(uint postId, uint commendId) public view returns (uint) {
        return commentDownVotes[postId][commendId];
    }
    
    //get the comment voter data
    function getCommentVoterData(uint postId, uint commendId, address commenter) public view returns (uint) {
        return commentVoters[commenter][postId][commendId];
    } 

    //get the total number of posts
    function getPostCounter() public view returns (uint) {
        return postNumber;
    }
    
    //deposit and Withdrawal System
    
    //Invoked when a donation is made
    event Deposited (
        address indexed depositer,
        uint value
    );
    
    //deposit trx into the smart contract
    function deposit() public payable {
        require(msg.value > 0, "no attached value");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }
    
    //Invoked when a Withdrawal is made
    event Withdrawal (
        address indexed taker,
        uint value
    );
    
    
    //Withdraw funds
    function withdraw(bool withdrawall, uint trxAmmount) public {
        
        //either withdraw all the funds for a user 
        if(withdrawall == true){
            uint balance = balances[msg.sender];
            require(balance > 0, "Sender does not have funds");
            balances[msg.sender] = 0;
            msg.sender.transfer(balance);
            emit Withdrawal(msg.sender, balance);
        }
        else{ //or take out a specific amount of tron
            require(trxAmmount > 0, "Incorrect withdraw value");
            require(balances[msg.sender] >= trxAmmount, "attempting to withdraw too much");
            balances[msg.sender] -= trxAmmount;
            msg.sender.transfer(trxAmmount);
            emit Withdrawal(msg.sender, trxAmmount);
        }
    }
    
    //Donation System 
    
    //make a donation to a post
    function makeDonation(uint postId, uint donationValue) public {
        
        require(postId >= 0, "votes is not for a valid post");
        require(postId < postNumber, "votes is for a non existent post");
        
        require(donationValue > 0, "no attached value");
        require(donationValue <= balances[msg.sender]);
        
        
        balances[msg.sender] -= donationValue;
        
        //post owner
        address owner = postOwners[postId];
        balances[owner] += donationValue;
        postEarnings[postId] += donationValue;
        emit DonationMade(msg.sender, donationValue, now, postId);
    }
    
    //Invoked when a donation is made
    event DonationMade (
        address indexed donator,
        uint indexed donationValue,
        uint donationTimestamp,
        uint postid
    );
    
    //get post donations
    function getPostDonations(uint postId) public view returns (uint) {
        return postEarnings[postId];
    }
    
    //get user balance
    function getBalance(address user) public view returns (uint) {
        return balances[user];
    }
    
    // Username System
    //Invoked when the post has been created, so that the dApp can access the content
    event UsernameCreated (
        address indexed user,
        bytes32 indexed username
    );
    
    //create a new post, done by storing data in the logs. data can be in any form as long as it is byte data. This means data can be compressed
    function SetUsername(bytes32 username) public {
        
        require (usernamesTaken[username] == false, "username is registered to an owner already");
        
        bytes32 currentUsername = usernames[msg.sender];
        require(currentUsername != username, "This username is already set to the sender");
        
        //if the user does not have a username then set it
        if(currentUsername == 0x0){
            usernames[msg.sender] = username;
            usernamesTaken[username] = true;
        }else{
        //else update the currently known username and make the old username available to other users
            usernames[msg.sender] = username;
            usernamesTaken[username] = true;
            usernamesTaken[currentUsername] = false;
        }
        //posts are stored in logs, it allows to reduce post invocation cost
        emit UsernameCreated(msg.sender, username);
        
    }
    
    //get the stored username for a given address
    function getUsername(address user) public view returns (bytes32) {
        return usernames[user];
    }

    //UTIL FUNCTIONS

    //get the user
    function getSenderAddress() public view returns (address) {
        return msg.sender;
    }
}
