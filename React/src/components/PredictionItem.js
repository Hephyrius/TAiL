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

class PredictionItem extends Component {
  render() {
    var RawPrediction = "[";
    for(var i=0; i<this.props.Prediction.RawPrediction.length; i++){
      RawPrediction += this.props.Prediction.RawPrediction[i].toString() +","
    }
    RawPrediction += "]"

    return (
      <div className="PredictionItem">
      <p></p>

        <div class="container-fluid">
          <div class="row">
              
              <div class="col-md-10">
                    <span className="title"> Prediction Number : {this.props.Prediction.PredictionNumber}</span>
                    <p></p>
                    <span className="Values"> Raw Prediction Values: {RawPrediction}</span>
                    <p></p>
                    <span className="Class"> Predicted Class:  {this.props.Prediction.PredictedClass}</span>

              </div>
                
          </div>
        </div>
        
      </div>
    );
  }
}

export default PredictionItem;
