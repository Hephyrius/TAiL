import React, { Component } from 'react';
import CommentItem from "./CommentItem";
import DummyItem from "./DummyItem";

class CommentsList extends Component {

  render() {
    let commentItems;
    
    let comments = JSON.parse(localStorage.getItem("Comments"))
    let filteredComments = []
    for(var i=0; i<comments.length; i++){
        if(comments[i]['postid'] === this.props.postid){
            filteredComments = filteredComments.concat(comments[i])
        }
      } 

    if(filteredComments.length > 0) {
        commentItems = filteredComments.map(comment => {
            return (
                <CommentItem key={comment.commentid} comment={comment}/>
            )
        } );
    } else {
      commentItems = <DummyItem isPost={false}/>
    }
    
    return (
      <div className="CommentsList">
      <h3>Comment Section </h3>
        <div class="container">
            <div class="row">
            
              {commentItems}
              
            </div>
          </div>
        </div>
    );
  }
}

export default CommentsList;
