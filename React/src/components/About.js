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

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="About">
        <div class="container">
            <div class="row">
            <form onSubmit={this.handleSubmit}>
            <h3>About TAiL</h3>
                <div>
                <p align="justify">
                TAiL Is an AI Library and Deployer. The Library is used to train a neural network using python and user defined data. The Deployer is the front end of the dApp responsible for creating the network on the TVM and interacting with it. Iteraction being prediction on new data.
                The Frontend also allows Historic predictions to be reviewed.

                The models created with TAiL can be incorporated within other smart contract systems by referencing TAiL as an import, and interacting with the Predict function of the smart contract.
                </p>

                </div>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

  export default About;
