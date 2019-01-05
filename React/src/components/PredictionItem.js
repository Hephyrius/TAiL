import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PredictionItem extends Component {
  render() {

    return (
      <div className="PredictionItem">
      <p></p>

        <div class="container-fluid">
          <div class="row">
              
              <div class="col-md-10">
                <div className="title-area">
                    <span className="title"> Network Number : {this.props.Prediction.NetworkNumber}</span>
                    <span className="Values"> Values: {this.props.Prediction.Value}</span>
                </div>

                <div className="meta-area">
                   <strong> Submitted by {this.props.Prediction.Owner}</strong>
                   <strong> Deployed at {this.props.Prediction.Network}</strong>
                </div>
                
              </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default PredictionItem;
