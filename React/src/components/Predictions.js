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
import PredictionItem from "./PredictionItem";
import DummyItem from "./DummyItem";
class Predictions extends Component {

  render() {
    let PredictionItems;
    let Predictions = JSON.parse(localStorage.getItem("Predictions"))
    let Filtered = []

    for(var i=0; i<Predictions.length; i++){
      if(Predictions[i].NetworkNumber == this.props.NetworkNumber){
        Filtered = Filtered.concat(Predictions[i])
      }
    }

    Predictions = Filtered
    
    if(Predictions && Predictions.length > 0) {
      PredictionItems = Predictions.map(Prediction => {
            return (
                <PredictionItem key={Prediction.NetworkNumber} Prediction={Prediction}/>
            )
        } );

    } else {
      PredictionItems = <DummyItem />
    }
    
    return (
      <div className="Predictions">
        <div class="container">
            <div class="row">
              {PredictionItems}
            </div>
          </div>
        </div>
    );
  }
}

export default Predictions;
