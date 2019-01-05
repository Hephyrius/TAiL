import React, { Component } from 'react';
class DummyItem extends Component {

  render() {
      let type = "Networks";
    return (
      <div className="DummyItem">
        <div class="container">
            <div class="row">
              There is nothing to display. Try Refreshing to load more TVM data.
            </div>
          </div>
        </div>
    );
  }
}

export default DummyItem;
