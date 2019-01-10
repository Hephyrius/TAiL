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
