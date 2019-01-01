import React, { Component } from 'react';
import {VoteOnComment} from "../utils/tronweb";

class CommentVote extends Component {
    constructor(props) {
        super(props);
    
        this.handleUpvote = this.handleUpvote.bind(this);
        this.handleDownvote = this.handleDownvote.bind(this);
      }
    
      handleUpvote(event) {
        VoteOnComment(this.props.postid, this.props.commentid, 0);
        event.preventDefault();
      }

      handleDownvote(event) {
        VoteOnComment(this.props.postid, this.props.commentid, 1);
        event.preventDefault();
      }

  render() {
    //grab the vote count for the given post
    let upVoteCount = 0;
    let downVoteCount = 0;
    let totalVote = 0;
    let votes = JSON.parse(localStorage.getItem("CommentVotes"));
    if(votes) {
      for(var i=0; i<votes.length; i++){
        if(votes[i]['postid'] == this.props.postid && votes[i]['commentid'] == this.props.commentid){
          upVoteCount = votes[i]['upvotes'] 
          downVoteCount = votes[i]['downvotes'] 
          totalVote = votes[i]['total'] 
        }
      }
    }

    let upValue = "⟰" + upVoteCount.toString()
    let downValue = "⟱" + downVoteCount.toString()

    return (
        <span>
            <button type="button" class="btn btn-outline-dark btn-sm" onClick={this.handleUpvote}>{upValue}</button>
            <button type="button" class="btn btn-outline-dark btn-sm" onClick={this.handleDownvote}>{downValue}</button>
        </span>
    );
  }
}

export default CommentVote;
