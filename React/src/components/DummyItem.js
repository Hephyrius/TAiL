import React, { Component } from 'react';
class DummyItem extends Component {

  render() {
      let type = "Comment";
      if(this.props.isPost) {
        type = "Post"
      }
    return (
      <div className="DummyItem">
        <div class="container">
            <div class="row">
              There are no {type}'s to display. Be the first!
            </div>
          </div>
        </div>
    );
  }
}

export default DummyItem;
