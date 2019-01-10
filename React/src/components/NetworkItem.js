//TAiL is a dApp and Library created for the Tron Accelerator
//The Python library enables training of Neural Network Classifiers
//As well as the export of trained models in JSON Form
//The smart contract allows pretrained models to be used on the TVM
//By allowing users to initialise them via a smart contract deployer system
//The ReactJs front end allows the deployment, initialisation and use of the Neural Networks
//It also allows the exploration of the Neural Networks by allowing users to see Past Predictions
//As Well as Owners and Deployed Addresses.
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/TAiL)

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
                    <span className="title"> <Link to={"NetworkNumber=" + this.props.Network.NetworkNumber}> Network Number : {this.props.Network.NetworkNumber}</Link></span>
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
