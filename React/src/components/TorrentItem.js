import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TorrentItem extends Component {
  render() {

    return (
      <div className="PostItem">
      <p></p>

        <div class="container-fluid">
          <div class="row">
              <div class="col-md-2">
                <form action={this.props.Torrent.MagnetLink}>
                  <input type="submit" class="btn btn-outline-light btn-sm"  value="Magnet Link" />
                </form>
              </div>
              
              <div class="col-md-8">
                <div className="title-area">
                    <span className="title"><Link to={"Torrent=" + this.props.Torrent.TorrentNumber}> {this.props.Torrent.TorrentTitle}</Link></span>
                </div>

                <div className="meta-area">

                  <span className="time">
                    Submitted {this.props.Torrent.TimeStamp} by
                    <strong> {this.props.Torrent.Sender}</strong>
                  </span>
                </div>
                
              </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default TorrentItem;
