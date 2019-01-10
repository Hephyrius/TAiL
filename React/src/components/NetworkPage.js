import React, { Component } from 'react';
import Predictions from "./Predictions";

class NetworkPage extends Component {

  render() {
    var NetworkNumber = this.props.NetworkNumber;
    let Network;
    let Networks = JSON.parse(localStorage.getItem("Networks"));

    if(this.props.NetworkNumber) {
      
      for(var i=0; i<Networks.length; i++){
        if(Networks[i]['NetworkNumber'] == this.props.NetworkNumber){
          Network = Networks[i];
          break;
        }
      }
    }
    if(!Network) {
      Network = {
        Network: "0x0",
        Owner: "0x0",
        TotalPredictions: "ERROR",
      }
      NetworkNumber = -1;
    }

    return (
      <div className="NetworkPage">

            <div class="container">
              <div class="row">

                    Network {Network['Network']} is owned by {Network['Owner']}
                    <p>
                      It has {Network['TotalPredictions']} Predictions saved. View the Prediction History Below
                    </p>

                </div>
            </div>

              <Predictions NetworkNumber={NetworkNumber}/>

      </div>
    );
  }
}

export default NetworkPage;
