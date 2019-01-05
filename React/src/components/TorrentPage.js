import React, { Component } from 'react';

class TorrentPage extends Component {

  render() {
    var TorrentNumber = this.props.TorrentNumber;
    let Torrent;
    if(this.props.TorrentNumber) {
      let Torrents = JSON.parse(localStorage.getItem("Torrents"));
      for(var i=0; i<Torrents.length; i++){
        if(Torrents[i]['TorrentNumber'] === this.props.TorrentNumber){
          Torrent = Torrents[i];
          break;
        }
      }

    }
    if(!Torrent) {
      Torrent = {
        TorrentTitle: "Torrent Not Found",
        Sender: "0x0",
        TimeStamp: "ERROR",
        TorrentDescription: "Torrent does not exist"
      }
      TorrentNumber = -1;
    }

    return (
      <div className="TorrentPage">
        <div class="container">
          <div class="row">

              <h1 class="mt-4">{Torrent['TorrentTitle']}</h1>
              
              <p></p>
              <div class="container">
              <p class="lead" align="justify">
                
                {Torrent['TorrentDescription']}
              </p>
              </div>

              Posted on {Torrent['TimeStamp']}  by {Torrent['Sender']}
              

          </div>
          <p></p>

          <h4>Download Torrent</h4>
          <p></p>
          <form action={Torrent['MagnetLink']}>
            <input type="submit" class="btn btn-outline-light"  value="Magnet Link" />
          </form>

        </div>
      
        
      </div>
    );
  }
}

export default TorrentPage;
