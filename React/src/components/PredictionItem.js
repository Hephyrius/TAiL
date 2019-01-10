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
