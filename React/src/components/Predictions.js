import React, { Component } from 'react';
import PredictionItem from "./PredictionItem";
import DummyItem from "./DummyItem";
class Predictions extends Component {

  render() {
    let PredictionItems;
    let Predictions = JSON.parse(localStorage.getItem("Predictions"))
    
    
    if(Predictions && Predictions.length >0) {
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
