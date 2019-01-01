import React, { Component } from 'react';
import CommentBox from "./CommentBox";
import CommentsList from "./CommentsList";
import PostVote from "./PostVote";
import Donate from "./Donate";

class PostPage extends Component {

  render() {
    var postid = this.props.postid;
    let post;
    let donation;
    if(this.props.postid) {
      let posts = JSON.parse(localStorage.getItem("Posts"));
      let donations = JSON.parse(localStorage.getItem("Donations")); 
      for(var i=0; i<posts.length; i++){
        if(posts[i]['postid'] === this.props.postid){
          post = posts[i];
          break;
        }
      }

      for(var i=0; i<donations.length; i++){
        if(donations[i]['postid'] === this.props.postid){
          donation = donations[i];
          break;
        }
      } 

    }
    if(!post) {
      post = {
        title: "404 Not Found",
        author: "0x0",
        timestamp: "ERROR",
        content: "Post does not exist"
      }
      postid = -1;
    }

    return (
      <div className="PostPage">
        <div class="container">
          <div class="row">

              <h1 class="mt-4">{post['title']}</h1>

              <p></p>
              <div class="container">
              <p class="lead" align="justify">
                <div dangerouslySetInnerHTML={{__html: post['content']}} />
                </p>
              </div>

              Posted on {post['timestamp']}  by {post['author']}

          </div>
        </div>
        <p></p>
        <Donate postid={postid} donation={donation}/>
        <p></p>

        <h3>Vote</h3>
        <PostVote postid={postid} />
        <p></p>

        <CommentBox postid={postid}/>
        <p></p>

        <CommentsList postid={postid}/>
        

        
      </div>
    );
  }
}

export default PostPage;
