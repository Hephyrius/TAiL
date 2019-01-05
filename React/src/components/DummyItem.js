import React, { Component } from 'react';
class DummyItem extends Component {

  render() {
      let type = "Torrent";
    return (
      <div className="DummyItem">
        <div class="container">
            <div class="row">
              There are no {type}'s to display.
            </div>
          </div>
        </div>
    );
  }
}

export default DummyItem;
