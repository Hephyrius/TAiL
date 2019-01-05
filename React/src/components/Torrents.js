import React, { Component } from 'react';
import TorrentItem from "./TorrentItem";
import DummyItem from "./DummyItem";
class Torrents extends Component {

  render() {
    let torrentItems;
    let Torrents = JSON.parse(localStorage.getItem("Torrents"))
    let filter = []

    if (this.props.filterword.length > 0){
      for(var i=0; i<Torrents.length; i++){
        if(Torrents[i]['TorrentDescription'].match(this.props.filterword) || Torrents[i]['TorrentTitle'].match(this.props.filterword) || Torrents[i]['Sender'].match(this.props.filterword)){
          filter = filter.concat(Torrents[i])
        }
      }
      Torrents = filter
    }

    if(Torrents.length > 0) {
      torrentItems = Torrents.map(Torrent => {
            return (
                <TorrentItem key={Torrent.TorrentTitle} Torrent={Torrent}/>
            )
        } );

    } else {

      torrentItems = <DummyItem />
    }
    return (
      <div className="Torrents">
        <div class="container">
            <div class="row">
              {torrentItems}
            </div>
          </div>
        </div>
    );
  }
}

export default Torrents;
