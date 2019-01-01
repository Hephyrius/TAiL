import React, { Component } from 'react';
import PostVote from "./PostVote";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PostItem extends Component {
  render() {

    //grab the vote count for the given post
    let upVoteCount = 0;
    let downVoteCount = 0;
    if(this.props.votes) {
      for(var i=0; i<this.props.votes.length; i++){
        if(this.props.votes[i]['postid'] == this.props.post.postid){
          upVoteCount = this.props.votes[i]['upvotes'] 
          downVoteCount = this.props.votes[i]['downvotes'] 
        }
      }
    }

    return (
      <div className="PostItem">
      <p></p>

        <div class="container-fluid">
          <div class="row">
              <div class="col-md-2">
                <PostVote postid={this.props.post.postid} />
              </div>
              
              <div class="col-md-8">
              <p></p>
                <div className="title-area">
                    <span className="title"><Link to={"post=" + this.props.post.postid}> {this.props.post.title}</Link></span>
                    
                </div>

                <div className="meta-area">

                  <span className="time">
                    Submitted {this.props.post.timestamp} by
                    <strong> {this.props.post.author}</strong>
                  </span>
                </div>
              </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default PostItem;
