import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NetworkItem extends Component {
  render() {

    return (
      <div className="NetworkItem">
      <p></p>

        <div class="container-fluid">
          <div class="row">
              
              <div class="col-md-10">
                <div className="title-area">
                    <span className="title"> Network Number : {this.props.Network.NetworkNumber}</span>
                </div>

                <div className="meta-area">
                   <strong> Submitted by {this.props.Network.Owner}</strong>
                   <strong> Deployed at {this.props.Network.Network}</strong>
                </div>
                
              </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default NetworkItem;
