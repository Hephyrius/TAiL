import React, { Component } from 'react';
import PostItem from "./PostItem";
import DummyItem from "./DummyItem";
class Posts extends Component {

  render() {
    let postItems;
    let posts = JSON.parse(localStorage.getItem("Posts"))
    let votes = JSON.parse(localStorage.getItem("PostVotes"))
    let filter = []

    if (this.props.filterword.length > 0){
      for(var i=0; i<posts.length; i++){
        if(posts[i]['content'].match(this.props.filterword) || posts[i]['tags'].match(this.props.filterword) || posts[i]['title'].match(this.props.filterword)){
          filter = filter.concat(posts[i])
        }
      }
      posts = filter
    }

    if(posts.length > 0) {
        postItems = posts.map(post => {
            return (
                <PostItem key={post.title} post={post} votes={votes}/>
            )
        } );

    } else {

      postItems = <DummyItem isPost={true}/>
    }
    return (
      <div className="Postss">
        <div class="container">
            <div class="row">
              {postItems}
            </div>
          </div>
        </div>
    );
  }
}

export default Posts;
