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
import NetworkItem from "./NetworkItem";
import DummyItem from "./DummyItem";
class Networks extends Component {

  render() {
    let NetworkItems;
    let Networks = JSON.parse(localStorage.getItem("Networks"))
    
    
    if(Networks && Networks.length >0) {
      NetworkItems = Networks.map(Network => {
            return (
                <NetworkItem key={Network.NetworkNumber} Network={Network}/>
            )
        } );

    } else {
      NetworkItems = <DummyItem />
    }
    
    return (
      <div className="Networks">
        <div class="container">
            <div class="row">
              {NetworkItems}
            </div>
          </div>
        </div>
    );
  }
}

export default Networks;
