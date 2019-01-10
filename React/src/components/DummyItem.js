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
