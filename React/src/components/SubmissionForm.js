import React, { Component } from 'react';
import {CreateNetwork} from "../utils/tronweb";

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _TorrentTitle: '',
      _MagnetLink: '',
      _TorrentDescription: ''
    };

    this.loadFile = this.loadFile.bind(this);
  }

  loadFile(e) {
    console.log("clicked")
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }
    
    function receivedText(e) {
      let lines = e.target.result;
      var newArr = JSON.parse(lines);
      localStorage.setItem("Network", JSON.stringify(newArr));
      CreateNetwork(newArr);
    }
  }

  render() {
    
    return (
      <div className="SubmissionForm">
        <div class="container">
            <div class="row">

              
              <form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
              <h3>Create New Network from Json Config</h3>
                <input type='file' id='fileinput'/>
                <input type='button'  class="btn btn-outline-dark" id='btnLoad' value='Load' onClick={this.loadFile}/>
                <h6>Create a network by providing a networks generated json file. </h6>

              </form>

            </div>
          </div>
        </div>
    );
  }
}

  export default SubmissionForm;
