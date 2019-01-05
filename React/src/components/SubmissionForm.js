import React, { Component } from 'react';
import {SubmitMagnetLink} from "../utils/tronweb";

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _TorrentTitle: '',
      _MagnetLink: '',
      _TorrentDescription: ''
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({_TorrentTitle: event.target.value});
  }

  handleLinkChange(event) {
    this.setState({_MagnetLink: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({_TorrentDescription: event.target.value});
  }

  handleSubmit(event) {
    SubmitMagnetLink(this.state._TorrentTitle, this.state._TorrentDescription, this.state._MagnetLink, 0, 0, 0);
    event.preventDefault();
  }

  render() {
    
    return (
      <div className="SubmissionForm">
        <div class="container">
            <div class="row">
              <form onSubmit={this.handleSubmit}>
              <h3>Submit Magnet Link</h3>

              <h6>Submit a torrent by providing a magnet link. </h6>

                <label> Torrent Title </label>
                  <div>
                    <input type="text" value={this.state._TorrentTitle} onChange={this.handleTitleChange} />
                  </div>
                <p> </p>

                <label> Magnet Link </label>
                  <div>
                    <input type="text" value={this.state._MagnetLink} onChange={this.handleLinkChange} />
                  </div>
                <p> </p>
                
                <label> Torrent Description </label>
                  <div>
                    <textarea rows="4" cols="50" value={this.state._TorrentDescription} onChange={this.handleDescriptionChange} />
                  </div>
                <p> </p>

                <input type="submit" class="btn btn-outline-light" value="Submit Link" />
              </form>
            </div>
          </div>
        </div>
    );
  }
}

  export default SubmissionForm;
